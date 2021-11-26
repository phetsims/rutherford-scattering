// Copyright 2018-2021, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import { Node } from '../../../../scenery/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import rutherfordScatteringStrings from '../../rutherfordScatteringStrings.js';

// constants
const screenSummaryString = rutherfordScatteringStrings.a11y.screenSummary;

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