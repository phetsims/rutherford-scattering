// Copyright 2016-2020, University of Colorado Boulder

/**
 * Plum pudding screen & model construction
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import Image from '../../../scenery/js/nodes/Image.js';
import screenIcon from '../../images/PlumPuddingAtom-screen-icon_png.js';
import RSColors from '../common/RSColors.js';
import rutherfordScattering from '../rutherfordScattering.js';
import rutherfordScatteringStrings from '../rutherfordScatteringStrings.js';
import PlumPuddingAtomModel from './model/PlumPuddingAtomModel.js';
import PlumPuddingAtomScreenView from './view/PlumPuddingAtomScreenView.js';

class PlumPuddingAtomScreen extends Screen {
  constructor() {

    const options = {
      name: rutherfordScatteringStrings.plumPuddingAtom,
      backgroundColorProperty: RSColors.backgroundColorProperty,
      homeScreenIcon: new ScreenIcon( new Image( screenIcon ), {
        maxIconWidthProportion: 1,
        maxIconHeightProportion: 1,
        fill: RSColors.screenIconFillColorProperty
      } )
    };

    super(
      () => new PlumPuddingAtomModel(),
      model => new PlumPuddingAtomScreenView( model ),
      options
    );
  }
}

rutherfordScattering.register( 'PlumPuddingAtomScreen', PlumPuddingAtomScreen );
export default PlumPuddingAtomScreen;