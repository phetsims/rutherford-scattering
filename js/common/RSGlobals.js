// Copyright 2016, University of Colorado Boulder

/**
 * Global settings for this sim.  Used to track the color profile for projector mode.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSQueryParameters = require( 'RUTHERFORD_SCATTERING/common/RSQueryParameters' );
  var PropertySet = require( 'AXON/PropertySet' );

  var RSGlobals = new PropertySet( {
    projectorMode: RSQueryParameters.PROJECTOR_MODE || false
  } );

  rutherfordScattering.register( 'RSGlobals', RSGlobals );

  return RSGlobals;
} );
