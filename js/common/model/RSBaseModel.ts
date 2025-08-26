// Copyright 2016-2021, University of Colorado Boulder

/**
 * Base object for the models. Keeps track of all active particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Emitter from '../../../../axon/js/Emitter.js';
import Multilink from '../../../../axon/js/Multilink.js';
import Property from '../../../../axon/js/Property.js';
import TEmitter from '../../../../axon/js/TEmitter.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSConstants from '../RSConstants.js';
import AlphaParticle from './AlphaParticle.js';
import AtomSpace from './AtomSpace.js';
import Gun from './Gun.js';

class RSBaseModel {

  public readonly runningProperty: Property<boolean>;
  public readonly userInteractionProperty: Property<boolean>;
  public readonly bounds: Bounds2;
  public readonly gun: Gun;
  public readonly particles: AlphaParticle[];
  public readonly atomSpaces: AtomSpace[];
  public readonly manualStepDt: number;
  public readonly stepEmitter: TEmitter<[ number ]>;
  public readonly alphaParticleEnergyProperty: Property<number>;
  public readonly protonCountProperty: Property<number>;
  public readonly neutronCountProperty: Property<number>;

  public constructor() {

    assert && assert( RSConstants.SPACE_NODE_WIDTH === RSConstants.SPACE_NODE_HEIGHT, 'Space must be square.' );

    // model computation space
    this.alphaParticleEnergyProperty = new Property( RSConstants.DEFAULT_ALPHA_ENERGY );

    this.runningProperty = new Property( true );

    this.protonCountProperty = new Property( RSConstants.DEFAULT_PROTON_COUNT );
    this.neutronCountProperty = new Property( RSConstants.DEFAULT_NEUTRON_COUNT );

    this.userInteractionProperty = new Property( false );

    // model computation space
    this.bounds = new Bounds2(
      -RSConstants.SPACE_NODE_WIDTH / 4,
      -RSConstants.SPACE_NODE_HEIGHT / 4,
      RSConstants.SPACE_NODE_WIDTH / 4,
      RSConstants.SPACE_NODE_HEIGHT / 4 );

    // all active alpha particle models
    this.particles = [];

    this.atomSpaces = [];

    // manual step size used when sim is paused
    this.manualStepDt = 1 / 60;

    // the gun which introduces (aka. 'shoots') alpha particles
    this.gun = new Gun( this );

    // used to signal when a sim step has occurred
    this.stepEmitter = new Emitter<[ number ]>( { parameters: [ { valueType: 'number' } ] } );

    Multilink.lazyMultilink(
      [ this.protonCountProperty, this.neutronCountProperty, this.alphaParticleEnergyProperty, this.userInteractionProperty ],
      () => {
        this.removeAllParticles();
      }
    );
  }


  /**
   * Registers a listener to be called at each step of the model execution
   * @param listener
   */
  public addStepListener( listener: () => void ): void {
    this.stepEmitter.addListener( listener );
  }

  /**
   * Get the space which is currently visible.
   */
  public getVisibleSpace(): AtomSpace {
    let visibleSpace: AtomSpace | undefined;
    this.atomSpaces.forEach( space => {
      if ( space.isVisible ) {
        visibleSpace = space;
      }
    } );
    assert && assert( visibleSpace, 'There must be a visible space' );

    return visibleSpace!;
  }

  /**
   * Add a particle to the visible space.
   * @param alphaParticle
   */
  public addParticle( alphaParticle: AlphaParticle ): void {
    this.particles.push( alphaParticle );

    // add the particle to the space
    this.getVisibleSpace().addParticle( alphaParticle );
  }

  /**
   * Remove a particle from the visible space
   * @param alphaParticle
   */
  public removeParticle( alphaParticle: AlphaParticle ): void {
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
   */
  public removeAllParticles(): void {
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
    this.stepEmitter.emit( this.manualStepDt );
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
   * Move all particles in the visible space.
   * @param dt
   */
  private moveParticles( dt: number ): void {

    // move particles owned by the visible space
    this.getVisibleSpace().moveParticles( dt );
  }

  /**
   * Culls alpha particles that have left the bounds of model space.
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
   */
  public manualStep(): void {
    if ( !this.userInteractionProperty.value ) {
      this.gun.step( this.manualStepDt );
      this.moveParticles( this.manualStepDt );
      this.cullParticles();
    }

    this.stepEmitter.emit( this.manualStepDt );
  }

  public reset(): void {
    this.gun.reset();
    this.removeAllParticles();
    this.alphaParticleEnergyProperty.reset();
    this.runningProperty.reset();
    this.userInteractionProperty.reset();
    this.protonCountProperty.reset();
    this.neutronCountProperty.reset();
  }
}

rutherfordScattering.register( 'RSBaseModel', RSBaseModel );

export default RSBaseModel;