// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var RutherfordScatteringModel = require( 'RUTHERFORD_SCATTERING/rutherford-scattering/model/RutherfordScatteringModel' );
  var RutherfordScatteringScreenView = require( 'RUTHERFORD_SCATTERING/rutherford-scattering/view/RutherfordScatteringScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // strings
  var rutherfordScatteringTitleString = require( 'string!RUTHERFORD_SCATTERING/rutherford-scattering.title' );

  /**
   * @constructor
   */
  function RutherfordScatteringScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;

    Screen.call( this, rutherfordScatteringTitleString, icon,
      function() { return new RutherfordScatteringModel(); },
      function( model ) { return new RutherfordScatteringScreenView( model ); },
      { backgroundColor: 'white' }
    );
  }

  rutherfordScattering.register( 'RutherfordScatteringScreen', RutherfordScatteringScreen );

  return inherit( Screen, RutherfordScatteringScreen );
} );