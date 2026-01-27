// Copyright 2016-2025, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim. Allows the user to adjust the energy of alpha particles
 * being simulated.  Content is created by AlphaParticlePropertiesPanelContent below since the Content
 * is created and destroyed when the scene or color profile changes.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import HBox from '../../../../scenery/js/layout/nodes/HBox.js';
import VBox, { VBoxOptions } from '../../../../scenery/js/layout/nodes/VBox.js';
import HStrut from '../../../../scenery/js/nodes/HStrut.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import VStrut from '../../../../scenery/js/nodes/VStrut.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringFluent from '../../RutherfordScatteringFluent.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';

// constants
const alphaParticlePropertiesStringProperty = RutherfordScatteringFluent.alphaParticlePropertiesStringProperty;
const energyStringProperty = RutherfordScatteringFluent.energyStringProperty;
const maxEnergyStringProperty = RutherfordScatteringFluent.maxEnergyStringProperty;
const minEnergyStringProperty = RutherfordScatteringFluent.minEnergyStringProperty;
const showTracesStringProperty = RutherfordScatteringFluent.showTracesStringProperty;
const alphaParticleSettingsStringProperty = RutherfordScatteringFluent.a11y.alphaParticleSettingsStringProperty;
const energySliderDescriptionStringProperty = RutherfordScatteringFluent.a11y.energySliderDescriptionStringProperty;
const tracesStringProperty = RutherfordScatteringFluent.a11y.tracesStringProperty;
const traceCheckboxDescriptionStringProperty = RutherfordScatteringFluent.a11y.traceCheckboxDescriptionStringProperty;

type SelfOptions = EmptySelfOptions;

type AlphaParticlePropertiesPanelOptions = SelfOptions & PanelOptions;

type ContentSelfOptions = {
  minWidth?: number;
};

type AlphaParticlePropertiesPanelContentOptions = ContentSelfOptions & VBoxOptions;

class AlphaParticlePropertiesPanel extends Panel {

  private disposeAlphaParticlePropertiesPanel: () => void;

  public constructor( content: Node, providedOptions?: AlphaParticlePropertiesPanelOptions ) {

    // the title for the panel
    const alphaParticlePropertiesText = new Text( alphaParticlePropertiesStringProperty, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelTitleColorProperty,
      maxWidth: 215
    } );

    const contentVBox = new VBox( {
      children: [ alphaParticlePropertiesText, content ],
      align: 'left',
      spacing: RSConstants.PANEL_CHILD_SPACING
    } );

    const options = optionize<AlphaParticlePropertiesPanelOptions, SelfOptions, PanelOptions>()( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'center',
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,

      // pdom
      accessibleHeading: alphaParticleSettingsStringProperty
    }, providedOptions );

    super( contentVBox, options );

    // make panel eligible for garbage collection
    this.disposeAlphaParticlePropertiesPanel = () => {
      content.dispose();
    };
  }

  /**
   * Create the panel content for this panel.
   */
  public static createPanelContent( alphaParticleEnergyProperty: Property<number>, showTracesProperty: Property<boolean>, providedOptions?: AlphaParticlePropertiesPanelContentOptions ): Node {
    return new AlphaParticlePropertiesPanelContent( alphaParticleEnergyProperty, showTracesProperty, providedOptions );
  }

  /**
   * dispose - this panel is created and destroyed every time the scene and color scheme changes
   * so it is important to fully dispose of all elements.
   */
  public override dispose(): void {
    this.disposeAlphaParticlePropertiesPanel();
    super.dispose();
  }
}

rutherfordScattering.register( 'AlphaParticlePropertiesPanel', AlphaParticlePropertiesPanel );


class AlphaParticlePropertiesPanelContent extends VBox {

  private disposeContent: () => void;

