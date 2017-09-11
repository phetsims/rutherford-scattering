// Copyright 2002-2016, University of Colorado Boulder

/**
 * Global settings for this sim.  Used to track the color profile for projector mode.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var Property = require( 'AXON/Property' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  var RSGlobals = {
    projectorModeProperty: new Property( phet.chipper.queryParameters.colorProfile === 'projector' )
  };

  rutherfordScattering.register( 'RSGlobals', RSGlobals );

  return RSGlobals;
} );
