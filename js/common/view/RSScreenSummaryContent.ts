// Copyright 2026, University of Colorado Boulder

/**
 * Screen summary content for Rutherford Scattering screens. Provides play area, control area,
 * and interaction hint descriptions for screen reader accessibility.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import ScreenSummaryContent, { ScreenSummaryContentOptions } from '../../../../joist/js/ScreenSummaryContent.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import rutherfordScattering from '../../rutherfordScattering.js';

type RSScreenSummaryContentOptions = WithRequired<ScreenSummaryContentOptions,
  'playAreaContent' | 'controlAreaContent' | 'interactionHintContent'>;

class RSScreenSummaryContent extends ScreenSummaryContent {

  public constructor( providedOptions: RSScreenSummaryContentOptions ) {
    super( providedOptions );
  }
}

rutherfordScattering.register( 'RSScreenSummaryContent', RSScreenSummaryContent );

export default RSScreenSummaryContent;