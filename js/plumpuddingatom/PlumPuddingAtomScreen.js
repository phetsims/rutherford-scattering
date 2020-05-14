// Copyright 2016-2020, University of Colorado Boulder

/**
 * Plum pudding screen & model construction
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Screen from '../../../joist/js/Screen.js';
import ScreenIcon from '../../../joist/js/ScreenIcon.js';
import inherit from '../../../phet-core/js/inherit.js';
import Image from '../../../scenery/js/nodes/Image.js';
import screenIcon from '../../images/PlumPuddingAtom-screen-icon_png.js';
import RSColorProfile from '../common/RSColorProfile.js';
import rutherfordScattering from '../rutherfordScattering.js';
import rutherfordScatteringStrings from '../rutherfordScatteringStrings.js';
import PlumPuddingAtomModel from './model/PlumPuddingAtomModel.js';
import PlumPuddingAtomScreenView from './view/PlumPuddingAtomScreenView.js';

const plumPuddingAtomString = rutherfordScatteringStrings.plumPuddingAtom;


/**
 * @constructor
 */
function PlumPuddingAtomScreen() {

  const options = {
    name: plumPuddingAtomString,
    backgroundColorProperty: RSColorProfile.backgroundColorProperty,
    homeScreenIcon: new ScreenIcon( new Image( screenIcon ), {
      maxIconWidthProportion: 1,
      maxIconHeightProportion: 1,
      fill: RSColorProfile.screenIconFillColorProperty
    } )
  };

  Screen.call( this,
    function() { return new PlumPuddingAtomModel(); },
    function( model ) { return new PlumPuddingAtomScreenView( model ); },
    options );
}

rutherfordScattering.register( 'PlumPuddingAtomScreen', PlumPuddingAtomScreen );

inherit( Screen, PlumPuddingAtomScreen );
export default PlumPuddingAtomScreen;