// Copyright 2016-2022, University of Colorado Boulder

/**
 * Legend for all the particles in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import merge from '../../../../phet-core/js/merge.js';
import { AlignGroup, HBox, HStrut, Text, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';

const legendString = RutherfordScatteringStrings.legend;

// constants
const LEGEND_ITEM_HORIZONTAL_SPACING = 12.5;

class ParticleLegendPanel extends Panel {

  /**
   * @param {Node} content - content to be contained in the panel
   * @param {Object} [options]
   */
  constructor( content, options ) {

    // the title for the panel
    const legendText = new Text( legendString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelTitleColorProperty,
      maxWidth: 225
    } );

    // title with content, aligned
    const contentVBox = new VBox( {
      children: [ legendText, content ],
      align: 'left',
      spacing: RSConstants.PANEL_CHILD_SPACING
    } );

    options = merge( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,
      itemVerticalSpacing: RSConstants.PANEL_CHILD_SPACING
    }, options );

    super( contentVBox, options );
  }

  /**
   * Create a box containing one row for the legend panel
   *
   * @param  {Node} particleNode
   * @param  {string} titleString
   * @returns {HBox}
   * @protected
   */
  static createParticleBox( particleNode, titleString ) {
    return createParticleRow( particleNode, titleString );
  }

  /**
   * Create content which will be contained in the panel.
   * @returns {Node}
   * @public
   */
  static createPanelContent( content, options ) {
    return new ParticleLegendPanelContent( content, options );
  }
}

/**
 * Build one row in the legend consisting of an image and label
 * @param {Node} particleNode
 * @param {string} titleString
 * @returns {HBox}
 * @private
 */
const createParticleRow = ( particleNode, titleString ) => {

  const hStrut1 = new HStrut( LEGEND_ITEM_HORIZONTAL_SPACING - particleNode.width / 2 );
  const titleText = new Text( titleString, {
    font: RSConstants.PANEL_PROPERTY_FONT,
    fill: RSColors.panelLabelColorProperty,
    maxWidth: 175
  } );
  const hStrut2 = new HStrut( LEGEND_ITEM_HORIZONTAL_SPACING - particleNode.width / 2 );

  // container for one row in the legend
  return new HBox( {
    spacing: LEGEND_ITEM_HORIZONTAL_SPACING,
    top: 0,
    right: 0,
    align: 'center',
    children: [ hStrut1, particleNode, hStrut2, titleText ]
  } );
};

// @public for aligning with other panels in the various screens, legend content should be left aligned
ParticleLegendPanel.LEGEND_CONTENT_ALIGN = 'left';

/**
 * Content for the panel, does not include the title.
 */
class ParticleLegendPanelContent extends VBox {

  /**
   *
   * @param {Array.<Node>} content
   * @param {Object} [options]
   */
  constructor( content, options ) {

    options = merge( {
      xMargin: 5,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,
      itemVerticalSpacing: RSConstants.PANEL_CHILD_SPACING
    }, options );

    // i18n - make align boxes for all items so that they are the same height, important when strings change size
    const alignGroup = new AlignGroup( { matchHorizontal: false } );
    const children = [];
    content.forEach( item => {
      children.push( alignGroup.createBox( item ) );
    } );

    super( {
      spacing: options.itemVerticalSpacing,
      top: 0,
      right: 0,
      align: 'left',
      children: children
    } );
  }
}

rutherfordScattering.register( 'ParticleLegendPanel', ParticleLegendPanel );
export default ParticleLegendPanel;