// Copyright 2002-2016, University of Colorado Boulder

/**
 * Builds the UI scale label w/ arrows & end markers
 * i.e.  |<--------- label ---------->|
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
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var ARROW_HEAD_WIDTH = 12;
  var ARROW_HEAD_HEIGHT = 12;
  var ARROW_TAIL_MARGIN = 5;

  /**
   * @param {string} label - the label to place in the middle of the arrows
   * @param {number} width - the desired width of the Node
   * @param {Object} [options]
   * @constructor
   */
  function ScaleInfoNode( label, width, options ) {

    options = _.extend( {
      font: RSConstants.SCALE_TITLE_FONT,
      fill: 'white'
    }, options );

    // scale text
    var labelText = new Text( label, {
      font: options.font,
      fill: options.fill,
      maxWidth: 0.9*width
    } );

    // left arrow
    var arrowWidth = ( width - labelText.getWidth() ) / 2;
    var leftArrowX = labelText.left - arrowWidth;
    var leftArrowNode = new ArrowNode( labelText.left - ARROW_TAIL_MARGIN, labelText.centerY,
      leftArrowX, labelText.centerY, {
      headHeight: ARROW_HEAD_HEIGHT,
      headWidth: ARROW_HEAD_WIDTH,
      tailWidth: 2,
      fill: 'white'
    } );

    // right arrow
    var rightArrowX = labelText.right + arrowWidth;
    var rightArrowNode = new ArrowNode( labelText.right + ARROW_TAIL_MARGIN, labelText.centerY,
      rightArrowX, labelText.centerY, {
      headHeight: ARROW_HEAD_HEIGHT,
      headWidth: ARROW_HEAD_WIDTH,
      tailWidth: 2,
      fill: 'white'
    } );

    // end markers
    var leftMarker = new Path( new Shape().moveTo( leftArrowX, labelText.bounds.minY ).lineTo( leftArrowX, labelText.bounds.maxY ), {
        stroke: 'white',
        lineWidth: 1.5
    } );

    var rightMarker = new Path( new Shape().moveTo( rightArrowX, labelText.bounds.minY ).lineTo( rightArrowX, labelText.bounds.maxY ), {
        stroke: 'white',
        lineWidth: 1.5
    } );

    assert && assert( !options.children, 'additional children not supported' );
    options.children = [ labelText, leftArrowNode, rightArrowNode, leftMarker, rightMarker ];

    Node.call( this, options );
  }

  rutherfordScattering.register( 'ScaleInfoNode', ScaleInfoNode );

  return inherit( Node, ScaleInfoNode );

} ); // define
