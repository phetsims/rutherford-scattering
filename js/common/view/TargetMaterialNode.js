// Copyright 2002-2016, University of Colorado Boulder

/**
 * The material target which which the particle gun is directed towards.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var LinearGradient = require( 'SCENERY/util/LinearGradient' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );
  var Dimension2 = require( 'DOT/Dimension2' );

  // constants
  var BACK_DEPTH = 30;
  var BACK_OFFSET = 0.10;
  var BOX_SIZE = new Dimension2( 120, 120 );
  var BACK_COLOR = 'rgb( 126, 126, 52 )';
  var FRONT_COLOR = 'rgb( 168, 168, 69 )';

  /**
   * @param {Object} [options]
   * @constructor
   */
  function TargetMaterialNode( options ) {

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
    options.children = [ topNode  ];

    Node.call( this, options );
  }

  rutherfordScattering.register( 'TargetMaterialNode', TargetMaterialNode );

  return inherit( Node, TargetMaterialNode );
} );

