// Copyright 2016-2020, University of Colorado Boulder

/**
 * Visual representation of a plum pudding atom
 *
 * @author Dave Schmitz (Schmitzware)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import plumPuddingImage from '../../../images/plumPudding_png.js';
import rutherfordScattering from '../../rutherfordScattering.js';

/**
 * @param {Object} [options]
 * @constructor
 */
function PlumPuddingAtomNode( options ) {
  Image.call( this, plumPuddingImage, options );
}

rutherfordScattering.register( 'PlumPuddingAtomNode', PlumPuddingAtomNode );
inherit( Image, PlumPuddingAtomNode );
export default PlumPuddingAtomNode;