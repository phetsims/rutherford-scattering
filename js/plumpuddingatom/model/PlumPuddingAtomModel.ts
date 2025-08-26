// Copyright 2016-2021, University of Colorado Boulder

/**
 * Model for the 'Plum Pudding Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import RSBaseModel from '../../common/model/RSBaseModel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import PlumPuddingAtomSpace from './PlumPuddingAtomSpace.js';

class PlumPuddingAtomModel extends RSBaseModel {

  // space containing the atom
  public readonly plumPuddingSpace: PlumPuddingAtomSpace;

  public constructor() {

    super();

    this.plumPuddingSpace = new PlumPuddingAtomSpace( this.protonCountProperty, this.bounds );

    this.atomSpaces.push( this.plumPuddingSpace );
  }
}

rutherfordScattering.register( 'PlumPuddingAtomModel', PlumPuddingAtomModel );

export default PlumPuddingAtomModel;