// Copyright 2016-2020, University of Colorado Boulder

/**
 * Rutherford screen & model construction
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import RSColorProfile from '../common/RSColorProfile.js';
import RSConstants from '../common/RSConstants.js';
import rutherfordScattering from '../rutherfordScattering.js';
import rutherfordScatteringStrings from '../rutherfordScatteringStrings.js';
import RutherfordAtomModel from './model/RutherfordAtomModel.js';
import RutherfordAtomScreenView from './view/RutherfordAtomScreenView.js';
import RutherfordNucleusNode from './view/RutherfordNucleusNode.js';

class RutherfordAtomScreen extends Screen {
  constructor() {

    // create an icon for the rutherford atom screen with default number of protons and neutrons
    const homeScreenIcon = new ScreenIcon( RutherfordNucleusNode.RutherfordNucleusIcon(
      RSConstants.DEFAULT_PROTON_COUNT, RSConstants.DEFAULT_NEUTRON_COUNT
    ), {
      fill: RSColorProfile.screenIconFillColorProperty
    } );

    const options = {
      name: rutherfordScatteringStrings.rutherfordAtom,
      backgroundColorProperty: RSColorProfile.backgroundColorProperty,
      homeScreenIcon: homeScreenIcon
    };

    super(
      () => new RutherfordAtomModel(),
      model =>  new RutherfordAtomScreenView( model ),
      options
    );
  }
}

rutherfordScattering.register( 'RutherfordAtomScreen', RutherfordAtomScreen );
export default RutherfordAtomScreen;