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
  var GunModel = require( 'RUTHERFORD_SCATTERING/common/model/GunModel' );
  var Bounds2 = require( 'DOT/Bounds2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function RSBaseModel( options ) {

    assert && assert( RSConstants.SPACE_NODE_WIDTH === RSConstants.SPACE_NODE_HEIGHT, 'Space must be square.' );

    options = _.extend( {
      alphaParticleEnergy: RSConstants.DEFAULT_ALPHA_ENERGY,
      bounds: new Bounds2(  // model computation space
        -RSConstants.SPACE_NODE_WIDTH / 4,
        -RSConstants.SPACE_NODE_HEIGHT / 4,
        RSConstants.SPACE_NODE_WIDTH / 4,
        RSConstants.SPACE_NODE_HEIGHT / 4 ),
      running: true,    // is the sim running or paused
      userInteraction: false  // is the user interacting with the simulation
    }, options );

    // @public
    PropertySet.call( this, options );

    // @public (read-only) - all active alpha particle models
    this.particles = [];

    // @protected - manual step size used when sim is paused
    this.maunalStepDt = 1 / 60;

    // @protected - the gun which introduces (aka. 'shoots') alpha particles
    this.gun = new GunModel( this );

    // @protected - used to signal when a sim step has occurred
    this.stepEmitter = new Emitter();

    // @private - energy level changed
    var self = this;
    var userInteractionListener = function( userInteraction ) {
      if ( userInteraction ) {
        self.removeAllParticles();
      }
    };
    this.userInteractionProperty.link( userInteractionListener );

    // @private
    this.disposeRSBaseModel = function() {
      this.userInteractionProperty.unlink( userInteractionListener );
      this.stepEmitter.removeAllListeners();
    };
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
     * @param {AlphaParticleModel} alphaParticle
     * @public
     */
    addParticle: function( alphaParticle ) {
      this.particles.push( alphaParticle );
    },

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @public
     */
    removeParticle: function( alphaParticle ) {
      var index = this.particles.indexOf( alphaParticle );
      if ( index > -1 ) {
        this.particles.splice( index, 1 );
      }
    },

    /**
     * @public
     */
    removeAllParticles: function() {
      this.particles.length = 0;
      this.stepEmitter.emit();
    },

    /**
     * A stub function to be implemented by derived objects. This just makes certain one is implemented.
     * @param {AlphaParticleModel} alphaParticle
     * @param {number} dt
     * @protected
     */
    moveParticle: function( alphaParticle, dt ) {
      assert && assert( false, 'No moveParticle model function implemented.' );
    },

    /**
     * @param {number} dt
     * @private
     */
    moveParticles: function( dt ) {
      var self = this;
      this.particles.forEach( function( particle ) {
        self.moveParticle( particle, dt );
      } );
    },

    /**
     * Culls alpha particles that have left the bounds of space.
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
        this.moveParticles( dt );
        this.cullParticles();
      }

      this.stepEmitter.emit( dt );
    },

    /**
     * Step one frame manually.  Assuming 60 frames per second.
     * @public
     */
    manualStep: function() {
      if ( !this.userInteraction ) {
        this.gun.step( this.maunalStepDt );
        this.moveParticles( this.maunalStepDt );
        this.cullParticles();
      }

      this.stepEmitter.emit();
    },

    // @public
    reset: function() {
      this.gun.onProperty.reset();
      this.removeAllParticles();
      PropertySet.prototype.reset.call( this );
    },

    // @public
    dispose: function() {
      this.disposeRSBaseModel();
    }

  } ); // inherit

} ); // define
