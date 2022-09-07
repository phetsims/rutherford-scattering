// Copyright 2016-2022, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim. Allows the user to adjust the energy of alpha particles
 * being simulated.  Content is created by AlphaParticlePropertiesPanelContent below since the Content
 * is created and destroyed when the scene or color profile changes.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Range from '../../../../dot/js/Range.js';
import merge from '../../../../phet-core/js/merge.js';
import { HBox, HStrut, Rectangle, Text, VBox, VStrut } from '../../../../scenery/js/imports.js';
import Checkbox from '../../../../sun/js/Checkbox.js';
import HSlider from '../../../../sun/js/HSlider.js';
import Panel from '../../../../sun/js/Panel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';

// constants
const alphaParticlePropertiesString = RutherfordScatteringStrings.alphaParticleProperties;
const energyString = RutherfordScatteringStrings.energy;
const maxEnergyString = RutherfordScatteringStrings.maxEnergy;
const minEnergyString = RutherfordScatteringStrings.minEnergy;
const showTracesString = RutherfordScatteringStrings.showTraces;
const alphaParticleSettingsString = RutherfordScatteringStrings.a11y.alphaParticleSettings;
const energySliderDescriptionString = RutherfordScatteringStrings.a11y.energySliderDescription;
const tracesString = RutherfordScatteringStrings.a11y.traces;
const traceCheckboxDescriptionString = RutherfordScatteringStrings.a11y.traceCheckboxDescription;

// global, tracks fingers on the slider for multitouch support
// must persist beyond individual panel instances so multitouch is supported
// when a panel is created or destroyed
const FINGER_TRACKER = {};

class AlphaParticlePropertiesPanel extends Panel {

  /**
   * @param {AlphaParticlePropertiesPanelContent} content - content for the panel
   * @param {Object} [options]
   */
  constructor( content, options ) {

    // the title for the panel
    const alphaParticlePropertiesText = new Text( alphaParticlePropertiesString, {
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

    options = merge( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'center',
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,

      // pdom
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: alphaParticleSettingsString
    }, options );

    super( contentVBox, options );

    // @private - make panel eligible for garbage collection
    this.disposeAlphaParticlePropertiesPanel = () => {
      content.dispose();
    };
  }

  /**
   * Create the panel content for this panel.
   *
   * @param  {Property.<boolean>} energyInteractionProperty
   * @param  {Property.<boolean>} alphaParticleEnergyProperty
   * @param  {Property.<boolean>} showTracesProperty
   * @param  {Object} [options]
   * @returns {Node}
   * @public
   */
  static createPanelContent( energyInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options ) {
    return new AlphaParticlePropertiesPanelContent( energyInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options );
  }

  /**
   * dispose - this panel is created and destroyed every time the scene and color scheme changes
   * so it is important to fully dispose of all elements.
   * @public
   */
  dispose() {
    this.disposeAlphaParticlePropertiesPanel();
    super.dispose();
  }
}

rutherfordScattering.register( 'AlphaParticlePropertiesPanel', AlphaParticlePropertiesPanel );

class AlphaParticlePropertiesPanelContent extends VBox {
  /**
   * @param  {Property.<boolean>} energyInteractionProperty
   * @param  {Property.<boolean>} alphaParticleEnergyProperty
   * @param  {Property.<boolean>} showTracesProperty
   * @param  {Object} [options]
   */
  constructor( energyInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options ) {

    options = merge( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty
    }, options );

    const energyText = new Text( energyString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelLabelColorProperty,
      maxWidth: 210
    } );
    const minEnergyText = new Text( minEnergyString, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColors.panelSliderLabelColorProperty,
      maxWidth: options.maxWidth / 5,
      pickable: false
    } );
    const maxEnergyText = new Text( maxEnergyString, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColors.panelSliderLabelColorProperty,
      maxWidth: options.maxWidth / 5,
      pickable: false
    } );

    // slider title
    const energyTextStrut = new HStrut( options.minWidth * 0.05 );
    const energyTitleBox = new HBox( { children: [ energyTextStrut, energyText ] } );

    /**
     * Track fingers for multitouch, adding a finger count to the slider and setting the proper
     * interaction properties.
     */
    const addFinger = elementID => {
      energyInteractionProperty.set( true );
      if ( !FINGER_TRACKER[ elementID ] && FINGER_TRACKER[ elementID ] !== 0 ) {
        FINGER_TRACKER[ elementID ] = 1; // first time finger is down on this thumb
      }
      else {
        FINGER_TRACKER[ elementID ]++;
      }
    };

    /**
     * Remove a finger from an element for multitouch support, removing a finger count from a particular element
     * and setting the interaction properties appropriately.
     */
    const removeFinger = elementID => {
      FINGER_TRACKER[ elementID ]--;
      assert && assert( FINGER_TRACKER[ elementID ] >= 0, 'at least 0 fingers must be using the slider' );
      if ( FINGER_TRACKER[ elementID ] === 0 ) {
        energyInteractionProperty.set( false );
      }
    };

    // particle engery slider
    const sliderWidth = options.minWidth * 0.75;
    const particleEnergySlider = new HSlider( alphaParticleEnergyProperty, new Range(
      RSConstants.MIN_ALPHA_ENERGY,
      RSConstants.MAX_ALPHA_ENERGY
    ), {
      trackFill: RSColors.panelSliderLabelColorProperty,
      trackStroke: RSColors.panelSliderLabelColorProperty,
      majorTickStroke: RSColors.panelSliderLabelColorProperty,
      majorTickLength: 15,
      tickLabelSpacing: 2,
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,
      thumbTouchAreaXDilation: 15,
      thumbTouchAreaYDilation: 12,
      startDrag: () => { // called when the pointer is pressed
        addFinger( 'particleEnergySlider' );
      },
      endDrag: () => { // called when the pointer is released
        removeFinger( 'particleEnergySlider' );
      },

      // pdom
      keyboardStep: 5,
      shiftKeyboardStep: 1,
      pageKeyboardStep: 10,
      labelContent: energyString,
      labelTagName: 'label',
      descriptionContent: energySliderDescriptionString,
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
    const showTraceText = new Text( showTracesString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelLabelColorProperty,
      maxWidth: 180
    } );
    const showTraceCheckbox = new Checkbox( showTracesProperty, showTraceText, {
      checkboxColor: RSColors.panelLabelColorProperty,
      checkboxColorBackground: RSColors.panelColorProperty,

      // pdom
      labelContent: tracesString,
      labelTagName: 'label',
      descriptionContent: traceCheckboxDescriptionString,
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

    // @private
    this.energyInteractionProperty = energyInteractionProperty;

    // @private
    this.disposeContent = () => {
      showTraceCheckbox.dispose();
      particleEnergySlider.dispose();
    };
  }

  /**
   * @public
   * @override
   */
  dispose() {
    this.disposeContent();
    super.dispose();
  }
}

rutherfordScattering.register( 'AlphaParticlePropertiesPanelContent', AlphaParticlePropertiesPanelContent );
export default AlphaParticlePropertiesPanel;