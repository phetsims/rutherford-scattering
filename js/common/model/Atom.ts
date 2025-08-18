// Copyright 2016-2025, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

/**
 * Base object for atoms. Keeps track of active particles within its bounds.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import TEmitter from '../../../../axon/js/TEmitter.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import Shape from '../../../../kite/js/Shape.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import AlphaParticle from './AlphaParticle.js';

class Atom {

  // (read-only)
  public readonly position: Vector2;

  // (read-only) - bounding rect is always square
  public readonly boundingRect: Shape;

  // (read-only) circle which contains the entire bounding box for the atom
  public readonly boundingCircle: Shape;

  // array of particles that are currently in the bounding box of this atom
  public particles: AlphaParticle[] = [];

  // Properties that should be implemented by subclasses
  protected stepEmitter!: TEmitter;
  protected bounds!: Bounds2;
  protected running!: boolean;
  protected userInteraction!: boolean;
  protected gun!: any; // Gun type - will be properly typed in subclasses
  protected manualStepDt!: number;

  /**
   * @param position
   * @param boundingWidth
   * @param options
   */
  public constructor( position: Vector2, boundingWidth: number, options?: object ) {

    this.position = position;

    const halfWidth = boundingWidth / 2;

    this.boundingRect = Shape.rectangle( position.x - halfWidth, position.y - halfWidth, boundingWidth, boundingWidth );

    const radius = Math.sqrt( halfWidth * halfWidth + halfWidth * halfWidth );
    this.boundingCircle = Shape.circle( position.x, position.y, radius );

  }


  /**
   * @param alphaParticle
   */
  public addParticle( alphaParticle: AlphaParticle ): void {
    this.particles.push( alphaParticle );

    // the 'initial position' for the particle relative to the atom center needs to be set once the particle enters
    // the bounding box for correct behavior of the trajectory algorithm
    alphaParticle.initialPosition = alphaParticle.positionProperty.get();
  }

  /**
   * @param alphaParticle
   */
  public removeParticle( alphaParticle: AlphaParticle ): void {
    const index = this.particles.indexOf( alphaParticle );
    if ( index > -1 ) {
      this.particles.splice( index, 1 );
    }
  }

  public removeAllParticles(): void {
    this.particles.length = 0;
    this.stepEmitter.emit();
  }

  /**
   * A stub function to be implemented by derived objects. This just makes certain one is implemented.
   * @param alphaParticle
   * @param dt
   */
  protected moveParticle( alphaParticle: AlphaParticle, dt: number ): void {
    assert && assert( false, 'No moveParticle model function implemented.' );
  }

  /**
   * @param dt
   */
  public moveParticles( dt: number ): void {
    this.particles.forEach( particle => {
      this.moveParticle( particle, dt );
    } );
  }

  /**
   * Culls alpha particles that have left the bounds of space.
   */
  protected cullParticles(): void {
    this.particles.forEach( particle => {
      if ( !this.bounds.containsPoint( particle.positionProperty.get() ) ) {
        this.removeParticle( particle );
      }
    } );
  }

  /**
   * @param dt - time step
   */
  public step( dt: number ): void {
    if ( this.running && !this.userInteraction && dt < 1 ) {
      this.gun.step( dt );
      this.moveParticles( dt );
      this.cullParticles();
    }

    this.stepEmitter.emit();
  }

  /**
   * Step one frame manually.  Assuming 60 frames per second.
   */
  public manualStep(): void {
    if ( !this.userInteraction ) {
      this.gun.step( this.manualStepDt );
      this.moveParticles( this.manualStepDt );
      this.cullParticles();
    }

    this.stepEmitter.emit();
  }

  public reset(): void {
    this.gun.reset();
    this.removeAllParticles();
  }
}

rutherfordScattering.register( 'Atom', Atom );

export default Atom;