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
import RSConstants from '../../common/RSConstants.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordAtomSpace from './RutherfordAtomSpace.js';
import RutherfordNucleusSpace from './RutherfordNucleusSpace.js';

class RutherfordAtomModel extends RSBaseModel {
  constructor() {

    // interactions that create dependencies for the DerivedProperties that will track user interaction, generally
    // used by control panels to prevent multitouch issues by tracking when the user is changing something
    const energyInteractionProperty = new Property( false ); // interaction with the energy slider
    const protonInteractionProperty = new Property( false ); // interaction with the proton count slider
    const neutronInteractionProperty = new Property( false ); // interaction with the neutron count slider

    // @public - create a derived property for user interaction, so that the an interaction occurs when any dependency
    // is true
    const userInteractionProperty = DerivedProperty.or( [ energyInteractionProperty, protonInteractionProperty, neutronInteractionProperty ] );

    super( userInteractionProperty );

    // @public
    this.energyInteractionProperty = energyInteractionProperty;
    this.protonInteractionProperty = protonInteractionProperty;
    this.neutronInteractionProperty = neutronInteractionProperty;

    // @public {number}
    this.protonCountProperty = new Property( RSConstants.DEFAULT_PROTON_COUNT );

    // @public {number}
    this.neutronCountProperty = new Property( RSConstants.DEFAULT_NEUTRON_COUNT );

    // @public {string} - scene to display, 'atom'|'nucleus'
    this.sceneProperty = new Property( 'atom' );

    // @public (read-only) - spaces containing the atoms
    this.atomSpace = new RutherfordAtomSpace( this.protonCountProperty, this.bounds );
    this.nucleusSpace = new RutherfordNucleusSpace( this.protonCountProperty, this.neutronCountProperty, this.bounds );

    // @public (read-only)
    this.atomSpaces = [ this.atomSpace, this.nucleusSpace ];

  }

  /**
   * @public
   */
  reset() {
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