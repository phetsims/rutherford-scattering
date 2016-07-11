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

    // show shapes around each atom to show the transform of the atomic bounds as a particle enters the bounding box
    SHOW_DEBUG_SHAPES: !!getQueryParameter( 'showDebugShapes' ),

    // show a count of the number of times a particle is removed from the atom space in error
    SHOW_ERROR_COUNT: !!getQueryParameter( 'showErrorCount' )

  };

  rutherfordScattering.register( 'RSQueryParameters', RSQueryParameters );

  return RSQueryParameters;
} );
