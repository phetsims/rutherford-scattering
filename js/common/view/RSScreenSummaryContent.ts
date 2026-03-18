// Copyright 2026, University of Colorado Boulder

/**
 * Screen summary content for Rutherford Scattering screens. Provides play area, control area,
 * and interaction hint descriptions for screen reader accessibility.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ScreenSummaryContent from '../../../../joist/js/ScreenSummaryContent.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringFluent from '../../RutherfordScatteringFluent.js';

type RSScreenType = 'rutherfordAtom' | 'plumPuddingAtom';

class RSScreenSummaryContent extends ScreenSummaryContent {

  public constructor( screenType: RSScreenType ) {
    super( {
      playAreaContent: RutherfordScatteringFluent.a11y.screenSummary[ screenType ].playAreaStringProperty,
      controlAreaContent: RutherfordScatteringFluent.a11y.screenSummary[ screenType ].controlAreaStringProperty,
      interactionHintContent: RutherfordScatteringFluent.a11y.screenSummary[ screenType ].interactionHintStringProperty
    } );
  }
}

rutherfordScattering.register( 'RSScreenSummaryContent', RSScreenSummaryContent );

export default RSScreenSummaryContent;