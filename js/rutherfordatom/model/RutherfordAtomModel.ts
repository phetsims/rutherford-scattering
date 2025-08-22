// Copyright 2016-2022, University of Colorado Boulder

/**
 * Model for the 'Rutherford Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import RSBaseModel from '../../common/model/RSBaseModel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordAtomSpace from './RutherfordAtomSpace.js';
import RutherfordNucleusSpace from './RutherfordNucleusSpace.js';

class RutherfordAtomModel extends RSBaseModel {

  // Interaction with the energy slider
  public readonly energyInteractionProperty: Property<boolean>;
  
  // Interaction with the proton count slider
  public readonly protonInteractionProperty: Property<boolean>;
  
  // Interaction with the neutron count slider
  public readonly neutronInteractionProperty: Property<boolean>;
  
  // Scene to display, 'atom'|'nucleus'
  public readonly sceneProperty: Property<string>;
  
  // Spaces containing the atoms
  public readonly atomSpace: RutherfordAtomSpace;
  public readonly nucleusSpace: RutherfordNucleusSpace;

  public constructor() {

    // interactions that create dependencies for the DerivedProperties that will track user interaction, generally
    // used by control panels to prevent multitouch issues by tracking when the user is changing something
    const energyInteractionProperty = new Property( false ); // interaction with the energy slider
    const protonInteractionProperty = new Property( false ); // interaction with the proton count slider
    const neutronInteractionProperty = new Property( false ); // interaction with the neutron count slider

    // create a derived property for user interaction,
    // so that an interaction occurs when any dependency is true
    const userInteractionProperty = DerivedProperty.or( [ energyInteractionProperty, protonInteractionProperty, neutronInteractionProperty ] );

    super( userInteractionProperty );

    this.energyInteractionProperty = energyInteractionProperty;
    this.protonInteractionProperty = protonInteractionProperty;
    this.neutronInteractionProperty = neutronInteractionProperty;

    this.sceneProperty = new Property( 'atom' );

    this.atomSpace = new RutherfordAtomSpace( this.protonCountProperty, this.bounds );
    this.nucleusSpace = new RutherfordNucleusSpace( this.protonCountProperty, this.neutronCountProperty, this.bounds );

    this.atomSpaces.push( this.atomSpace );
    this.atomSpaces.push( this.nucleusSpace );

  }

  public override reset(): void {
    this.protonCountProperty.reset();
    this.neutronCountProperty.reset();
    this.sceneProperty.reset();
    this.energyInteractionProperty.reset();
    this.protonInteractionProperty.reset();
    this.neutronInteractionProperty.reset();

    super.reset();
  }
}

rutherfordScattering.register( 'RutherfordAtomModel', RutherfordAtomModel );

export default RutherfordAtomModel;