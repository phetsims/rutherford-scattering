// Copyright 2016-2021, University of Colorado Boulder

/**
 * Base object for the models. Keeps track of all active particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSConstants from '../RSConstants.js';
import Gun from './Gun.js';

class RSBaseModel {

  /**
   * @param {Property} userInteractionProperty - true while the user is interacting with something that should stop
   *                                             and remove all particles from the atom space.
   */
  constructor( userInteractionProperty ) {

    assert && assert( RSConstants.SPACE_NODE_WIDTH === RSConstants.SPACE_NODE_HEIGHT, 'Space must be square.' );

    // @public {number}
    this.alphaParticleEnergyProperty = new Property( RSConstants.DEFAULT_ALPHA_ENERGY );

    // @public {boolean}
    this.runningProperty = new Property( true );

    // @public
    this.userInteractionProperty = userInteractionProperty;

    // @public (read-only) model computation space
    this.bounds = new Bounds2(
      -RSConstants.SPACE_NODE_WIDTH / 4,
      -RSConstants.SPACE_NODE_HEIGHT / 4,
      RSConstants.SPACE_NODE_WIDTH / 4,
      RSConstants.SPACE_NODE_HEIGHT / 4 );

    // @public (read-only) - {AlphaParticle[]} all active alpha particle models
    this.particles = [];

    // @protected - {Array.<RutherfordAtomSpace|PlumPuddingAtomSpace|RutherfordNucleusSpace>}
    this.atomSpaces = [];

    // @protected - manual step size used when sim is paused
    this.maunalStepDt = 1 / 60;

    // @protected - the gun which introduces (aka. 'shoots') alpha particles
    this.gun = new Gun( this );

    // @protected - used to signal when a sim step has occurred
    this.stepEmitter = new Emitter( { parameters: [ { valueType: 'number' } ] } );

    // no need to unlink this property as base model will exist for life of sim
    const userInteractionListener = userInteraction => {
      if ( userInteraction ) {
        this.removeAllParticles();
      }
    };
    this.userInteractionProperty.link( userInteractionListener );
  }


  /**
   * Registers a listener to be called at each step of the model execution
   * @param {function()} listener
   * @public
   */
  addStepListener( listener ) {
    this.stepEmitter.addListener( listener );
  }

  /**
   * Get the space which is currently visible.
   * @returns {AtomSpace}
   * @public
   */
  getVisibleSpace() {
    let visibleSpace;
    this.atomSpaces.forEach( space => {
      if ( space.isVisible ) {
        visibleSpace = space;
      }
    } );
    assert && assert( visibleSpace, 'There must be a visible space' );

    return visibleSpace;
  }

  /**
   * Add a particle to the visible space.
   * @param {AlphaParticle} alphaParticle
   * @public
   */
  addParticle( alphaParticle ) {
    this.particles.push( alphaParticle );

    // add the particle to the space
    this.getVisibleSpace().addParticle( alphaParticle );
  }

  /**
   * Remove a particle from the visible space
   * @param {AlphaParticle} alphaParticle
   * @public
   */
  removeParticle( alphaParticle ) {
    // remove the particle from the visible space
    const visibleSpace = this.getVisibleSpace();
    visibleSpace.removeParticle( alphaParticle );

    // remove the particle from its atom if scattered
    visibleSpace.atoms.forEach( atom => {
      atom.removeParticle( alphaParticle );
    } );

    // remove the particle from the base model
    const index = this.particles.indexOf( alphaParticle );
    if ( index > -1 ) {
      this.particles.splice( index, 1 );
    }
  }

  /**
   * Remove all particles from this model and its atoms.
   * @public
   */
  removeAllParticles() {
    // remove the particles from the visible space
    const visibleSpace = this.getVisibleSpace();
    visibleSpace.removeAllParticles();

    // remove all particles from the atoms
    visibleSpace.atoms.forEach( atom => {
      atom.particles.length = 0;
    } );

    // dispose all particles
    this.particles.forEach( particle => {
      particle.dispose();
    } );
    this.particles.length = 0;
    this.stepEmitter.emit( this.maunalStepDt );
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
   * Move all particles in the visible space.
   * @param {number} dt
   * @private
   */
  moveParticles( dt ) {

    // move particles owned by the visible space
    this.getVisibleSpace().moveParticles( dt );
  }

  /**
   * Culls alpha particles that have left the bounds of model space.
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
    if ( this.runningProperty.get() && !this.userInteractionProperty.value && dt < 1 ) {
      this.gun.step( dt );

      // move particles
      this.moveParticles( dt );

      // remove particles out of bounds
      this.cullParticles();
    }

    this.stepEmitter.emit( dt );
  }

  /**
   * Step one frame manually.  Assuming 60 frames per second.
   * @public
   */
  manualStep() {
    if ( !this.userInteractionProperty.value ) {
      this.gun.step( this.maunalStepDt );
      this.moveParticles( this.maunalStepDt );
      this.cullParticles();
    }

    this.stepEmitter.emit( this.maunalStepDt );
  }

  /**
   * @public
   */
  reset() {
    this.gun.reset();
    this.removeAllParticles();
    this.alphaParticleEnergyProperty.reset();
    this.runningProperty.reset();
  }
}

rutherfordScattering.register( 'RSBaseModel', RSBaseModel );

export default RSBaseModel;