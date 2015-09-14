// Copyright 2002-2015, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var RutherfordAtomScreen = require( 'RUTHERFORD_SCATTERING/rutherford-atom/RutherfordAtomScreen' );
  var PlumPuddingAtomScreen = require( 'RUTHERFORD_SCATTERING/plum-pudding-atom/PlumPuddingAtomScreen' );
  var Sim = require( 'JOIST/Sim' );
  var SimLauncher = require( 'JOIST/SimLauncher' );

  // strings
  var simTitle = require( 'string!RUTHERFORD_SCATTERING/rutherford-scattering.title' );

  var screens = [ new RutherfordAtomScreen(), new PlumPuddingAtomScreen() ];

  var simOptions = {
    credits: {
      //TODO fill this in
    }
  };

  SimLauncher.launch( function() {
    var sim = new Sim( simTitle, screens, simOptions );
    sim.start();
  } );
} );
