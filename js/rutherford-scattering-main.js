// Copyright 2016-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var FocusOverlay = require( 'SCENERY/overlays/FocusOverlay' );
  var MenuOptionsNode = require( 'RUTHERFORD_SCATTERING/common/view/MenuOptionsNode' );
  var PlumPuddingAtomScreen = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/PlumPuddingAtomScreen' );
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  var RutherfordAtomScreen = require( 'RUTHERFORD_SCATTERING/rutherfordatom/RutherfordAtomScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var rutherfordScatteringTitleString = require( 'string!RUTHERFORD_SCATTERING/rutherford-scattering.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Amy Hanson, Sam McKagan',
      softwareDevelopment: 'Jesse Greenberg, Chris Malley, Dave Schmitz',
      team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Danielle Harlow, Ariel Paul, Kathy Perkins, ' +
            'Noah Podolefsky, Amy Rouinfar, Carl Weiman',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Andrea Lin, Ben Roberts, Kathryn Woessner, Bryan Yoelin',
      graphicArts: '',
      thanks: ''
    },

    // Creates content for the Options dialog
    createOptionsDialogContent: () => new MenuOptionsNode()
  };

  // group focus highlights are synced with color profile
  FocusOverlay.setInnerGroupHighlightColor( RSColorProfile.innerGroupHighlightColorProperty );
  FocusOverlay.setOuterGroupHighlightColor( RSColorProfile.outerGroupHighlightColorProperty );

  SimLauncher.launch( function() {
    var screens = [
      new RutherfordAtomScreen(),
      new PlumPuddingAtomScreen()
    ];
    var sim = new Sim( rutherfordScatteringTitleString, screens, simOptions );
    sim.start();
  } );
} );
