// Copyright 2026, University of Colorado Boulder

/**
 * Keyboard help content for Rutherford Scattering. Used by all screens.
 *
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import BasicActionsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/BasicActionsKeyboardHelpSection.js';
import SliderControlsKeyboardHelpSection from '../../../../scenery-phet/js/keyboard/help/SliderControlsKeyboardHelpSection.js';
import TwoColumnKeyboardHelpContent from '../../../../scenery-phet/js/keyboard/help/TwoColumnKeyboardHelpContent.js';

export default class RutherfordScatteringKeyboardHelpContent extends TwoColumnKeyboardHelpContent {
  public constructor() {
    super(
      [ new SliderControlsKeyboardHelpSection() ],
      [ new BasicActionsKeyboardHelpSection( { withCheckboxContent: true } ) ],
      { isDisposable: false }
    );
  }
}
