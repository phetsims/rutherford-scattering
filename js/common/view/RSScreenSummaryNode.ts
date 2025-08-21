// Copyright 2018-2025, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';

// constants
const screenSummaryStringProperty = RutherfordScatteringStrings.a11y.screenSummaryStringProperty;

class RSScreenSummaryNode extends ScreenSummaryContent {

  public constructor() {
    super( {
      additionalContent: [
        screenSummaryStringProperty
      ]
    } );
  }
}

rutherfordScattering.register( 'RSScreenSummaryNode', RSScreenSummaryNode );

export default RSScreenSummaryNode;