// Copyright 2016-2017, University of Colorado Boulder

/**
 * Indicates the portion of the target material that is shown in the exploded view.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Shape = require( 'KITE/Shape' );

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
