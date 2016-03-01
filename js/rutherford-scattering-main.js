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

  // constants

  var simOptions = {
    credits: {
      //TODO fill in proper credits, all of these fields are optional, see joist.AboutDialog
      leadDesign: 'Sam McKagan',
      softwareDevelopment: 'Dave Schmitz, Chris Malley',
      team: 'Wendy Adams, Mike Dubson, Noah Finkelstein, Danielle Harlow, Amy Rouinfar, Ariel Paul, Kathy Perkins, Noah Podolefsky, Carl Weiman',
      qualityAssurance: '',
      graphicArts: 'Amy Hanson',
      thanks: ''
    }
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( rutherfordScatteringTitleString, [
      new RutherfordAtomScreen(),
      new PlumPuddingAtomScreen()
      ], simOptions );
    sim.start();
  } );
} );
