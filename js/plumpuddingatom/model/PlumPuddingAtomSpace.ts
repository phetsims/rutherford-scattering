// Copyright 2016-2026, University of Colorado Boulder

/**
 * Model for the Plum Pudding Atom space.  In this representation, the particles move
 * straight through space, so no additional atom models are added.
 *
 * @author Jesse Greenberg
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import AtomSpace from '../../common/model/AtomSpace.js';

class PlumPuddingAtomSpace extends AtomSpace {

  public constructor( protonCountProperty: Property<number>, bounds: Bounds2 ) {
    super( protonCountProperty, bounds );
  }
}

export default PlumPuddingAtomSpace;
