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
  var DEFAULT_MAX_PARTICLES = 20;
  var DEFAULT_GUN_SPEED = 1;
  var DEFAULT_GUN_INTENSITY = 1;

  /**
   * {AtomModel} model
   * @constructor
   */
  function GunModel( model ) {

    this.model = model;
    this.dtSinceGunFired = 0;
    this.dtPerGunFired = ( this.model.bounds.width / DEFAULT_GUN_SPEED ) / DEFAULT_MAX_PARTICLES; // FIXME: 500 = space height

    // @public
    PropertySet.call( this, {
      on: false // {boolean} is the gun on?
    } );
  }

  /*
  public static final double GUN_INTENSITY = 1.0; // 0-1 (1=100%)
  public static final DoubleRange INITIAL_SPEED_RANGE = new DoubleRange( 6, 12, 10, 1 );

  // Pick a randon location along the gun's nozzle width
  Point2D position = getRandomNozzlePoint();

  // Direction of alpha particle is same as gun's orientation.
  double orientation = getOrientation();

  // Create the alpha particle
  AlphaParticle alphaParticle = new AlphaParticle( position, orientation, _speed, _defaultSpeed );
  */

  rutherfordScattering.register( 'GunModel', GunModel );

  return inherit( PropertySet, GunModel, {

    // @public
    step: function( dt ) {

      this.dtSinceGunFired += ( DEFAULT_GUN_INTENSITY * dt );

      if ( this.dtSinceGunFired >= this.dtPerGunFired ) {

          // random position withing model bounds
          var particleX = this.model.bounds.width * Math.random();
          var initialPosition = new Vector2( particleX, 0 );
          var initialSpeed = this.model.alphaParticleEnergyProperty.get();
          var alphaParticle = new AlphaParticleModel( initialPosition, initialSpeed, DEFAULT_GUN_SPEED );
          this.model.addParticle( alphaParticle );

          this.dtSinceGunFired = this.dtSinceGunFired % this.dtPerGunFired;
      }
    }

  } ); // inherit

} ); // define
