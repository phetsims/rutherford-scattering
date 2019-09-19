// Copyright 2016-2017, University of Colorado Boulder

/**
 * The material target which which the particle gun is directed towards.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const Dimension2 = require( 'DOT/Dimension2' );
  const inherit = require( 'PHET_CORE/inherit' );
  const LinearGradient = require( 'SCENERY/util/LinearGradient' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Shape = require( 'KITE/Shape' );

  // constants
  var BACK_DEPTH = 30;
  var BACK_OFFSET = 0.10;
  var BOX_SIZE = new Dimension2( 120, 120 );
  var BACK_COLOR = '#8c7e29';
  var FRONT_COLOR = '#d6cb86';

  /**
   * @param {Object} [options]
   * @constructor
   */
  function TargetMaterialNode( options ) {

    options = options || {};

    // top face, in perspective
    var topNode = new Path( new Shape()
      .moveTo( BACK_OFFSET * BOX_SIZE.width, 0 )
      .lineTo( ( 1 - BACK_OFFSET ) * BOX_SIZE.width, 0 )
      .lineTo( BOX_SIZE.width, BACK_DEPTH )
      .lineTo( 0, BACK_DEPTH )
      .close(), {
      fill: new LinearGradient( 0, 0, 0, BACK_DEPTH ).addColorStop( 0, BACK_COLOR ).addColorStop( 1, FRONT_COLOR ),
      stroke: 'black',
      lineWidth: 1
    } );

    assert && assert( !options.children, 'additional children not supported' );
    options.children = [ topNode ];

    Node.call( this, options );
  }

  rutherfordScattering.register( 'TargetMaterialNode', TargetMaterialNode );

  return inherit( Node, TargetMaterialNode );
} );

