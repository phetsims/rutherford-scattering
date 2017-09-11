// Copyright 2002-2016, University of Colorado Boulder

/**
 * Base object for the models. Keeps track of all active particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Emitter = require( 'AXON/Emitter' );
  var Gun = require( 'RUTHERFORD_SCATTERING/common/model/Gun' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  /**
   * @constructor
   */
  function RSBaseModel() {

    assert && assert( RSConstants.SPACE_NODE_WIDTH === RSConstants.SPACE_NODE_HEIGHT, 'Space must be square.' );

    // @public {number}
    this.alphaParticleEnergyProperty = new Property( RSConstants.DEFAULT_ALPHA_ENERGY );

    // @public {boolean}
    this.runningProperty = new Property( true );

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

  }

  rutherfordScattering.register( 'RSBaseModel', RSBaseModel );

  return inherit( Object, RSBaseModel, {

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
     * @returns {AtomSpace}
     * @public
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
     * Add a particle to the visible space.
     * @param {AlphaParticle} alphaParticle
     * @public
     */
    addParticle: function( alphaParticle ) {
      this.particles.push( alphaParticle );

      // add the particle to the space
      this.getVisibleSpace().addParticle( alphaParticle );
    },

    /**
     * Remove a particle from the visible space
     * @param {AlphaParticle} alphaParticle
     * @public
     */
    removeParticle: function( alphaParticle ) {
      // remove the particle from the visible space
      var visibleSpace = this.getVisibleSpace();
      visibleSpace.removeParticle( alphaParticle );

      // remove the particle from its atom if scattered
      visibleSpace.atoms.forEach( function( atom ) {
        atom.removeParticle( alphaParticle );
      } );

      // remove the particle from the base model
      var index = this.particles.indexOf( alphaParticle );
      if ( index > -1 ) {
        this.particles.splice( index, 1 );
      }
    },

    /**
     * Remove all particles from this model and its atoms.
     * @public
     */
    removeAllParticles: function() {
      // remove the particles from the visible space
      var visibleSpace = this.getVisibleSpace();
      visibleSpace.removeAllParticles();

      // remove all particles from the atoms
      visibleSpace.atoms.forEach( function( atom ) {
        atom.particles.length = 0;
      } );

      // dispose all particles
      this.particles.forEach( function( particle ) {
        particle.dispose();
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

      // move particles owned by the visible space
      this.getVisibleSpace().moveParticles( dt );
    },

    /**
     * Culls alpha particles that have left the bounds of model space.
     * @protected
     */
    cullParticles: function() {
      var self = this;
      this.particles.forEach( function( particle ) {
        if ( !self.bounds.containsPoint( particle.positionProperty.get() ) ) {
          self.removeParticle( particle );
        }
      } );
    },

    /**
     * {number} dt - time step
     * @public
     */
    step: function( dt ) {
      if ( this.runningProperty.get() && !this.userInteractionProperty.value && dt < 1 ) {
        this.gun.step( dt );

        // move particles
        this.moveParticles( dt );

        // remove particles out of bounds
        this.cullParticles();
      }

      this.stepEmitter.emit1( dt );
    },

    /**
     * Step one frame manually.  Assuming 60 frames per second.
     * @public
     */
    manualStep: function() {
      if ( !this.userInteractionProperty.value ) {
        this.gun.step( this.maunalStepDt );
        this.moveParticles( this.maunalStepDt );
        this.cullParticles();
      }

      this.stepEmitter.emit();
    },

    /**
     * @public
     */
    reset: function() {
      this.gun.reset();
      this.removeAllParticles();
      this.alphaParticleEnergyProperty.reset();
      this.runningProperty.reset();
    }

  } ); // inherit

} ); // define
