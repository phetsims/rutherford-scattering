// Copyright 2016, University of Colorado Boulder

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
  var Tandem = require( 'TANDEM/Tandem' );
  var RutherfordAtomScreen = require( 'RUTHERFORD_SCATTERING/rutherfordatom/RutherfordAtomScreen' );
  var PlumPuddingAtomScreen = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/PlumPuddingAtomScreen' );

  // strings
  var rutherfordScatteringTitleString = require( 'string!RUTHERFORD_SCATTERING/rutherford-scattering.title' );

  // constants
  // Smitty: do I need this?
  var tandem = Tandem.createRootTandem();

  var simOptions = {
    credits: {
      //TODO fill in proper credits, all of these fields are optional, see joist.AboutDialog
      leadDesign: '',
      softwareDevelopment: '',
      team: '',
      qualityAssurance: '',
      graphicArts: '',
      thanks: ''
    },
    tandem: tandem
  };

  // Appending '?dev' to the URL will enable developer-only features.
  if ( phet.chipper.getQueryParameter( 'dev' ) ) {
    simOptions = _.extend( {
      // add dev-specific options here
    }, simOptions );
  }

  SimLauncher.launch( function() {
    var sim = new Sim( rutherfordScatteringTitleString, [
      new RutherfordAtomScreen( tandem.createTandem( 'rutherfordAtomScreen' ) ),
      new PlumPuddingAtomScreen( tandem.createTandem( 'plumPuddingAtomScreen' ) )
      ], simOptions );
    sim.start();
  } );
} );
