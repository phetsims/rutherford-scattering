// Copyright 2002-2016, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );
  var RutherfordAtomScreen = require( 'RUTHERFORD_SCATTERING/rutherfordatom/RutherfordAtomScreen' );
  var PlumPuddingAtomScreen = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/PlumPuddingAtomScreen' );
  var MenuOptionsNode = require( 'RUTHERFORD_SCATTERING/common/view/MenuOptionsNode' );
  var RSGlobals = require( 'RUTHERFORD_SCATTERING/common/RSGlobals' );
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );

  // strings
  var rutherfordScatteringTitleString = require( 'string!RUTHERFORD_SCATTERING/rutherford-scattering.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Amy Hanson, Sam McKagan',
      softwareDevelopment: 'Jesse Greenberg, Chris Malley, Dave Schmitz',
      team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Danielle Harlow, Ariel Paul, Kathy Perkins, ' +
            'Noah Podolefsky, Amy Rouinfar, Carl Weiman',
      qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Andrea Lin, Ben Roberts, Bryan Yoelin',
      graphicArts: '',
      thanks: ''
    },
    optionsNode: new MenuOptionsNode()
  };

  // no need to unlink, will exist for life of sim
  RSGlobals.projectorModeProperty.link( function( useProjectorMode ) {
    if ( useProjectorMode ) {
      RSColorProfile.profileNameProperty.set( 'projector' );
    }
    else {
      RSColorProfile.profileNameProperty.set( 'default' );
    }
  } );

  SimLauncher.launch( function() {
    var screens = [
      new RutherfordAtomScreen(),
      new PlumPuddingAtomScreen()
    ];
    var sim = new Sim( rutherfordScatteringTitleString, screens, simOptions );
    sim.start();
  } );
} );
