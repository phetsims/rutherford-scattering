// Copyright 2002-2016, University of Colorado Boulder

/**
 * Indicates the portion of the target material that is shown in the exploded view.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function ( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Dimension2 = require( 'DOT/Dimension2' );

  // constants
  var BACK_DEPTH = 4;
  var BACK_OFFSET = 0.10;
  var BOX_SIZE = new Dimension2( 10, 10 );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function TinyBox( options ) {

    options = _.extend( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 1
    }, options );

    var topNode = new Path( new Shape()
      .moveTo( BACK_OFFSET * BOX_SIZE.width, 0 )
      .lineTo( ( 1 - BACK_OFFSET ) * BOX_SIZE.width, 0 )
      .lineTo( BOX_SIZE.width, BACK_DEPTH )
      .lineTo( 0, BACK_DEPTH )
      .close(), options );

    assert && assert( !options.children, 'additional children not supported' );
    options.children = [ topNode ];

    Node.call( this, options );
  }

  rutherfordScattering.register( 'TinyBox', TinyBox );

  return inherit( Node, TinyBox );
} );
