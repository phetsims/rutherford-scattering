// Copyright 2016-2022, University of Colorado Boulder

/**
 * Builds the UI scale label w/ arrows & end markers
 * i.e.  |<--------- label ---------->|
 *
 * @author Dave Schmitz (Schmitzware)
 */

import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Node, Path, RichText } from '../../../../scenery/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';

// constants
const ARROW_HEAD_WIDTH = 12;
const ARROW_HEAD_HEIGHT = 12;
const ARROW_TAIL_MARGIN = 5;

class ScaleInfoNode extends Node {

  /**
   * @param {string} label - the label to place in the middle of the arrows
   * @param {number} width - the desired width of the Node
   * @param {Object} [options]
   */
  constructor( label, width, options ) {

    options = merge( {
      font: RSConstants.SCALE_TITLE_FONT
    }, options );

    // scale text
    const labelText = new RichText( label, {
      font: options.font,
      fill: RSColors.panelLabelColorProperty,
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
        fill: RSColors.panelLabelColorProperty
      } );

    // right arrow
    const rightArrowX = labelText.right + arrowWidth;
    const rightArrowNode = new ArrowNode( labelText.right + ARROW_TAIL_MARGIN, labelText.centerY,
      rightArrowX, labelText.centerY, {
        headHeight: ARROW_HEAD_HEIGHT,
        headWidth: ARROW_HEAD_WIDTH,
        tailWidth: 2,
        fill: RSColors.panelLabelColorProperty
      } );

    // end markers
    const leftMarker = new Path( new Shape().moveTo( leftArrowX, labelText.bounds.minY ).lineTo( leftArrowX, labelText.bounds.maxY ), {
      stroke: RSColors.panelLabelColorProperty,
      lineWidth: 1.5
    } );

    const rightMarker = new Path( new Shape().moveTo( rightArrowX, labelText.bounds.minY ).lineTo( rightArrowX, labelText.bounds.maxY ), {
      stroke: RSColors.panelLabelColorProperty,
      lineWidth: 1.5
    } );

    assert && assert( !options.children, 'additional children not supported' );
    options.children = [ labelText, leftArrowNode, rightArrowNode, leftMarker, rightMarker ];

    super( options );
  }
}

rutherfordScattering.register( 'ScaleInfoNode', ScaleInfoNode );

export default ScaleInfoNode;