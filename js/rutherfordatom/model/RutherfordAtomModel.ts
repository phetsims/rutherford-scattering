// Copyright 2016-2026, University of Colorado Boulder

/**
 * Model for the 'Rutherford Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import Property from '../../../../axon/js/Property.js';
import RSBaseModel from '../../common/model/RSBaseModel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordAtomSpace from './RutherfordAtomSpace.js';
import RutherfordNucleusSpace from './RutherfordNucleusSpace.js';

export type RutherfordAtomScenes = 'atom' | 'nucleus';

class RutherfordAtomModel extends RSBaseModel {

  // Scene to display, 'atom'|'nucleus'
  public readonly sceneProperty: Property<RutherfordAtomScenes>;
  
  // Spaces containing the atoms
  public readonly atomSpace: RutherfordAtomSpace;
  public readonly nucleusSpace: RutherfordNucleusSpace;

  public constructor() {

    super();

    this.sceneProperty = new Property<RutherfordAtomScenes>( 'atom' );

    this.atomSpace = new RutherfordAtomSpace( this.protonCountProperty, this.bounds );
    this.nucleusSpace = new RutherfordNucleusSpace( this.protonCountProperty, this.neutronCountProperty, this.bounds );

    this.atomSpaces.push( this.atomSpace );
    this.atomSpaces.push( this.nucleusSpace );

  }

  public override reset(): void {
    this.sceneProperty.reset();

    super.reset();
  }
}

rutherfordScattering.register( 'RutherfordAtomModel', RutherfordAtomModel );

export default RutherfordAtomModel;