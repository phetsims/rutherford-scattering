// Copyright 2016-2021, University of Colorado Boulder

/**
 * Model for the 'Plum Pudding Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import RSBaseModel from '../../common/model/RSBaseModel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import PlumPuddingAtomSpace from './PlumPuddingAtomSpace.js';

class PlumPuddingAtomModel extends RSBaseModel {
  constructor() {

    // a property to track user interaction - only one element will change this in this screen,
    // so a DerivedProperty is not necessary as in RutherfordAtomModel
    const userInteractionProperty = new Property( false );

    super( userInteractionProperty );

    // @public (read-only) - space containing the atom
    this.plumPuddingSpace = new PlumPuddingAtomSpace( this.protonCountProperty, this.bounds );

    // @public (read-only)
    this.atomSpaces = [ this.plumPuddingSpace ];

  }
}

rutherfordScattering.register( 'PlumPuddingAtomModel', PlumPuddingAtomModel );

export default PlumPuddingAtomModel;