// Copyright 2002-2016, University of Colorado Boulder

/**
 * Rutherford screen & model construction
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RutherfordAtomModel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtomModel' );
  var RutherfordAtomScreenView = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordAtomScreenView' );
  var ScreenIcon = require( 'JOIST/ScreenIcon' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RutherfordNucleusNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordNucleusNode' );
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );

  // strings
  var rutherfordAtomString = require( 'string!RUTHERFORD_SCATTERING/rutherfordAtom' );

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
