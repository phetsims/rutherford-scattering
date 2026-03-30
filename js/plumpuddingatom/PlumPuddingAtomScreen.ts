// Copyright 2016-2026, University of Colorado Boulder

/**
 * Plum pudding screen & model construction
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import Tandem from '../../../tandem/js/Tandem.js';
import plumPuddingAtomScreenIcon_png from '../../images/plumPuddingAtomScreenIcon_png.js';
import RSColors from '../common/RSColors.js';
import RutherfordScatteringKeyboardHelpContent from '../common/view/RutherfordScatteringKeyboardHelpContent.js';
import RutherfordScatteringFluent from '../RutherfordScatteringFluent.js';
import PlumPuddingAtomModel from './model/PlumPuddingAtomModel.js';
import PlumPuddingAtomScreenView from './view/PlumPuddingAtomScreenView.js';

class PlumPuddingAtomScreen extends Screen<PlumPuddingAtomModel, PlumPuddingAtomScreenView> {
  public constructor() {

    const options: ScreenOptions = {
      name: RutherfordScatteringFluent.plumPuddingAtomStringProperty,
      backgroundColorProperty: RSColors.backgroundColorProperty,
      homeScreenIcon: new ScreenIcon( new Image( plumPuddingAtomScreenIcon_png ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1,
        fill: RSColors.screenIconFillColorProperty
      } ),
      createKeyboardHelpNode: () => new RutherfordScatteringKeyboardHelpContent(),
      tandem: Tandem.OPT_OUT
    };

    super(
      () => new PlumPuddingAtomModel(),
      model => new PlumPuddingAtomScreenView( model ),
      options
    );
  }
}

export default PlumPuddingAtomScreen;