  public constructor( alphaParticleEnergyProperty: Property<number>, showTracesProperty: Property<boolean>, providedOptions?: AlphaParticlePropertiesPanelContentOptions ) {

    const options = optionize<AlphaParticlePropertiesPanelContentOptions, ContentSelfOptions, VBoxOptions>()( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left'
    }, providedOptions );

    const energyText = new Text( energyStringProperty, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelLabelColorProperty,
      maxWidth: 210
    } );
    const minEnergyText = new Text( minEnergyStringProperty, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColors.panelSliderLabelColorProperty,
      maxWidth: options.maxWidth! / 5,
      pickable: false
    } );
    const maxEnergyText = new Text( maxEnergyStringProperty, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColors.panelSliderLabelColorProperty,
      maxWidth: options.maxWidth! / 5,
      pickable: false
    } );

    // slider title
    const energyTextStrut = new HStrut( options.minWidth * 0.05 );
    const energyTitleBox = new HBox( { children: [ energyTextStrut, energyText ] } );

      // particle engery slider
    const sliderWidth = options.minWidth * 0.75;
    const particleEnergySlider = new HSlider( alphaParticleEnergyProperty, new Range(
      RSConstants.MIN_ALPHA_ENERGY,
      RSConstants.MAX_ALPHA_ENERGY
    ), {
      trackFillEnabled: RSColors.panelSliderLabelColorProperty,
      trackStroke: RSColors.panelSliderLabelColorProperty,
      majorTickStroke: RSColors.panelSliderLabelColorProperty,
      majorTickLength: 15,
      tickLabelSpacing: 2,
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,
      thumbTouchAreaXDilation: 15,
      thumbTouchAreaYDilation: 12,

      // pdom
      keyboardStep: 5,
      shiftKeyboardStep: 1,
      pageKeyboardStep: 10,
      labelContent: energyStringProperty,
      labelTagName: 'label',
      descriptionContent: energySliderDescriptionStringProperty,
      appendDescription: true
    } );
    particleEnergySlider.addMajorTick( RSConstants.MIN_ALPHA_ENERGY, minEnergyText );
    particleEnergySlider.addMajorTick( RSConstants.MAX_ALPHA_ENERGY, maxEnergyText );

    // place the slider in a container rectangle so that the layout does not change when the thumb is at the halfway
    // mark
    const thumbWidth = RSConstants.PANEL_SLIDER_THUMB_DIMENSION.width + 2;
    const rectHeight = 5; // something small so that it doesn't interfere with the layout
    const containerRect = new Rectangle( -thumbWidth / 2, -rectHeight, sliderWidth + thumbWidth, rectHeight );
    containerRect.addChild( particleEnergySlider );

    // show traces
    const showTraceStrut = new HStrut( options.minWidth * 0.05 );
    const showTraceText = new Text( showTracesStringProperty, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelLabelColorProperty,
      maxWidth: 180
    } );
    const showTraceCheckbox = new Checkbox( showTracesProperty, showTraceText, {
      checkboxColor: RSColors.panelLabelColorProperty,
      checkboxColorBackground: RSColors.panelColorProperty,

      // pdom
      labelContent: tracesStringProperty,
      labelTagName: 'label',
      descriptionContent: traceCheckboxDescriptionStringProperty,
      containerTagName: 'div'
    } );
    const showTraceBox = new HBox( { children: [ showTraceStrut, showTraceCheckbox ] } );

    super( {
      spacing: RSConstants.PANEL_CHILD_SPACING,
      top: 0,
      right: 0,
      align: 'left',
      resize: false,
      children: [ energyTitleBox, containerRect, new VStrut( 5 ), showTraceBox ]
    } );

    this.disposeContent = () => {
      showTraceCheckbox.dispose();
      particleEnergySlider.dispose();
    };
  }

  public override dispose(): void {
    this.disposeContent();
    super.dispose();
  }
}

rutherfordScattering.register( 'AlphaParticlePropertiesPanelContent', AlphaParticlePropertiesPanelContent );
export default AlphaParticlePropertiesPanel;