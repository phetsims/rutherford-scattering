// Copyright 2018-2026, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringFluent from '../../RutherfordScatteringFluent.js';

// constants
const screenSummaryStringProperty = RutherfordScatteringFluent.a11y.screenSummaryStringProperty;

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