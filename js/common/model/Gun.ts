// Copyright 2016-2021, University of Colorado Boulder

/**
 * Gun is the model of a gun that can fire alpha particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import dotRandom from '../../../../dot/js/dotRandom.js';
import LinearFunction from '../../../../dot/js/LinearFunction.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import AlphaParticle from './AlphaParticle.js';

// constants
const MAX_PARTICLES = 20;
const GUN_INTENSITY = 1;
const X0_MIN_FRACTION = 0.04; // closest particle can get horizontally to atom as a fraction of atomic bounds

class Gun {

  /**
   * {RSBaseModel} model
   */
  constructor( model ) {

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


  /**
   * {number} dt - time step
   * @public
   */
  step( dt ) {

    const initialSpeed = this.model.alphaParticleEnergyProperty.get();

    this.dtSinceGunFired += ( GUN_INTENSITY * dt );
    this.dtPerGunFired = ( this.model.bounds.width / initialSpeed ) / MAX_PARTICLES;

    if ( this.onProperty.get() && this.dtSinceGunFired >= this.dtPerGunFired ) {

      const ySign = ( dotRandom.nextDouble() < 0.5 ? 1 : -1 );

      // random position withing model bounds
      const rand = dotRandom.nextDouble();
      let particleX = ySign * rand * this.model.bounds.width / 2;

      // make sure that the particle was not directly fired at an atom to prevent trajectory failure
      const xMin = X0_MIN_FRACTION * this.model.bounds.width;
      this.model.getVisibleSpace().atoms.forEach( atom => {
        if ( Math.abs( particleX - atom.position.x ) < xMin ) {
          const correction = this.correctionFunction.evaluate( atom.boundingRect.bounds.width );
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
  }

  /**
   * Reset the gun to its initial state, which is off
   * @public
   */
  reset() {
    this.onProperty.reset();
  }
}

rutherfordScattering.register( 'Gun', Gun );

export default Gun;