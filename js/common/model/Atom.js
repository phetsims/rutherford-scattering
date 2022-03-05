// Copyright 2016-2022, University of Colorado Boulder

/**
 * Base object for atoms. Keeps track of active particles within its bounds.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import { Shape } from '../../../../kite/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';

class Atom {

  /**
   * @param {Vector2} position
   * @param {number} boundingWidth
   * @param {Object} [options]
   */
  constructor( position, boundingWidth, options ) {

    // @public (read-only)
    this.position = position;

    const halfWidth = boundingWidth / 2;

    // @public (read-only) - bounding rect is always square
    this.boundingRect = Shape.rectangle( position.x - halfWidth, position.y - halfWidth, boundingWidth, boundingWidth );

    // @public (read-only) circle which contains the entire bounding box for the atom
    const radius = Math.sqrt( halfWidth * halfWidth + halfWidth * halfWidth );
    this.boundingCircle = Shape.circle( position.x, position.y, radius );

    // @private - array of particles that are currently in the bounding box of this atom
    this.particles = [];

  }


  /**
   * @param {AlphaParticle} alphaParticle
   * @public
   */
  addParticle( alphaParticle ) {
    this.particles.push( alphaParticle );

    // the 'initial position' for the particle relative to the atom center needs to be set once the particle enters
    // the bounding box for correct behavior of the trajectory algorithm
    alphaParticle.initialPosition = alphaParticle.positionProperty.get();
  }

  /**
   * @param {AlphaParticle} alphaParticle
   * @public
   */
  removeParticle( alphaParticle ) {
    const index = this.particles.indexOf( alphaParticle );
    if ( index > -1 ) {
      this.particles.splice( index, 1 );
    }
  }

  /**
   * @public
   */
  removeAllParticles() {
    this.particles.length = 0;
    this.stepEmitter.emit();
  }

  /**
   * A stub function to be implemented by derived objects. This just makes certain one is implemented.
   * @param {AlphaParticle} alphaParticle
   * @param {number} dt
   * @protected
   */
  moveParticle( alphaParticle, dt ) {
    assert && assert( false, 'No moveParticle model function implemented.' );
  }

  /**
   * @param {number} dt
   * @private
   */
  moveParticles( dt ) {
    this.particles.forEach( particle => {
      this.moveParticle( particle, dt );
    } );
  }

  /**
   * Culls alpha particles that have left the bounds of space.
   * @protected
   */
  cullParticles() {
    this.particles.forEach( particle => {
      if ( !this.bounds.containsPoint( particle.positionProperty.get() ) ) {
        this.removeParticle( particle );
      }
    } );
  }

  /**
   * {number} dt - time step
   * @public
   */
  step( dt ) {
    if ( this.running && !this.userInteraction && dt < 1 ) {
      this.gun.step( dt );
      this.moveParticles( dt );
      this.cullParticles();
    }

    this.stepEmitter.emit();
  }

  /**
   * Step one frame manually.  Assuming 60 frames per second.
   * @public
   */
  manualStep() {
    if ( !this.userInteraction ) {
      this.gun.step( this.maunalStepDt );
      this.moveParticles( this.maunalStepDt );
      this.cullParticles();
    }

    this.stepEmitter.emit();
  }

  /**
   * @public
   */
  reset() {
    this.gun.reset();
    this.removeAllParticles();
  }
}

rutherfordScattering.register( 'Atom', Atom );

export default Atom;