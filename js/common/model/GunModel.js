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
  var Random = require( 'DOT/Random' );
  var PropertySet = require( 'AXON/PropertySet' );

  // constants
  var RAND = new Random();
  var MAX_PARTICLES = 20;
  var GUN_INTENSITY = 1;
  var X0_MIN = 10;

  /**
   * {AtomModel} model
   * @constructor
   */
  function GunModel( model ) {

    this.model = model;
    this.dtSinceGunFired = 0;

    // @public
    PropertySet.call( this, {
      on: false // {boolean} is the gun on?
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

          var ySign = ( RAND.random() < 0.5 ? 1 : -1 );

          // random position withing model bounds
          var particleX = ySign * ( X0_MIN + ( RAND.random() * ( ( this.model.bounds.width / 2 ) - X0_MIN ) ) );
          var particleY = this.model.bounds.minY;

          var initialPosition = new Vector2( particleX, particleY );
          var alphaParticle = new AlphaParticleModel( {
            speed: initialSpeed,
            defaultSpeed: initialSpeed,
            position: initialPosition
          } );
          this.model.addParticle( alphaParticle );

          this.dtSinceGunFired = this.dtSinceGunFired % this.dtPerGunFired;
      }
    }

  } ); // inherit

} ); // define
