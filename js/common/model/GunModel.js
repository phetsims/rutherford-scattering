// Copyright 2002-2016, University of Colorado Boulder

/**
 * Gun is the model of a gun that can fire alpha particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var AlphaParticleModel = require( 'RUTHERFORD_SCATTERING/common/model/AlphaParticleModel' );
  var Vector2 = require( 'DOT/Vector2' );
  var PropertySet = require( 'AXON/PropertySet' );

  // constants
  var MAX_PARTICLES = 20;
  var GUN_INTENSITY = 1;

  /**
   * {AtomModel} model
   * @constructor
   */
  function GunModel( model ) {

    this.model = model;
    this.dtSinceGunFired = 0;

    // @public
    PropertySet.call( this, {
      on: true // {boolean} is the gun on?
    } );
  }

  rutherfordScattering.register( 'GunModel', GunModel );

  return inherit( PropertySet, GunModel, {

    /**
     * {number} dt - time step
     * @public
     */
    step: function( dt ) {

      var initialSpeed = this.model.alphaParticleEnergyProperty.get();

      this.dtSinceGunFired += ( GUN_INTENSITY * dt );
      this.dtPerGunFired = ( this.model.bounds.width / initialSpeed ) / MAX_PARTICLES;

      if ( this.on && this.dtSinceGunFired >= this.dtPerGunFired ) {

          // random position withing model bounds
          var particleX = this.model.bounds.width * Math.random();
          var initialPosition = new Vector2( particleX, 0 );
          var alphaParticle = new AlphaParticleModel( {
            speed: initialSpeed,
            position: initialPosition
          } );
          this.model.addParticle( alphaParticle );

          this.dtSinceGunFired = this.dtSinceGunFired % this.dtPerGunFired;
      }
    }

  } ); // inherit

} ); // define
