// Copyright 2016-2019, University of Colorado Boulder

/**
 * Builds the UI scale label w/ arrows & end markers
 * i.e.  |<--------- label ---------->|
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const RichText = require( 'SCENERY/nodes/RichText' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Shape = require( 'KITE/Shape' );

  // constants
  const ARROW_HEAD_WIDTH = 12;
  const ARROW_HEAD_HEIGHT = 12;
  const ARROW_TAIL_MARGIN = 5;

  /**
   * @param {string} label - the label to place in the middle of the arrows
   * @param {number} width - the desired width of the Node
   * @param {Object} [options]
   * @constructor
   */
  function ScaleInfoNode( label, width, options ) {

    options = merge( {
      font: RSConstants.SCALE_TITLE_FONT
    }, options );

    // scale text
    const labelText = new RichText( label, {
      font: options.font,
      fill: RSColorProfile.panelLabelColorProperty,
      maxWidth: 0.9 * width
    } );

    // left arrow
    const arrowWidth = ( width - labelText.getWidth() ) / 2;
    const leftArrowX = labelText.left - arrowWidth;
    const leftArrowNode = new ArrowNode( labelText.left - ARROW_TAIL_MARGIN, labelText.centerY,
      leftArrowX, labelText.centerY, {
        headHeight: ARROW_HEAD_HEIGHT,
        headWidth: ARROW_HEAD_WIDTH,
        tailWidth: 2,
        fill: RSColorProfile.panelLabelColorProperty
      } );

    // right arrow
    const rightArrowX = labelText.right + arrowWidth;
    const rightArrowNode = new ArrowNode( labelText.right + ARROW_TAIL_MARGIN, labelText.centerY,
      rightArrowX, labelText.centerY, {
        headHeight: ARROW_HEAD_HEIGHT,
        headWidth: ARROW_HEAD_WIDTH,
        tailWidth: 2,
        fill: RSColorProfile.panelLabelColorProperty
      } );

    // end markers
    const leftMarker = new Path( new Shape().moveTo( leftArrowX, labelText.bounds.minY ).lineTo( leftArrowX, labelText.bounds.maxY ), {
      stroke: RSColorProfile.panelLabelColorProperty,
      lineWidth: 1.5
    } );

    const rightMarker = new Path( new Shape().moveTo( rightArrowX, labelText.bounds.minY ).lineTo( rightArrowX, labelText.bounds.maxY ), {
      stroke: RSColorProfile.panelLabelColorProperty,
      lineWidth: 1.5
    } );

    assert && assert( !options.children, 'additional children not supported' );
    options.children = [ labelText, leftArrowNode, rightArrowNode, leftMarker, rightMarker ];

    Node.call( this, options );
  }

  rutherfordScattering.register( 'ScaleInfoNode', ScaleInfoNode );

  return inherit( Node, ScaleInfoNode );

} ); // define
