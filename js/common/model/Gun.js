// Copyright 2016-2017, University of Colorado Boulder

/**
 * Gun is the model of a gun that can fire alpha particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */

define( function( require ) {
  'use strict';

  // modules
  var AlphaParticle = require( 'RUTHERFORD_SCATTERING/common/model/AlphaParticle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LinearFunction = require( 'DOT/LinearFunction' );
  var Property = require( 'AXON/Property' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var MAX_PARTICLES = 20;
  var GUN_INTENSITY = 1;
  var X0_MIN_FRACTION = 0.04; // closest particle can get horizontally to atom as a fraction of atomic bounds

  /**
   * {RSBaseModel} model
   * @constructor
   */
  function Gun( model ) {

    // @private
    this.model = model;

    // @private
    this.dtSinceGunFired = 0;

    // function to correct the initial position of the particle if necessary
    // the trajectory algorithm fails if particle is too close to nucleus,
    // so this correction ensure that this does not happen
    // map values determined empirically
    // @private - to prevent function instantiation every animation frame
    var width1 = 20;
    var width2 = this.model.bounds.width;
    var correction1 = 2;
    var correction2 = 10;
    this.correctionFunction = new LinearFunction( width1, width2, correction1, correction2 );

    // @public {boolean} is the gun on?
    this.onProperty = new Property( false );
  }

  rutherfordScattering.register( 'Gun', Gun );

  return inherit( Object, Gun, {

    /**
     * {number} dt - time step
     * @public
     */
    step: function( dt ) {

      var initialSpeed = this.model.alphaParticleEnergyProperty.get();

      this.dtSinceGunFired += ( GUN_INTENSITY * dt );
      this.dtPerGunFired = ( this.model.bounds.width / initialSpeed ) / MAX_PARTICLES;

      if ( this.onProperty.get() && this.dtSinceGunFired >= this.dtPerGunFired ) {

        var ySign = ( phet.joist.random.nextDouble() < 0.5 ? 1 : -1 );

        // random position withing model bounds
        var rand = phet.joist.random.nextDouble();
        var particleX = ySign * rand * this.model.bounds.width / 2;

        // make sure that the particle was not directly fired at an atom to prevent trajectory failure
        var self = this;
        var xMin = X0_MIN_FRACTION * this.model.bounds.width;
        this.model.getVisibleSpace().atoms.forEach( function ( atom ) {
          if ( Math.abs( particleX - atom.position.x ) < xMin ) {
            var correction = self.correctionFunction( atom.boundingRect.bounds.width );
            if ( particleX > atom.position.x ) {
              // particle is to the right of nucleus, push it farther away
              particleX += correction;
            }
            else {
              particleX -= correction;
            }
          }
        } );
        var particleY = this.model.bounds.minY;

        var initialPosition = new Vector2( particleX, particleY );
        var alphaParticle = new AlphaParticle( {
          speed: initialSpeed,
          defaultSpeed: initialSpeed,
          position: initialPosition
        } );
        this.model.addParticle( alphaParticle );

        this.dtSinceGunFired = this.dtSinceGunFired % this.dtPerGunFired;
      }
    },

    /**
     * Reset the gun to its initial state, which is off
     * @public
     */
    reset: function() {
      this.onProperty.reset();
    }

  } ); // inherit

} ); // define
