// Copyright 2016-2025, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

/**
 * Legend for all the particles in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import optionize from '../../../../phet-core/js/optionize.js';
import AlignGroup from '../../../../scenery/js/layout/constraints/AlignGroup.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';

const legendString = RutherfordScatteringStrings.legend;

// constants
const LEGEND_ITEM_HORIZONTAL_SPACING = 12.5;

type SelfOptions = {
  itemVerticalSpacing?: number;
};

type ParticleLegendPanelSelfOptions = SelfOptions & PanelOptions;

type ContentSelfOptions = {
  itemVerticalSpacing?: number;
};

type ParticleLegendPanelContentOptions = ContentSelfOptions & VBoxOptions;

export type ParticleLegendPanelOptions = ParticleLegendPanelSelfOptions;

class ParticleLegendPanel extends Panel {

  public constructor( content: Node, options?: ParticleLegendPanelOptions ) {

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

    const internalOptions = optionize<ParticleLegendPanelOptions, SelfOptions, PanelOptions>()( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,
      itemVerticalSpacing: RSConstants.PANEL_CHILD_SPACING
    }, options );

    super( contentVBox, internalOptions );
  }

  /**
   * Create a box containing one row for the legend panel
   */
  protected static createParticleBox( particleNode: Node, titleString: string ): HBox {
    return createParticleRow( particleNode, titleString );
  }

  /**
   * Create content which will be contained in the panel.
   */
  public static createPanelContent( content: Array<Node>, providedOptions?: ParticleLegendPanelContentOptions ): Node {
    return new ParticleLegendPanelContent( content, providedOptions );
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

// TODO: Fix this uglyness https://github.com/phetsims/rutherford-scattering/issues/181
// @public for aligning with other panels in the various screens, legend content should be left aligned
ParticleLegendPanel.LEGEND_CONTENT_ALIGN = 'left';

/**
 * Content for the panel, does not include the title.
 */
class ParticleLegendPanelContent extends VBox {

  public constructor( content: Array<Node>, providedOptions?: ParticleLegendPanelContentOptions ) {

    const options = optionize<ParticleLegendPanelContentOptions, ContentSelfOptions, VBoxOptions>()( {
      xMargin: 5,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,
      itemVerticalSpacing: RSConstants.PANEL_CHILD_SPACING
    }, providedOptions );

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