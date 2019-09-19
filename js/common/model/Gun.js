// Copyright 2016-2018, University of Colorado Boulder

/**
 * Gun is the model of a gun that can fire alpha particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */

define( require => {
  'use strict';

  // modules
  const AlphaParticle = require( 'RUTHERFORD_SCATTERING/common/model/AlphaParticle' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearFunction = require( 'DOT/LinearFunction' );
  const Property = require( 'AXON/Property' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const MAX_PARTICLES = 20;
  const GUN_INTENSITY = 1;
  const X0_MIN_FRACTION = 0.04; // closest particle can get horizontally to atom as a fraction of atomic bounds

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
    const width1 = 20;
    const width2 = this.model.bounds.width;
    const correction1 = 2;
    const correction2 = 10;
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

      const initialSpeed = this.model.alphaParticleEnergyProperty.get();

      this.dtSinceGunFired += ( GUN_INTENSITY * dt );
      this.dtPerGunFired = ( this.model.bounds.width / initialSpeed ) / MAX_PARTICLES;

      if ( this.onProperty.get() && this.dtSinceGunFired >= this.dtPerGunFired ) {

        const ySign = ( phet.joist.random.nextDouble() < 0.5 ? 1 : -1 );

        // random position withing model bounds
        const rand = phet.joist.random.nextDouble();
        let particleX = ySign * rand * this.model.bounds.width / 2;

        // make sure that the particle was not directly fired at an atom to prevent trajectory failure
        const self = this;
        const xMin = X0_MIN_FRACTION * this.model.bounds.width;
        this.model.getVisibleSpace().atoms.forEach( function ( atom ) {
          if ( Math.abs( particleX - atom.position.x ) < xMin ) {
            const correction = self.correctionFunction( atom.boundingRect.bounds.width );
            if ( particleX > atom.position.x ) {
              // particle is to the right of nucleus, push it farther away
              particleX += correction;
            }
            else {
              particleX -= correction;
            }
          }
        } );
        const particleY = this.model.bounds.minY;

        const initialPosition = new Vector2( particleX, particleY );
        const alphaParticle = new AlphaParticle( {
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
