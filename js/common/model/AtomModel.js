// Copyright 2002-2016, University of Colorado Boulder

/**
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Bounds2 = require( 'DOT/Bounds2' );


  /**
   * @param {Object} [options]
   * @constructor
   */
  function AtomModel( options ) {

    this.particles = [];  // all active alpha particle models
    this.particleAddCallbacks = []; // @protected called when a alpha particle is added
    this.particleRemoveCallbacks = []; // @protected called when a alpha particle is removed
    this.maunalStepDt = 1/ 60;

    options = _.extend( {
      alphaParticleEnergy: RSConstants.DEFAULT_ALPHA_ENERGY,
      bounds: new Bounds2( 0, 0, 30, 30 ), // FIXME: ?
      play: true // is the sim running or paused
    }, options );

    // @public
    PropertySet.call( this, options );
  }

  rutherfordScattering.register( 'AtomModel', AtomModel );

  return inherit( PropertySet, AtomModel, {

    /**
     * Registers a callback that will be called when a particle is added to the model
     * @param {function( AlphaParticleModel )} callback
     * @public
     */
    registerAddParticleCallback: function( callback ) {
      this.particleAddCallbacks.push( callback );
    },

    /**
     * Registers a callback that will be called when a particle is removed from the model
     * @param {function( AlphaParticleModel )} callback
     * @public
     */
    registerRemoveParticleCallback: function( callback ) {
      this.particleRemoveCallbacks.push( callback );
    },

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @public
     */
    addParticle: function( alphaParticle ) {

      this.particles.push( alphaParticle );

      // call registered callbacks
      var callbacks = this.particleAddCallbacks.slice( 0 );
      for ( var i = 0; i < callbacks.length; i++ ) {
        callbacks[ i ]( alphaParticle );
      }
    },

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @public
     */
    removeParticle: function( alphaParticle ) {

      var particleIndex = this.particles.indexOf( alphaParticle );
      if (particleIndex > -1) {
        this.particles.splice(particleIndex, 1);

        // call registered callbacks
        var callbacks = this.particleRemoveCallbacks.slice( 0 );
        for ( var i = 0; i < callbacks.length; i++ ) {
          callbacks[ i ]( alphaParticle );
        }
      }
    },

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @param {double} dt
     * @protected
     */
    moveParticle: function ( alphaParticle, dt ) {
      assert && assert( false, 'No moveParticle model function implemented.' );
    },

    /**
     * @param {number} dt
     * @protected
     */
    moveParticles: function( dt ) {

      for (var i = 0; i < this.particles.length; i++) {
        this.moveParticle( this.particles[i], dt );
      }
    },

    /**
     * Culls alpha particles that have left the bounds of space.
     * @protected
     */
    cullParticles: function() {

      for (var i = 0; i < this.particles.length; i++) {
        var particle = this.particles[i];
        if( !this.bounds.containsPoint( particle.position ) ) {
          this.removeParticle( particle );
        }
      }
    }

  } ); // inherit

} ); // define
