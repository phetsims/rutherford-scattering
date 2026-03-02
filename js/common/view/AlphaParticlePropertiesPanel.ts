// Copyright 2016-2026, University of Colorado Boulder

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
import optionize from '../../../../phet-core/js/optionize.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Text from '../../../../scenery/js/nodes/Text.js';
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

type SelfOptions = {
  textMaxWidth?: number;
};

type AlphaParticlePropertiesPanelOptions = SelfOptions & PanelOptions;

class AlphaParticlePropertiesPanel extends Panel {

  private disposeAlphaParticlePropertiesPanel: () => void;

  public constructor( alphaParticleEnergyProperty: Property<number>, showTracesProperty: Property<boolean>, providedOptions?: AlphaParticlePropertiesPanelOptions ) {

    // the title for the panel
    const alphaParticlePropertiesText = new Text( alphaParticlePropertiesStringProperty, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelTitleColorProperty,
      maxWidth: RSConstants.PANEL_TITLE_MAX_WIDTH
    } );

    const options = optionize<AlphaParticlePropertiesPanelOptions, SelfOptions, PanelOptions>()( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: RSConstants.PANEL_Y_MARGIN,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      textMaxWidth: RSConstants.TEXT_MAX_WIDTH,
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,
      align: 'left',
      resize: false,

      // pdom
      accessibleHeading: alphaParticleSettingsStringProperty
    }, providedOptions );

    const energyText = new Text( energyStringProperty, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelLabelColorProperty,
      maxWidth: options.textMaxWidth
    } );
    const minEnergyText = new Text( minEnergyStringProperty, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColors.panelSliderLabelColorProperty,
      maxWidth: options.textMaxWidth / 5,
      pickable: false
    } );
    const maxEnergyText = new Text( maxEnergyStringProperty, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColors.panelSliderLabelColorProperty,
      maxWidth: options.textMaxWidth / 5,
      pickable: false
    } );

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

    // show traces
    const showTraceText = new Text( showTracesStringProperty, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelLabelColorProperty,
      maxWidth: RSConstants.TEXT_MAX_WIDTH
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

    const contentVBox = new VBox( {
      children: [ alphaParticlePropertiesText, energyText, particleEnergySlider, showTraceCheckbox ],
      align: 'left',
      spacing: RSConstants.PANEL_CHILD_SPACING
    } );

    super( contentVBox, options );

    // make panel eligible for garbage collection
    this.disposeAlphaParticlePropertiesPanel = () => {
      alphaParticlePropertiesText.dispose();
      energyText.dispose();
      particleEnergySlider.dispose();
      showTraceCheckbox.dispose();
    };
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
export default AlphaParticlePropertiesPanel;