// Copyright 2016-2017, University of Colorado Boulder

/**
 * Rutherford screen & model construction
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  const RutherfordAtomModel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtomModel' );
  const RutherfordAtomScreenView = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordAtomScreenView' );
  const RutherfordNucleusNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordNucleusNode' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Screen = require( 'JOIST/Screen' );
  const ScreenIcon = require( 'JOIST/ScreenIcon' );

  // strings
  const rutherfordAtomString = require( 'string!RUTHERFORD_SCATTERING/rutherfordAtom' );

  /**
   * @constructor
   */
  function RutherfordAtomScreen() {

    // create an icon for the rutherford atom screen with default number of protons and neutrons
    var homeScreenIcon = new ScreenIcon( RutherfordNucleusNode.RutherfordNucleusIcon(
      RSConstants.DEFAULT_PROTON_COUNT, RSConstants.DEFAULT_NEUTRON_COUNT
    ), {
      fill: RSColorProfile.screenIconFillColorProperty
    } );

    var options = {
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

  return inherit( Screen, RutherfordAtomScreen );
} );
