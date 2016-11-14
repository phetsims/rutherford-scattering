// Copyright 2002-2016, University of Colorado Boulder

/**
 * Global settings for this sim.  Used to track the color profile for projector mode.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var PropertySet = require( 'AXON/PropertySet' );

  var RSGlobals = new PropertySet( {
    projectorMode: ( phet.chipper.queryParameters.colorProfile === 'projector' )
  } );

  rutherfordScattering.register( 'RSGlobals', RSGlobals );

  return RSGlobals;
} );
