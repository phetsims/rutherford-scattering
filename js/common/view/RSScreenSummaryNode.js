// Copyright 2018-2024, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';

// constants
const screenSummaryString = RutherfordScatteringStrings.a11y.screenSummary;

class RSScreenSummaryNode extends ScreenSummaryContent {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {
    super( screenSummaryString );
  }
}

rutherfordScattering.register( 'RSScreenSummaryNode', RSScreenSummaryNode );

export default RSScreenSummaryNode;