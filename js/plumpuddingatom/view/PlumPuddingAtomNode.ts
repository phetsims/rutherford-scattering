// Copyright 2016-2025, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

/**
 * Visual representation of a plum pudding atom
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Image from '../../../../scenery/js/nodes/Image.js';
import plumPudding_png from '../../../images/plumPudding_png.js';
import rutherfordScattering from '../../rutherfordScattering.js';

class PlumPuddingAtomNode extends Image {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( plumPudding_png, options );
  }
}

rutherfordScattering.register( 'PlumPuddingAtomNode', PlumPuddingAtomNode );
export default PlumPuddingAtomNode;