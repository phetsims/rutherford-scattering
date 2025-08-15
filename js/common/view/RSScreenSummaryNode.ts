// Copyright 2018-2025, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

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
    super( {
      additionalContent: [
        screenSummaryString
      ]
    } );
  }
}

rutherfordScattering.register( 'RSScreenSummaryNode', RSScreenSummaryNode );

export default RSScreenSummaryNode;