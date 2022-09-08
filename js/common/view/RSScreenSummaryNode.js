// Copyright 2018-2022, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import { Node } from '../../../../scenery/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';

// constants
const screenSummaryString = RutherfordScatteringStrings.a11y.screenSummary;

class RSScreenSummaryNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( {
      tagName: 'p',
      innerContent: screenSummaryString
    } );
  }
}

rutherfordScattering.register( 'RSScreenSummaryNode', RSScreenSummaryNode );

export default RSScreenSummaryNode;