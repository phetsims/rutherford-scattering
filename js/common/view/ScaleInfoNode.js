// Copyright 2002-2016, University of Colorado Boulder

/**
 * Scale label w/ arrows
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var ARROW_HEAD_WIDTH = 12;
  var ARROW_HEAD_HEIGHT = 12;
  var ARROW_TAIL_MARGIN = 5;

  /**
   * @param {string} label
   * @param {number} width - the desired width of the Node
   * @param {Object} [options]
   * @constructor
   */
  function ScaleInfoNode( label, width, options ) {

    options = _.extend( {
      font: new PhetFont( 18 ),
      fill: 'white'
    }, options );

    Node.call( this, options );

    // scale text
    var labelText = new Text( label, {
      font: options.font,
      fill: options.fill,
      centerX: this.centerX,
      centerY: this.centerY,
      maxWidth: 0.9*width
    } );
    this.addChild( labelText );

    // arrows
    var arrowWidth = ( width - labelText.getWidth() ) / 2;
    var leftArrowX = labelText.left - arrowWidth;
    var leftArrowNode = new ArrowNode( labelText.left - ARROW_TAIL_MARGIN, labelText.centerY,
      leftArrowX, labelText.centerY, {
      headHeight: ARROW_HEAD_HEIGHT,
      headWidth: ARROW_HEAD_WIDTH,
      tailWidth: 2,
      fill: 'white'
    } );
    this.addChild( leftArrowNode );

    var rightArrowX = labelText.right + arrowWidth;
    var rightArrowNode = new ArrowNode( labelText.right + ARROW_TAIL_MARGIN, labelText.centerY,
      rightArrowX, labelText.centerY, {
      headHeight: ARROW_HEAD_HEIGHT,
      headWidth: ARROW_HEAD_WIDTH,
      tailWidth: 2,
      fill: 'white'
    } );
    this.addChild( rightArrowNode );

    // end markers
    var leftMarker = new Path( new Shape().moveTo( leftArrowX, labelText.bounds.minY ).lineTo( leftArrowX, labelText.bounds.maxY ), {
        stroke: 'white',
        lineWidth: 1.5
    } );
    this.addChild( leftMarker );

    var rightMarker = new Path( new Shape().moveTo( rightArrowX, labelText.bounds.minY ).lineTo( rightArrowX, labelText.bounds.maxY ), {
        stroke: 'white',
        lineWidth: 1.5
    } );
    this.addChild( rightMarker );
  }

  rutherfordScattering.register( 'ScaleInfoNode', ScaleInfoNode );

  return inherit( Node, ScaleInfoNode, {

  } ); // inherit

} ); //
