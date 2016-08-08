// Copyright 2002-2016, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim. Allows the user to adjust the energy of alpha particles being simulated.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Text = require( 'SCENERY/nodes/Text' );
  var HSlider = require( 'SUN/HSlider' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RSColors = require( 'RUTHERFORD_SCATTERING/common/RSColors' );

  // strings
  var alphaParticlePropertiesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleProperties' );
  var energyString = require( 'string!RUTHERFORD_SCATTERING/energy' );
  var showTracesString = require( 'string!RUTHERFORD_SCATTERING/showTraces' );
  var minEnergyString = require( 'string!RUTHERFORD_SCATTERING/minEnergy' );
  var maxEnergyString = require( 'string!RUTHERFORD_SCATTERING/maxEnergy' );

  /**
   * Constructor for a Alpha Particle Properties control panel.
   *
   * @param {AlphaParticlePropertiesPanelContent} showTracesProperty - content for the panel
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
      fill: RSColors.panelColor,
      stroke: RSColors.panelBorderColor
    }, options );

    Panel.call( this, content, options );

    // @private - make panel eligible for garbage collection
    this.disposePanel = function() {
      content.dispose();
    };
  }

  rutherfordScattering.register( 'AlphaParticlePropertiesPanel', AlphaParticlePropertiesPanel );

  inherit( Panel, AlphaParticlePropertiesPanel, {

    /**
     * dispose - this panel is created and destroyed every time the scene and color scheme changes
     * so it is important to fully dispose of all elemets.
     *
     * @return {type}  description
     */
    dispose: function() {
      Panel.prototype.dispose.call( this );
      this.disposePanel();
    }
  }, {

    /**
     * Create content for the panel
     *
     * @return {AlphaParticlePropertiesPanelContent}
     */
    createPanelContent: function( userInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options ) {
      return new AlphaParticlePropertiesPanelContent( userInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options );
    }
  } );

  function AlphaParticlePropertiesPanelContent( userInteractionProperty, alphaParticleEnergyProperty, showTracesProperty, options ) {

    options = _.extend( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColors.panelColor,
      stroke: RSColors.panelBorderColor
    }, options );

    // @private
    var self = this;

    // @private
    this.userInteractionProperty = userInteractionProperty;

    // strings
    var alphaParticlePropertiesText = new Text( alphaParticlePropertiesString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelTitleColor,
      maxWidth: 215
    } );
    var energyText = new Text( energyString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelLabelColor,
      maxWidth: 210
    } );
    var minEnergyText = new Text( minEnergyString, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColors.panelSliderLabelColor,
      maxWidth: options.maxWidth / 5,
      pickable: false
    } );
    var maxEnergyText = new Text( maxEnergyString, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSColors.panelSliderLabelColor,
      maxWidth: options.maxWidth / 5,
      pickable: false
    } );

    // slider title
    var energyTextStrut = new HStrut( options.minWidth * 0.05 );
    var energyTitleBox = new HBox( { children: [ energyTextStrut, energyText ] } );

    // particle engery slider
    var sliderWidth = options.minWidth * 0.75;
    var particleEnergySlider = new HSlider( alphaParticleEnergyProperty, {
      min: RSConstants.MIN_ALPHA_ENERGY,
      max: RSConstants.MAX_ALPHA_ENERGY
    }, {
      trackFill: RSColors.panelSliderLabelColor,
      trackStroke: RSColors.panelSliderLabelColor,
      majorTickStroke: RSColors.panelSliderLabelColor,
      majorTickLength: 15,
      tickLabelSpacing: 2,
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,
      startDrag: function() { // called when the pointer is pressed
        self.userInteractionProperty.set( true );
      },
      endDrag: function() { // called when the pointer is released
        self.userInteractionProperty.set( false );
      }
    } );
    particleEnergySlider.addMajorTick( RSConstants.MIN_ALPHA_ENERGY, minEnergyText );
    particleEnergySlider.addMajorTick( RSConstants.MAX_ALPHA_ENERGY, maxEnergyText );

    // show traces
    var showTraceStrut = new HStrut( options.minWidth * 0.05 );
    var showTraceText = new Text( showTracesString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelLabelColor,
      maxWidth: 180
    } );
    var showTraceCheckBox = new CheckBox( showTraceText, showTracesProperty, {
      checkBoxColor: RSColors.panelLabelColor,
      checkBoxColorBackground: RSColors.panelColor
    } );
    var showTraceBox = new HBox( { children: [ showTraceStrut, showTraceCheckBox ] } );

    VBox.call( this, {
      spacing: RSConstants.PANEL_CHILD_SPACING,
      top: 0,
      right: 0,
      align: 'left',
      children: [ alphaParticlePropertiesText, energyTitleBox, particleEnergySlider, showTraceBox ]
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
    }
  } );

  rutherfordScattering.register( 'AlphaParticlePropertiesPanelContent', AlphaParticlePropertiesPanelContent );

  return AlphaParticlePropertiesPanel;

} );
