// Copyright 2002-2016, University of Colorado Boulder

/**
 * Base object for the models. Keeps track of all active particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Emitter = require( 'AXON/Emitter' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Gun = require( 'RUTHERFORD_SCATTERING/common/model/Gun' );
  var Bounds2 = require( 'DOT/Bounds2' );

  /**
   * @constructor
   */
  function RSBaseModel() {

    assert && assert( RSConstants.SPACE_NODE_WIDTH === RSConstants.SPACE_NODE_HEIGHT, 'Space must be square.' );

    // @public
    PropertySet.call( this, {
      alphaParticleEnergy: RSConstants.DEFAULT_ALPHA_ENERGY,
      running: true,    // is the sim running or paused
      userInteraction: false  // is the user interacting with the simulation
    } );
    var self = this;

    // @public (read-only) model computation space
    this.bounds = new Bounds2(
      -RSConstants.SPACE_NODE_WIDTH / 4,
      -RSConstants.SPACE_NODE_HEIGHT / 4,
      RSConstants.SPACE_NODE_WIDTH / 4,
      RSConstants.SPACE_NODE_HEIGHT / 4 );

    // @public (read-only) - {AlphaParticle[]} all active alpha particle models
    this.particles = [];

    // @protected - {Array.<RutherfordAtomSpace|PlumPuddingAtomSpace|RutherfordNucleusSpace>}
    this.atomSpaces = [];

    // @protected - manual step size used when sim is paused
    this.maunalStepDt = 1 / 60;

    // @protected - the gun which introduces (aka. 'shoots') alpha particles
    this.gun = new Gun( this );

    // @protected - used to signal when a sim step has occurred
    this.stepEmitter = new Emitter();

    // @private - energy level changed
    var userInteractionListener = function( userInteraction ) {
      if ( userInteraction ) {
        self.removeAllParticles();
      }
    };
    this.userInteractionProperty.link( userInteractionListener );
  }

  rutherfordScattering.register( 'RSBaseModel', RSBaseModel );

  return inherit( PropertySet, RSBaseModel, {

    /**
     * Registers a listener to be called at each step of the model execution
     * @param {function()} listener
     * @public
     */
    addStepListener: function( listener ) {
      this.stepEmitter.addListener( listener );
    },

    /**
     * Get the space which is currently visible.
     * @return {AtomSpace}
     */
    getVisibleSpace: function() {
      var visibleSpace;
      this.atomSpaces.forEach( function( space ) {
        if ( space.isVisible ) {
          visibleSpace = space;
          return;
        }
      } );
      assert && assert( visibleSpace, 'There must be a visible space' );

      return visibleSpace;
    },

    /**
     * @param {AlphaParticle} alphaParticle
     * @public
     */
    addParticle: function( alphaParticle ) {
      // get the visible space
      var visibleSpace = this.getVisibleSpace();

      // add the particle to the nearest atom at the bottom of the space
      var nearestAtom;
      visibleSpace.atoms.forEach( function( atom ) {
        if ( atom.bounds.containsPoint( alphaParticle.position ) ) {
          nearestAtom = atom;
          return;
        }
      } );
      assert && assert( nearestAtom, 'No atom found for new particle' );

      nearestAtom.addParticle( alphaParticle );
      this.particles.push( alphaParticle );
    },

    /**
     * @param {AlphaParticle} alphaParticle
     * @public
     */
    removeParticle: function( alphaParticle ) {
      // get the visible space
      var visibleSpace = this.getVisibleSpace();

      var index = this.particles.indexOf( alphaParticle );
      if ( index > -1 ) {
        // make sure that the particle is not associated with an atom
        visibleSpace.atoms.forEach( function( atom ) {
          var particleIndex = atom.particles.indexOf( alphaParticle );
          if ( particleIndex > -1 ) {
            atom.particles.splice( particleIndex, 1 );
            return;
          }  
        } );
        this.particles.splice( index, 1 );
      }
    },

    /**
     * Remove all particles from this model and its atoms.
     * @public
     */
    removeAllParticles: function() {
      // get the visible space
      var visibleSpace = this.getVisibleSpace();

      visibleSpace.atoms.forEach( function( atom ) {
        atom.particles.length = 0;
      } );
      this.particles.length = 0;
      this.stepEmitter.emit();
    },

    /**
     * A stub function to be implemented by derived objects. This just makes certain one is implemented.
     * @param {AlphaParticle} alphaParticle
     * @param {number} dt
     * @protected
     */
    moveParticle: function( alphaParticle, dt ) {
      assert && assert( false, 'No moveParticle model function implemented.' );
    },

    /**
     * Move all particles in the visible space.
     * @param {number} dt
     * @private
     */
    moveParticles: function( dt ) {
      this.getVisibleSpace().atoms.forEach( function( atom ) {
        atom.moveParticles();
      } );
    },

    /**
     * Transition a particle from the bounding box of one atom to another.  A particle should only 
     * be transitioned to another atom if it enters the atom's bounds from the bottom, and it has 
     * not been scattered.
     * @private
     */
    transitionParticles: function() {
      // get the visible space
      var visibleSpace = this.getVisibleSpace();

      visibleSpace.atoms.forEach( function( atom ) {
        atom.particles.forEach( function( particle ) {
          if ( particle.position.y > atom.bounds.maxY &&
                particle.orientation === particle.orientationProperty.initialValue ) {
            // if the particle is beyond its bounding box and it hasn't been scattered,
            // transition to the next bounding box
            for ( var i = 0; i < visibleSpace.atoms.length; i++ ) {
              var secondAtom = visibleSpace.atoms[ i ];
              if ( secondAtom === atom ) {
                // don't compare the box to itself
                continue;
              }
              else {
                if ( secondAtom.bounds.minY === atom.bounds.maxY ) {
                  // we have found the next atom, move the particle into that space
                  atom.removeParticle( particle );
                  secondAtom.addParticle( particle );
                  return; 
                }
              }
            }
          }
        } );
      } );
    },

    /**
     * Culls alpha particles that have left the bounds of model space.
     * @protected
     */
    cullParticles: function() {
      var self = this;
      this.particles.forEach( function( particle ) {
        if ( !self.bounds.containsPoint( particle.position ) ) {
          self.removeParticle( particle );
        }
      } );
    },

    /**
     * {number} dt - time step
     * @public
     */
    step: function( dt ) {
      if ( this.running && !this.userInteraction && dt < 1 ) {
        this.gun.step( dt );

        this.getVisibleSpace().atoms.forEach( function( atom ) {
          atom.moveParticles( dt );
        } );
        this.transitionParticles();
        this.cullParticles();
      }

      this.stepEmitter.emit();
    },

    /**
     * Step one frame manually.  Assuming 60 frames per second.
     * @public
     */
    manualStep: function() {
      if ( !this.userInteraction ) {
        this.gun.step( this.maunalStepDt );
        this.moveParticles( this.maunalStepDt );
        this.transitionParticles();
        this.cullParticles();
      }

      this.stepEmitter.emit();
    },

    /**
     * @public
     */
    reset: function() {
      this.gun.onProperty.reset();
      this.removeAllParticles();
      PropertySet.prototype.reset.call( this );
    }

  } ); // inherit

} ); // define
