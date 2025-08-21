// Copyright 2016-2025, University of Colorado Boulder

/**
 * Builds the UI scale label w/ arrows & end markers
 * i.e.  |<--------- label ---------->|
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import RichText from '../../../../scenery/js/nodes/RichText.js';
import { TextOptions } from '../../../../scenery/js/nodes/Text.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';

// constants
const ARROW_HEAD_WIDTH = 12;
const ARROW_HEAD_HEIGHT = 12;
const ARROW_TAIL_MARGIN = 5;

class ScaleInfoNode extends Node {

  public constructor( label: string, width: number, providedOptions?: TextOptions ) {

    const options = combineOptions<TextOptions>( {
      font: RSConstants.SCALE_TITLE_FONT
    }, providedOptions );

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