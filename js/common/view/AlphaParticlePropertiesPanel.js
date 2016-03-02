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


  // strings
  var alphaParticlePropertiesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleProperties' );
  var energyString = require( 'string!RUTHERFORD_SCATTERING/energy' );
  var showTracesString = require( 'string!RUTHERFORD_SCATTERING/showTraces' );
  var minEnergyString = require( 'string!RUTHERFORD_SCATTERING/minEnergy' );
  var maxEnergyString = require( 'string!RUTHERFORD_SCATTERING/maxEnergy' );

  /**
   * Constructor for a Alpha Particle Properties control panel.
   *
   * @param {AtomModel} model - The model controlled by this panel.
   * @param {Property.<boolean>} showTracesProperty - show particle traces on/off
   * @param {Object} [options]
   * @constructor
   */
  function AlphaParticlePropertiesPanel( model, showTracesProperty, options ) {

    options = _.extend( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSConstants.PANEL_COLOR,
      stroke: RSConstants.PANEL_STROKE
    }, options );

    // strings
    var alphaParticlePropertiesText = new Text( alphaParticlePropertiesString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSConstants.PANEL_TITLE_COLOR
    } );
    var energyText = new Text( energyString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSConstants.PANEL_SLIDER_FILL_COLOR
    } );
    var minEnergyText = new Text( minEnergyString, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSConstants.PANEL_SLIDER_FILL_COLOR,
      maxWidth: options.maxWidth / 3
    } );
    var maxEnergyText = new Text( maxEnergyString, {
      font: RSConstants.PANEL_TICK_FONT,
      fill: RSConstants.PANEL_SLIDER_FILL_COLOR,
      maxWidth: options.maxWidth / 3
    } );

    // slider title
    var energyTextStrut = new HStrut( options.minWidth * 0.05 );
    var energyTitleBox = new HBox( { children: [ energyTextStrut, energyText ] } );

    // particle engery slider
    var sliderWidth = options.minWidth * 0.75;
    var particleEnergySlider = new HSlider( model.alphaParticleEnergyProperty, {
      min: RSConstants.MIN_ALPHA_ENERGY,
      max: RSConstants.MAX_ALPHA_ENERGY
    }, {
      trackFill: RSConstants.PANEL_SLIDER_FILL_COLOR,
      trackStroke:RSConstants.PANEL_SSLIDER_FILL_COLOR,
      majorTickStroke: RSConstants.PANEL_SLIDER_FILL_COLOR,
      majorTickLength: 15,
      tickLabelSpacing: 2,
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,
      startDrag: function() { // called when the pointer is pressed
        model.userInteraction = true;
      },
      endDrag: function() { // called when the pointer is released
        model.userInteraction = false;
      }
    } );
    particleEnergySlider.addMajorTick( RSConstants.MIN_ALPHA_ENERGY, minEnergyText );
    particleEnergySlider.addMajorTick( RSConstants.MAX_ALPHA_ENERGY, maxEnergyText );

    // show traces
    var showTraceStrut = new HStrut( options.minWidth * 0.05 );
    var showTraceText = new Text( showTracesString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      fontWeight: 'bold',
      fill: RSConstants.PANEL_SLIDER_FILL_COLOR,
      maxWidth: 200
    } );
    var showTraceCheckBox = new CheckBox( showTraceText, showTracesProperty, {
      checkBoxColor: 'white',
      checkBoxColorBackground: 'black'
       } );
    var showTraceBox = new HBox( { children: [ showTraceStrut, showTraceCheckBox ] } );

    var content = new VBox( {
      spacing: RSConstants.PANEL_CHILD_SPACING,
      top: 0,
      right: 0,
      align: 'left',
      children: [ alphaParticlePropertiesText, energyTitleBox, particleEnergySlider, showTraceBox ]
    } );

    Panel.call( this, content, options );
  }

  rutherfordScattering.register( 'AlphaParticlePropertiesPanel', AlphaParticlePropertiesPanel );

  return inherit( Panel, AlphaParticlePropertiesPanel );

} );
