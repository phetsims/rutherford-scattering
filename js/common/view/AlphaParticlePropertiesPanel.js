// Copyright 2016-2019, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim. Allows the user to adjust the energy of alpha particles
 * being simulated.  Content is created by AlphaParticlePropertiesPanelContent below since the Content
 * is created and destroyed when the scene or color profile changes.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const Checkbox = require( 'SUN/Checkbox' );
  const Dimension2 = require( 'DOT/Dimension2' );
  const HBox = require( 'SCENERY/nodes/HBox' );
  const HSlider = require( 'SUN/HSlider' );
  const HStrut = require( 'SCENERY/nodes/HStrut' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Panel = require( 'SUN/Panel' );
  const Range = require( 'DOT/Range' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RSA11yStrings = require( 'RUTHERFORD_SCATTERING/common/RSA11yStrings' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Text = require( 'SCENERY/nodes/Text' );
  const VBox = require( 'SCENERY/nodes/VBox' );
  const VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  const alphaParticlePropertiesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleProperties' );
  const energyString = require( 'string!RUTHERFORD_SCATTERING/energy' );
  const maxEnergyString = require( 'string!RUTHERFORD_SCATTERING/maxEnergy' );
  const minEnergyString = require( 'string!RUTHERFORD_SCATTERING/minEnergy' );
  const showTracesString = require( 'string!RUTHERFORD_SCATTERING/showTraces' );

  // a11y strings
  var alphaParticleSettingsString = RSA11yStrings.alphaParticleSettings.value;
  var energySliderDescriptionString = RSA11yStrings.energySliderDescription.value;
  var tracesString = RSA11yStrings.traces.value;
  var traceCheckboxDescriptionString = RSA11yStrings.traceCheckboxDescription.value;

  // constants
  // global, tracks fingers on the slider for multitouch support
  // must persist beyond individual panel instances so multitouch is supported
  // when a panel is created or destroyed
  var FINGER_TRACKER = {};

  /**
   * Constructor for a Alpha Particle Properties control panel.
   *
   * @param {AlphaParticlePropertiesPanelContent} content - content for the panel
   * @param {Object} [options]
   * @constructor
   */
  function AlphaParticlePropertiesPanel( content, options ) {

    // the title for the panel
    var alphaParticlePropertiesText = new Text( alphaParticlePropertiesString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColorProfile.panelTitleColorProperty,
      maxWidth: 215
    } );

    var contentVBox = new VBox( {
      children: [ alphaParticlePropertiesText, content ],
      align: 'left',
      spacing: RSConstants.PANEL_CHILD_SPACING
    } );

    options = _.extend( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'center',
      fill: RSColorProfile.panelColorProperty,
      stroke: RSColorProfile.panelBorderColorProperty,

      // a11y
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: alphaParticleSettingsString
    }, options );

    Panel.call( this, contentVBox, options );

    // @private - make panel eligible for garbage collection
    this.disposeAlphaParticlePropertiesPanel = function() {
      content.dispose();
    };
  }

  rutherfordScattering.register( 'AlphaParticlePropertiesPanel', AlphaParticlePropertiesPanel );

  inherit( Panel, AlphaParticlePropertiesPanel, {

    /**
     * dispose - this panel is created and destroyed every time the scene and color scheme changes
     * so it is important to fully dispose of all elemets.
     *
     * @returns {type}  description
     */
    dispose: function() {
      Panel.prototype.dispose.call( this );
      this.disposeAlphaParticlePropertiesPanel();
    }
  }, {

    /**
     * Create the panel content for this panel.
     *
     * @param  {Property.<boolean>} energyInteractionProperty
     * @param  {Property.<boolean>} alphaParticleEnergyProperty
     * @param  {Property.<boolean>} showTracesProperty
     * @param  {Object} [options]
     * @returns {VBox}
     */
    createPanelContent: function( energyInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options ) {
      return new AlphaParticlePropertiesPanelContent( energyInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options );
    }
  } );

  /**
   * Constructo content that will be contained by this panel.
   *
   * @param  {Property.<boolean>} energyInteractionProperty
   * @param  {Property.<boolean>} alphaParticleEnergyProperty
   * @param  {Property.<boolean>} showTracesProperty
   * @param  {Object} [options]
   * @constructor
   */
  function AlphaParticlePropertiesPanelContent( energyInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options ) {

    options = _.extend( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColorProfile.panelColorProperty,
      stroke: RSColorProfile.panelBorderColorProperty
    }, options );

    // @private
    this.energyInteractionProperty = energyInteractionProperty;

    var energyText = new Text( energyString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColorProfile.panelLabelColorProperty,
      maxWidth: 210
    } );
    var minEnergyText = new Text( minEnergyString, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColorProfile.panelSliderLabelColorProperty,
      maxWidth: options.maxWidth / 5,
      pickable: false
    } );
    var maxEnergyText = new Text( maxEnergyString, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColorProfile.panelSliderLabelColorProperty,
      maxWidth: options.maxWidth / 5,
      pickable: false
    } );

    // slider title
    var energyTextStrut = new HStrut( options.minWidth * 0.05 );
    var energyTitleBox = new HBox( { children: [ energyTextStrut, energyText ] } );

    /**
     * Track fingers for multitouch, adding a finger count to the slider and setting the proper
     * interaction properties.
     */
    var addFinger = function( elementID ) {
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
    var removeFinger = function( elementID ) {
      FINGER_TRACKER[ elementID ]--;
      assert && assert( FINGER_TRACKER[ elementID ] >= 0, 'at least 0 fingers must be using the slider' );
      if ( FINGER_TRACKER[ elementID ] === 0 ) {
        energyInteractionProperty.set( false );
      }
    };

    // particle engery slider
    var sliderWidth = options.minWidth * 0.75;
    var particleEnergySlider = new HSlider( alphaParticleEnergyProperty, new Range(
      RSConstants.MIN_ALPHA_ENERGY,
      RSConstants.MAX_ALPHA_ENERGY
    ), {
      trackFill: RSColorProfile.panelSliderLabelColorProperty,
      trackStroke: RSColorProfile.panelSliderLabelColorProperty,
      majorTickStroke: RSColorProfile.panelSliderLabelColorProperty,
      majorTickLength: 15,
      tickLabelSpacing: 2,
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,
      thumbTouchAreaXDilation: 15,
      thumbTouchAreaYDilation: 12,
      startDrag: function() { // called when the pointer is pressed
        addFinger( 'particleEnergySlider' );
      },
      endDrag: function() { // called when the pointer is released
        removeFinger( 'particleEnergySlider' );
      },

      // a11y
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
    var thumbWidth = RSConstants.PANEL_SLIDER_THUMB_DIMENSION.width + 2;
    var rectHeight = 5; // something small so that it doesn't interfere with the layout
    var containerRect = new Rectangle( -thumbWidth / 2, -rectHeight, sliderWidth + thumbWidth, rectHeight );
    containerRect.addChild( particleEnergySlider );

    // show traces
    var showTraceStrut = new HStrut( options.minWidth * 0.05 );
    var showTraceText = new Text( showTracesString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColorProfile.panelLabelColorProperty,
      maxWidth: 180
    } );
    var showTraceCheckbox = new Checkbox( showTraceText, showTracesProperty, {
      checkboxColor: RSColorProfile.panelLabelColorProperty,
      checkboxColorBackground: RSColorProfile.panelColorProperty,

      // a11y
      labelContent: tracesString,
      labelTagName: 'label',
      descriptionContent: traceCheckboxDescriptionString,
      containerTagName: 'div'
    } );
    var showTraceBox = new HBox( { children: [ showTraceStrut, showTraceCheckbox ] } );

    VBox.call( this, {
      spacing: RSConstants.PANEL_CHILD_SPACING,
      top: 0,
      right: 0,
      align: 'left',
      resize: false,
      children: [ energyTitleBox, containerRect, new VStrut( 5 ), showTraceBox ]
    } );

    // @private
    this.disposeContent = function() {
      showTraceCheckbox.dispose();
      particleEnergySlider.dispose();
    };
  }

  inherit( VBox, AlphaParticlePropertiesPanelContent, {

    /**
     * Make content eligible for garbage collection
     */
    dispose: function() {
      this.disposeContent();
      VBox.prototype.dispose.call( this );
    }
  } );

  rutherfordScattering.register( 'AlphaParticlePropertiesPanelContent', AlphaParticlePropertiesPanelContent );

  return AlphaParticlePropertiesPanel;

} );
