// Copyright 2016, University of Colorado Boulder

/**
 * Query parameters supported by this simulation.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  const RSQueryParameters = QueryStringMachine.getAll( {

    // show shapes around each atom to show the transform of the atomic bounds as a particle enters the bounding box
    showDebugShapes: { type: 'flag' },

    // show a count of the number of times a particle is removed from the atom space in error
    showErrorCount: { type: 'flag' }
  } );

  rutherfordScattering.register( 'RSQueryParameters', RSQueryParameters );

  return RSQueryParameters;
} );
