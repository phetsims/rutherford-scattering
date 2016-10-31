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

  var RSQueryParameters = QueryStringMachine.getAll( {

    // show shapes around each atom to show the transform of the atomic bounds as a particle enters the bounding box
    showDebugShapes: { type: 'flag' },

    // show a count of the number of times a particle is removed from the atom space in error
    showErrorCount: { type: 'flag' },

    // enable projector mode by default for development and so the sim can be linked directly to projector mode
    projectorMode: { type: 'flag' }
  } );

  rutherfordScattering.register( 'RSQueryParameters', RSQueryParameters );

  return RSQueryParameters;
} );
