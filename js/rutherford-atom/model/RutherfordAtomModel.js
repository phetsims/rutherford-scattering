// Copyright 2015, University of Colorado Boulder

/**
 * Model for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var PropertySet = require( 'AXON/PropertySet' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function RutherfordAtomModel() {
    PropertySet.call( this, {
      //TODO add properties
    } );
  }

  return inherit( PropertySet, RutherfordAtomModel );
} );