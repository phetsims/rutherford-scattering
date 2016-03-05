// Copyright 2002-2016, University of Colorado Boulder

/**
 *  Container/layout for the gun, target, dashed path nodes
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var BeamNode = require( 'RUTHERFORD_SCATTERING/common/view/BeamNode' );
  var TargetMaterialNode = require( 'RUTHERFORD_SCATTERING/common/view/TargetMaterialNode' );
  var TinyBox = require( 'RUTHERFORD_SCATTERING/common/view/TinyBox' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {GunModel} gun
   * @param {Object} [options]
   * @constructor
   */
  function GunTargetNode( gun, options ) {

    options = _.extend( {}, options );

    // alpha particle source target
    var targetMaterialNode = new TargetMaterialNode( {
      left: 60,
      bottom: 200
    } );

    // tiny box that indicates what will be zoomed
    var tinyBoxNode = new TinyBox( {
      centerX: targetMaterialNode.centerX,
      centerY: targetMaterialNode.centerY
    } );

    // dashed lines that emerge from the target
    var dashedPath = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( 225, RSConstants.PANEL_TOP_MARGIN )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( 225, RSConstants.PANEL_TOP_MARGIN + RSConstants.SPACE_NODE_HEIGHT ), {
      stroke: 'grey',
      lineDash: [ 5, 5 ]
    } );

    // alpha particle beam
    var beamNode = new BeamNode( gun.onProperty, {
      centerX: tinyBoxNode.centerX,
      top: targetMaterialNode.bottom
    } );

    // alpha particle gun
    var gunNode = new LaserPointerNode( gun.onProperty, {
      rotation: -Math.PI / 2, // pointing up
      centerX: beamNode.centerX,
      top: beamNode.bottom
    } );

    assert && assert( !options.children, 'additional children not supported' );
    options.children = [ gunNode, beamNode, targetMaterialNode, tinyBoxNode, dashedPath ];

    Node.call( this, options );
  }

  rutherfordScattering.register( 'GunTargetNode', GunTargetNode );

  return inherit( Node, GunTargetNode );

} ); // define
