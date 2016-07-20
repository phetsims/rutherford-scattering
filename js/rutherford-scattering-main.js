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

  // strings
  var rutherfordScatteringTitleString = require( 'string!RUTHERFORD_SCATTERING/rutherford-scattering.title' );

  var simOptions = {
    credits: {
      leadDesign: 'Amy Hanson, Sam McKagan',
      softwareDevelopment: 'Jesse Greenberg, Chris Malley, Dave Schmitz',
      team: 'Wendy Adams, Mike Dubson, Noah Finkelstein,\nDanielle Harlow, Ariel Paul, Kathy Perkins,\nNoah Podolefsky, Amy Rouinfar, Carl Weiman',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    }
  };

  SimLauncher.launch( function() {
    var screens = [
      new RutherfordAtomScreen(),
      new PlumPuddingAtomScreen()
    ];
    var sim = new Sim( rutherfordScatteringTitleString, screens, simOptions );
    sim.start();
  } );
} );
