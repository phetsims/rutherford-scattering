// Copyright 2016-2020, University of Colorado Boulder

/**
 * Model for the Plum Pudding Atom space.  In this representation, the particles move
 * straight through space, so no additional atom models are added.
 *
 * @author Jesse Greenberg
 */

import inherit from '../../../../phet-core/js/inherit.js';
import AtomSpace from '../../common/model/AtomSpace.js';
import rutherfordScattering from '../../rutherfordScattering.js';

/**
 * Constructor.
 * @param {Property.<number>} protonCountProperty
 * @param {Bounds2} bounds
 */
function PlumPuddingAtomSpace( protonCountProperty, bounds ) {

  AtomSpace.call( this, protonCountProperty, bounds );

}

rutherfordScattering.register( 'PlumPuddingAtomSpace', PlumPuddingAtomSpace );

inherit( AtomSpace, PlumPuddingAtomSpace );
export default PlumPuddingAtomSpace;