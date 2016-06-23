// Copyright 2016, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  var getQueryParameter = phet.chipper.getQueryParameter;

  var RSQueryParameters = {

    SHOW_DEBUG_SHAPES: !!getQueryParameter( 'showDebugShapes' )

  };

  rutherfordScattering.register( 'RSQueryParameters', RSQueryParameters );

  return RSQueryParameters;
} );
