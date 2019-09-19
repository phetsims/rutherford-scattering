// Copyright 2016-2019, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const FocusOverlay = require( 'SCENERY/overlays/FocusOverlay' );
  const MenuOptionsNode = require( 'RUTHERFORD_SCATTERING/common/view/MenuOptionsNode' );
  const PlumPuddingAtomScreen = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/PlumPuddingAtomScreen' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const RutherfordAtomScreen = require( 'RUTHERFORD_SCATTERING/rutherfordatom/RutherfordAtomScreen' );
  const Sim = require( 'JOIST/Sim' );
  const SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  const rutherfordScatteringTitleString = require( 'string!RUTHERFORD_SCATTERING/rutherford-scattering.title' );

  const simOptions = {
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
    const screens = [
      new RutherfordAtomScreen(),
      new PlumPuddingAtomScreen()
    ];
    const sim = new Sim( rutherfordScatteringTitleString, screens, simOptions );
    sim.start();
  } );
} );
