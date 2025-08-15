// Copyright 2016-2021, University of Colorado Boulder

/**
 * Model for the Plum Pudding Atom space.  In this representation, the particles move
 * straight through space, so no additional atom models are added.
 *
 * @author Jesse Greenberg
 */

import AtomSpace from '../../common/model/AtomSpace.js';
import rutherfordScattering from '../../rutherfordScattering.js';

class PlumPuddingAtomSpace extends AtomSpace {

  /**
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  constructor( protonCountProperty, bounds ) {
    super( protonCountProperty, bounds );
  }
}

rutherfordScattering.register( 'PlumPuddingAtomSpace', PlumPuddingAtomSpace );

export default PlumPuddingAtomSpace;