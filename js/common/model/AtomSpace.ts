// Copyright 2016-2021, University of Colorado Boulder

/**
 * Model for the Rutherford Atom space, responsible for atoms of the model and model bounds.
 *
 * @author Jesse Greenberg
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import AlphaParticle from './AlphaParticle.js';

class AtomSpace {

  /**
   * Constructor.
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   * @param {Object} [options]
   */
  constructor( protonCountProperty, bounds, options ) {

    options = merge( {
      atomWidth: bounds.width // width of each atom in the space, width of space by default
    }, options );

    // @public (read-only)
    this.atoms = [];
    this.particles = []; // all particles contained by this space
    this.particlesInEmptySpace = []; // all particles in empty space, excluding those that are in an atom
    this.bounds = bounds;
    this.atomWidth = options.atomWidth;

    // emitter which signifies that a particle has been transitioned to a new atom
    this.particleTransitionedEmitter = new Emitter( { parameters: [ { valueType: AlphaParticle } ] } );

    // @public - emitter which signifies that a particle has been removed from an atom
    this.particleRemovedFromAtomEmitter = new Emitter( { parameters: [ { valueType: AlphaParticle } ] } );

    // when a particle has been removed from an atom, remove it from the space as well
    // no need to remove listener, exists for life of sim
    this.particleRemovedFromAtomEmitter.addListener( particle => {
      this.removeParticle( particle );
    } );

    // @public - whether this space is visible or not
    this.isVisible = true;
  }

  /**
   * Add a particle to this space, and track it as being in the empty space
   * at first.
   * @param {AlphaParticle} alphaParticle
   * @public
   */
  addParticle( alphaParticle ) {
    this.particles.push( alphaParticle );
    this.addParticleToEmptySpace( alphaParticle );
  }

  /**
   * Add a particle to empty space.  Particles in the empty space
   * are outside the bounds of an atom, and the AtomSpace will transition
   * the particle from one atom to another if it comes within atomic bounds.
   * @param {AlphaParticle} alphaParticle
   * @private
   */
  addParticleToEmptySpace( alphaParticle ) {
    alphaParticle.isInSpace = true;
    this.particlesInEmptySpace.push( alphaParticle );
  }

  /**
   * Remove a particle from this space amd the model entirely.
   * @param  {AlphaParticle} alphaParticle
   * @public
   */
  removeParticle( alphaParticle ) {
    const index = this.particles.indexOf( alphaParticle );
    if ( index > -1 ) {
      this.particles.splice( index, 1 );
      this.removeParticleFromEmptySpace( alphaParticle );
    }
  }

  /**
   * Remove a particle from empty space.  The particle may still be associated
   * with the model, but is inside of an atom in the space.
   * @param  {AlphaParticle} alphaParticle
   * @private
   */
  removeParticleFromEmptySpace( alphaParticle ) {
    const index = this.particlesInEmptySpace.indexOf( alphaParticle );
    if ( index > -1 ) {
      alphaParticle.isInSpace = false;
      this.particlesInEmptySpace.splice( index, 1 );
    }
  }

  /**
   * Remove all particles from the space, including those that are in the empty space.
   * @public
   */
  removeAllParticles() {
    this.particles.length = 0;
    this.particlesInEmptySpace.length = 0;
  }

  /**
   * Transition a particle in empty space to an atom if the particle hits atomic bounds.  If the particle hits
   * a new atom's bounding circle, a new shape is prepared and transformed for the trajectory algorithm.  Once
   * the particle hits the atom's bounding box, the prepared shape is applied, and the atom will cary out
   * the trajectory until the particle reaches a new atom.
   * @private
   */
  transitionParticlesToAtoms() {
    for ( let i = 0; i < this.particlesInEmptySpace.length; i++ ) {
      const particle = this.particlesInEmptySpace[ i ];

      for ( let j = 0; j < this.atoms.length; j++ ) {
        const atom = this.atoms[ j ];

        if ( particle.preparedAtom !== atom && atom.boundingCircle.containsPoint( particle.positionProperty.get() ) ) {
          particle.prepareBoundingBox( atom );
          particle.preparedAtom = atom;

          // purely for debugging to visualize transformed shapes
          this.particleTransitionedEmitter.emit( particle );

        }

        // apply bounding box if it is prepared and the particle reaches the atomic bounding box
        if ( particle.preparedBoundingBox ) {
          if ( particle.preparedBoundingBox.containsPoint( particle.positionProperty.get() ) && particle.atom !== particle.preparedAtom ) {
            if ( particle.atom ) {
              // if the particle already belongs to an atom, remove it from the atom
              particle.atom.removeParticle( particle );
            }
            // immediately set the atom so it stops traveling farther into the box
            particle.atom = particle.preparedAtom;
            particle.preparedAtom.addParticle( particle );

            particle.boundingBox = particle.preparedBoundingBox;
            particle.rotationAngle = particle.preparedRotationAngle;

            this.removeParticleFromEmptySpace( particle );
          }
        }
      }
    }
  }

  /**
   * Once the particle leaves the bounding circle of an atom, add it back to the space so that it
   * can be added to a new particle for multiple deflections if necessary.
   * @public
   */
  transitionParticlesToSpace() {
    for ( let i = 0; i < this.particles.length; i++ ) {
      const particle = this.particles[ i ];

      if ( !particle.isInSpace ) {
        // if the particle leaves the bounding circle of its atom, add it back into empty space
        if ( !particle.atom.boundingCircle.containsPoint( particle.positionProperty.get() ) ) {
          // once the particle exits the atom's bounding box, remove it
          this.addParticleToEmptySpace( particle );
        }
      }
    }
  }

  /**
   * All particles that are in the space and not contained by an atom need to move straight through.
   * If a particle moves into an atom's bounds, it should be removed from the space and added to
   * that atom.  The atom will then handle the particle's trajectory through space.
   * @private
   */
  moveParticles( dt ) {

    // move particles into atoms if they reach atomic bounds
    this.transitionParticlesToAtoms();

    // move particles back into empty space if they leave atomic bounds
    this.transitionParticlesToSpace();

    // move particles in empty space straight through
    for ( let i = 0; i < this.particles.length; i++ ) {
      const alphaParticle = this.particles[ i ];

      if ( !alphaParticle.atom ) {
        const speed = alphaParticle.speedProperty.get();
        const distance = speed * dt;
        const direction = alphaParticle.orientationProperty.get();
        const dx = Math.cos( direction ) * distance;
        const dy = Math.sin( direction ) * distance;
        const position = alphaParticle.positionProperty.get();
        const x = position.x + dx;
        const y = position.y + dy;
        alphaParticle.positionProperty.set( new Vector2( x, y ) );
      }
    }

    // move particles contained by atomic bounds
    this.atoms.forEach( atom => {
      atom.moveParticles( dt );
    } );
  }

  /**
   * Check to make sure that the atom bounds do not overlap each other.
   * Added to prototype so that subtypes can check their atoms once they
   * have been instantiated.
   * @public
   */
  checkAtomBounds() {
    // make sure that none of the atoms overlap each other
    for ( let i = 0; i < this.atoms.length - 1; i++ ) {
      for ( let j = i + 1; j < this.atoms.length; j++ ) {
        // get the atom bounds and erode slightly because bounds should perfectly overlap at edges
        const atom1Bounds = this.atoms[ i ].boundingRect.bounds;
        const atom2Bounds = this.atoms[ j ].boundingRect.bounds;
        const boundsIntersect = atom1Bounds.intersectsBounds( atom2Bounds );
        assert && assert( !boundsIntersect, 'Atom bounds intersect' );
      }
    }
  }
}

rutherfordScattering.register( 'AtomSpace', AtomSpace );

export default AtomSpace;