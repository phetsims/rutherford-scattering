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

    this.particles = [];
    this.particleCallbacks = []; // @protected called when a alpha particle is added

    options = _.extend( {
      alphaParticleEnergy: RSConstants.DEFAULT_ALPHA_ENERGY,
      bounds: new Bounds2( 0, 0, 30, 30 ), // FIXME:
      play: true // is the sim running or paused
    }, options );

    // @public
    PropertySet.call( this, options );
  }

  rutherfordScattering.register( 'AtomModel', AtomModel );

  return inherit( PropertySet, AtomModel, {

    /**
     * Registers a callback that will be called when a particle is added or removed to the model
     * @param {function( AlphaParticleModel )} callback
     * @public
     */
    registerParticleCallback: function( callback ) {
      this.particleCallbacks.push( callback );
    },

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @public
     */
    addParticle: function( alphaParticle ) {
      console.log( 'addParticle' );
      this.particles.push( alphaParticle );

      // call registered callbacks
      var callbacks = this.particleCallbacks.slice( 0 );
      for ( var i = 0; i < callbacks.length; i++ ) {
        callbacks[ i ]( alphaParticle );
      }
    },

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @public
     */
    removeParticle: function( alphaParticle ) {
      console.log( 'removeAlphaParticle' );

      var particleIndex = this.particles.indexOf( alphaParticle );
      if (particleIndex > -1) {
        this.particles.splice(particleIndex, 1);
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
    }

  } ); // inherit

} ); // define
