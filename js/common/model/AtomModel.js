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
  var ObservableArray = require( 'AXON/ObservableArray' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var GunModel = require( 'RUTHERFORD_SCATTERING/common/model/GunModel' );
  var Bounds2 = require( 'DOT/Bounds2' );


  /**
   * @param {Object} [options]
   * @constructor
   */
  function AtomModel( options ) {

    options = _.extend( {
      alphaParticleEnergy: RSConstants.DEFAULT_ALPHA_ENERGY,
      bounds: new Bounds2(
        -RSConstants.SPACE_NODE_WIDTH/4,
        -RSConstants.SPACE_NODE_HEIGHT/4,
         RSConstants.SPACE_NODE_WIDTH/4,
         RSConstants.SPACE_NODE_HEIGHT/4 ),
      play: true // is the sim running or paused
    }, options );

    // @public
    PropertySet.call( this, options );

    // @protected - all active alpha particle models, callback for particle is added/removed
    this.particles = new ObservableArray();;

    // @protected called when a alpha particle is removed
    this.maunalStepDt = 1 / 60;

    // @protected
    this.gun = new GunModel( this );
  }

  rutherfordScattering.register( 'AtomModel', AtomModel );

  return inherit( PropertySet, AtomModel, {

    /**
     * Registers a callback that will be called when a particle is added or removed from the model
     * @param {function( AlphaParticleModel )} addCallback
     * @param {function( AlphaParticleModel )} removeCallback
     * @public
     */
    registerCallbacks: function( addCallback, removeCallback ) {
      assert && assert( typeof addCallback === 'function', 'addCallback should be a function' );
      assert && assert( typeof removeCallback === 'function', 'removeCallback should be a function' );

      this.particles.addListeners( addCallback, removeCallback );
    },

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @public
     */
    addParticle: function( alphaParticle ) {
      this.particles.add( alphaParticle );
    },

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @public
     */
    removeParticle: function( alphaParticle ) {
      this.particles.remove( alphaParticle );
    },

    /**
     * @protected
     */
    removeAllParticles: function() {
      this.particles.removeAll();
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
        if( !self.bounds.containsPoint( particle.position ) ) {
          self.removeParticle( particle );
        }
      } );
    },

    // @public
    step: function( dt ) {

      if( this.play ) {
        this.gun.step( dt );
        this.moveParticles( dt );
        this.cullParticles();
      }
    },

    /**
     * Step one frame manually.  Assuming 60 frames per second.
     */
    manualStep: function() {
        this.gun.step( this.maunalStepDt );
        this.moveParticles( this.maunalStepDt );
        this.cullParticles();
    },

    /**
     * @public
     */
    reset: function() {
      this.removeAllParticles();
      PropertySet.prototype.reset.call( this );
    }

  } ); // inherit

} ); // define
