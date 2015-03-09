// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Zoom View'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var RutherfordScatteringConstants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  function ZoomView( scaleString, options ) {

    options = _.extend( {
      spacing: 5
    }, options );

    var viewAreaOptions = {
      stroke: 'white',
      lineWidth: 2,
      fill: 'black',
      rectX: 0,
      rectY: 0,
      rectWidth: 490,
      rectHeight: 490
    };

    var arrowOptions = {
      stroke: null,
      fill: 'white',
      headHeight: 10,
      headWidth: 10 * Math.sqrt(2),
      tailWidth: 2
    };

    var arrowLineOptions = {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 1.25 * arrowOptions.headWidth,
      fill: 'white',
      stroke: 'white',
      lineWidth: viewAreaOptions.lineWidth
    };

    var viewAreaRectangle = new Rectangle( viewAreaOptions );
    var leftLine = new Line( arrowLineOptions );
    var rightLine = new Line( arrowLineOptions );
    var scaleText = new Text( scaleString, {
      fill: 'white',
      font: RutherfordScatteringConstants.BIG_FONT
    } );

    var arrowWidth = (viewAreaRectangle.width - scaleText.width)/2 - 10 - leftLine.width;

    var leftArrowShape = new ArrowNode( 0, 0, -arrowWidth, 0, arrowOptions );
    var leftArrow = new LayoutBox( {
      orientation: 'horizontal',
      align: 'center',
      spacing: 0,
      children: [ leftLine, leftArrowShape ]
    } );

    var rightArrowShape = new ArrowNode( 0, 0, arrowWidth, 0, arrowOptions );
    var rightArrow = new LayoutBox( {
      orientation: 'horizontal',
      align: 'center',
      spacing: 0,
      children: [ rightArrowShape, rightLine ]
    } );

    var scaleLayoutBox = new LayoutBox( {
      orientation: 'horizontal',
      spacing: 10,
      children: [ leftArrow, scaleText, rightArrow ]
    } );

    options.children = [ viewAreaRectangle , scaleLayoutBox ];

    LayoutBox.call( this, options );
  }

  return inherit( LayoutBox, ZoomView );
} );