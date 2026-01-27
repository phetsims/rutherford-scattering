// Copyright 2016-2025, University of Colorado Boulder

/**
 * Legend for all the particles in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import { TReadOnlyProperty } from '../../../../axon/js/TReadOnlyProperty.js';
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

const legendStringProperty = RutherfordScatteringStrings.legendStringProperty;

// constants
const LEGEND_ITEM_HORIZONTAL_SPACING = 12.5;

type SelfOptions = {
  itemVerticalSpacing?: number;
};

type ContentSelfOptions = {
  minWidth?: number;
  itemVerticalSpacing?: number;
};

export type ParticleLegendPanelContentOptions = ContentSelfOptions & VBoxOptions;

export type ParticleLegendPanelOptions = SelfOptions & PanelOptions;

class ParticleLegendPanel extends Panel {

  // for aligning with other panels in the various screens, legend content should be left aligned
  public static readonly LEGEND_CONTENT_ALIGN: 'left';

  public constructor( content: Node, options?: ParticleLegendPanelOptions ) {

    // the title for the panel
    const legendText = new Text( legendStringProperty, {
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
  protected static createParticleBox( particleNode: Node, titleString: TReadOnlyProperty<string> ): HBox {
    return createParticleRow( particleNode, titleString );
  }

  /**
   * Create content which will be contained in the panel.
   */
  public static createPanel( content: Array<Node>, providedOptions?: ParticleLegendPanelContentOptions ): Node {
    return new ParticleLegendPanelContent( content, providedOptions );
  }
}

/**
 * Build one row in the legend consisting of an image and label
 */
const createParticleRow = ( particleNode: Node, titleString: TReadOnlyProperty<string> ) => {

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
      itemVerticalSpacing: RSConstants.PANEL_CHILD_SPACING
    }, providedOptions );

    // i18n - make align boxes for all items so that they are the same height, important when strings change size
    const alignGroup = new AlignGroup( { matchHorizontal: false } );
    const children: Node[] = [];
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