// Copyright 2016-2020, University of Colorado Boulder

/**
 * Rutherford screen & model construction
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import inherit from '../../../phet-core/js/inherit.js';
import RSColorProfile from '../common/RSColorProfile.js';
import RSConstants from '../common/RSConstants.js';
import rutherfordScatteringStrings from '../rutherford-scattering-strings.js';
import rutherfordScattering from '../rutherfordScattering.js';
import RutherfordAtomModel from './model/RutherfordAtomModel.js';
import RutherfordAtomScreenView from './view/RutherfordAtomScreenView.js';
import RutherfordNucleusNode from './view/RutherfordNucleusNode.js';

const rutherfordAtomString = rutherfordScatteringStrings.rutherfordAtom;

/**
 * @constructor
 */
function RutherfordAtomScreen() {

  // create an icon for the rutherford atom screen with default number of protons and neutrons
  const homeScreenIcon = new ScreenIcon( RutherfordNucleusNode.RutherfordNucleusIcon(
    RSConstants.DEFAULT_PROTON_COUNT, RSConstants.DEFAULT_NEUTRON_COUNT
  ), {
    fill: RSColorProfile.screenIconFillColorProperty
  } );

  const options = {
    name: rutherfordAtomString,
    backgroundColorProperty: RSColorProfile.backgroundColorProperty,
    homeScreenIcon: homeScreenIcon
  };

  Screen.call( this,
    function() { return new RutherfordAtomModel(); },
    function( model ) { return new RutherfordAtomScreenView( model ); },
    options );
}

rutherfordScattering.register( 'RutherfordAtomScreen', RutherfordAtomScreen );

inherit( Screen, RutherfordAtomScreen );
export default RutherfordAtomScreen;