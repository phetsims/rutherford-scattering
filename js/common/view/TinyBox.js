// Copyright 2002-2016, University of Colorado Boulder

/**
 * Indicates the portion of the target material that is shown in the exploded view.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Dimension2 = require( 'DOT/Dimension2' );

  // constants
  var TINY_BOX_SIZE = new Dimension2( 10, 10 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function TinyBox( options ) {

    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 2
    }, options );

    Rectangle.call( this, 0, 0, TINY_BOX_SIZE.width, TINY_BOX_SIZE.height, options );
  }

  rutherfordScattering.register( 'TinyBox', TinyBox );

  return inherit( Rectangle, TinyBox );
} );
