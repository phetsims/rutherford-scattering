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
  var RSColors = require( 'RUTHERFORD_SCATTERING/common/RSColors' );

  // strings
  var rutherfordAtomString = require( 'string!RUTHERFORD_SCATTERING/rutherfordAtom' );

  /**
   * @constructor
   */
  function RutherfordAtomScreen() {

    // create an icon for the rutherford atom screen with default number of protons and neutrons
    var screenIcon = new ScreenIcon( RutherfordNucleusNode.RutherfordNucleusIcon(
      RSConstants.DEFAULT_PROTON_COUNT, RSConstants.DEFAULT_NEUTRON_COUNT
    ), {
      fill: RSColors.backgroundColor
    } );

    Screen.call( this,
      rutherfordAtomString,
      screenIcon,
      function() { return new RutherfordAtomModel(); },
      function( model ) { return new RutherfordAtomScreenView( model ); }, {
        backgroundColor: RSColors.backgroundColor
      } );

    // screen will exist for life of sim, no need to unlink
    var self = this;
    RSColors.link( 'backgroundColor', function( color ) {
      self.backgroundColor = color;
    } );
  }

  rutherfordScattering.register( 'RutherfordAtomScreen', RutherfordAtomScreen );

  return inherit( Screen, RutherfordAtomScreen );
} );
