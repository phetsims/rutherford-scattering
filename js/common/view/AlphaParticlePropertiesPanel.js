// Copyright 2002-2016, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim. Allows the user to adjust the energy of alpha particles
 * being simulated.  Content is created by AlphaParticlePropertiesPanelContent below since the Content
 * is created and destroyed when the scene or color profile changes.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HSlider = require( 'SUN/HSlider' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var VStrut = require( 'SCENERY/nodes/VStrut' );

  // strings
  var alphaParticlePropertiesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleProperties' );
  var energyString = require( 'string!RUTHERFORD_SCATTERING/energy' );
  var maxEnergyString = require( 'string!RUTHERFORD_SCATTERING/maxEnergy' );
  var minEnergyString = require( 'string!RUTHERFORD_SCATTERING/minEnergy' );
  var showTracesString = require( 'string!RUTHERFORD_SCATTERING/showTraces' );

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

    options = _.extend( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColorProfile.panelColorProperty,
      stroke: RSColorProfile.panelBorderColorProperty
    }, options );

    Panel.call( this, content, options );

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

    // strings
    var alphaParticlePropertiesText = new Text( alphaParticlePropertiesString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColorProfile.panelTitleColorProperty,
      maxWidth: 215
    } );
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
    var particleEnergySlider = new HSlider( alphaParticleEnergyProperty, {
      min: RSConstants.MIN_ALPHA_ENERGY,
      max: RSConstants.MAX_ALPHA_ENERGY
    }, {
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
      }
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
    var showTraceCheckBox = new CheckBox( showTraceText, showTracesProperty, {
      checkBoxColor: RSColorProfile.panelLabelColorProperty,
      checkBoxColorBackground: RSColorProfile.panelColorProperty
    } );
    var showTraceBox = new HBox( { children: [ showTraceStrut, showTraceCheckBox ] } );

    VBox.call( this, {
      spacing: RSConstants.PANEL_CHILD_SPACING,
      top: 0,
      right: 0,
      align: 'left',
      resize: false,
      children: [ alphaParticlePropertiesText, energyTitleBox, containerRect, new VStrut(5), showTraceBox ]
    } );

    // @private
    this.disposeContent = function() {
      showTraceCheckBox.dispose();
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
