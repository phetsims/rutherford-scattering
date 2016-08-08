// Copyright 2002-2016, University of Colorado Boulder

/**
 * Control panel to adjust the number of protons and neutrons used in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var HSlider = require( 'SUN/HSlider' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Text = require( 'SCENERY/nodes/Text' );
  var ArrowButton = require( 'SUN/buttons/ArrowButton' );
  var NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RSColors = require( 'RUTHERFORD_SCATTERING/common/RSColors' );

  // strings
  var atomString = require( 'string!RUTHERFORD_SCATTERING/atom' );
  var numberOfProtonsString = require( 'string!RUTHERFORD_SCATTERING/numberOfProtons' );
  var numberOfNeutronsString = require( 'string!RUTHERFORD_SCATTERING/numberOfNeutrons' );

  /**
   * Constructor for a Atom Properties control panel.
   *
   * @param {AtomPropertiesPanelContent} content - Content contained by the panel
   * @param {Object} [options]
   * @constructor
   */
  function AtomPropertiesPanel( content, options ) {

    options = _.extend( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      resize: false,
      fill: RSColors.panelColor,
      stroke: RSColors.panelBorderColor
    }, options );

    Panel.call( this, content, options );

    // ensure that panel is eligible for garbage collection, a panel is created and destroyed every time
    // scene or color scheme changes so it si important that everything is disposed
    // @private
    this.disposePanel = function() {
      content.dispose();
    };
  }

  rutherfordScattering.register( 'AtomPropertiesPanel', AtomPropertiesPanel );

  inherit( Panel, AtomPropertiesPanel, {

    /**
     * Dispose this panel - this panel can be created and destroyed frequently so
     * it is important to dispose of all panel elements.
     *
     * @public
     */
    dispose: function() {
      Panel.prototype.dispose.call( this );
      this.disposePanel();
    }
  }, {

    /**
     * create content for the panel
     *
     * @param  {Property.<boolean>} userInteractionProperty
     * @param  {Property.<number>} protonCountProperty
     * @param  {Property.<number>} neutronCountProperty
     * @param  {Object} options
     * @public
     */
    createPanelContent: function( userInteractionProperty, protonCountProperty, neutronCountProperty, options ) {
      return new AtomPropertiesPanelContent( userInteractionProperty, protonCountProperty, neutronCountProperty, options );
    }
  } );

  /**
   * Create the content for the AtomPropertiesPanel.
   *
   * @param  {Property.<boolean>} userInteractionProperty
   * @param  {Property.<number>} protonCountProperty
   * @param  {Property.<number>} neutronCountProperty
   * @param  {Object} options
   * @constructor
   */
  function AtomPropertiesPanelContent( userInteractionProperty, protonCountProperty, neutronCountProperty, options ) {

    options = _.extend( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      resize: false,
      fill: RSColors.panelColor,
      stroke: RSColors.panelBorderColor
    }, options );

    // @private
    var self = this;

    // @private
    this.userInteractionProperty = userInteractionProperty;
    this.neutronCountProperty = neutronCountProperty;
    this.protonCountProperty = protonCountProperty;

    // strings
    var atomPropertiesText = new Text( atomString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelTitleColor,
      maxWidth: 225
    } );
    var numProtonsText = new Text( numberOfProtonsString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      maxWidth: 210,
      fontWeight: 'bold',
      fill: RSColors.protonsLabelColor
    } );
    var numNeutronsText = new Text( numberOfNeutronsString, {
      font: RSConstants.PANEL_PROPERTY_FONT,
      maxWidth: 210,
      fontWeight: 'bold',
      fill: RSColors.neutronsLabelColor
    } );

    // proton count slider title
    var protonCountStrut = new HStrut( options.minWidth * 0.05 );
    var protonCountTitleBox = new HBox( { children: [ protonCountStrut, numProtonsText ] } );

    // allowable ranges for proton/neutron values
    var protonCountRange = new RangeWithValue( RSConstants.MIN_PROTON_COUNT, RSConstants.MAX_PROTON_COUNT,
      RSConstants.DEFAULT_PROTON_COUNT );
    var neutronCountRange = new RangeWithValue( RSConstants.MIN_NEUTRON_COUNT, RSConstants.MAX_NEUTRON_COUNT,
        RSConstants.DEFAULT_NEUTRON_COUNT );

    // generalized callback for each arrow button - userInteractionProperty
    // should only be set if the new value is in the allowable range
    var arrowButtonStartCallback = function( property, delta, valueRange ) {
      var newValue = property.value + delta;
      if ( valueRange.contains( newValue ) ) {
        self.userInteractionProperty.set( true );
      }
    };

    // specific callbakcs for each of the arrow buttons
    var protonAddedStartCallback = function() {
      arrowButtonStartCallback( protonCountProperty, 1, protonCountRange );
    };
    var protonRemovedStartCallback = function() {
      arrowButtonStartCallback( protonCountProperty, -1, protonCountRange );
    };
    var neutronAddedStartCallback = function() {
      arrowButtonStartCallback( neutronCountProperty, 1, neutronCountRange );
    };
    var neutronRemovedStartCallback = function() {
      arrowButtonStartCallback( neutronCountProperty, -1, neutronCountRange );
    };

    // proton count arrow/number display
    var arrowButtonOptions = {
      scale: 1.0,
      arrowHeight: 18,
      arrowWidth: 18,
      touchAreaXDilation: 9,
      touchAreaYDilation: 9,
      startCallback: function() { // called when the pointer is pressed
        assert && assert( false, 'button needs unique start callback to check range' );
      },
      endCallback: function() { // called when the pointer is released
        self.userInteractionProperty.set( false );
      }
    };

    this.protonMinusButton = new ArrowButton( 'left', function protonCountPropertyMinus() {
      protonCountProperty.set( Math.max( RSConstants.MIN_PROTON_COUNT, protonCountProperty.value - 1 ) );
    }, _.extend( arrowButtonOptions, {
      startCallback: protonRemovedStartCallback
    } ) );
    var protonNumberDisplay = new NumberDisplay( protonCountProperty, protonCountRange, {
      backgroundStroke: 'black'
    } );
    this.protonPlusButton = new ArrowButton( 'right', function protonCountPropertyPlus() {
      protonCountProperty.set( Math.min( RSConstants.MAX_PROTON_COUNT, protonCountProperty.value + 1 ) );
    }, _.extend( arrowButtonOptions, {
      startCallback: protonAddedStartCallback
    } ) );

    var protonCountContent = new HBox( {
      spacing: 8,
      top: 0,
      right: 0,
      children: [ new HStrut( options.minWidth * 0.1 ), this.protonMinusButton, protonNumberDisplay, this.protonPlusButton ]
    } );

    // common slider attributes
    var sliderWidth = options.minWidth * 0.75;
    var sliderOptions = {
      trackFill: RSColors.panelSliderLabelColor,
      trackStroke: RSColors.panelSliderLabelColor,
      majorTickStroke: RSColors.panelSliderLabelColor,
      majorTickLength: 15,
      tickLabelSpacing: 2,
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,
      thumbCenterLineStroke: 'white',
      startDrag: function() { // called when the pointer is pressed
        self.userInteractionProperty.set( true );
      },
      endDrag: function() { // called when the pointer is released
        self.userInteractionProperty.set( false );
      }
    };

    // proton count slider
    var protonCountSlider = new HSlider( protonCountProperty, {
      min: RSConstants.MIN_PROTON_COUNT,
      max: RSConstants.MAX_PROTON_COUNT
    }, _.extend( {}, sliderOptions, {
      thumbFillEnabled: 'rgb(220, 58, 10)',
      thumbFillHighlighted: 'rgb(270, 108, 60)'
    } ) );
    protonCountSlider.addMajorTick( RSConstants.MIN_PROTON_COUNT,
      new Text( RSConstants.MIN_PROTON_COUNT, {
        font: RSConstants.PANEL_TICK_FONT,
        fill: RSColors.panelSliderLabelColor,
        pickable: false
      } ) );
    protonCountSlider.addMajorTick( RSConstants.MAX_PROTON_COUNT,
      new Text( RSConstants.MAX_PROTON_COUNT, {
        font: RSConstants.PANEL_TICK_FONT,
        fill: RSColors.panelSliderLabelColor,
        pickable: false
      } ) );

    // /enable/disable +/- buttons on min/max
    var enabledListener = function( value ) {
      self.protonMinusButton.enabled = !( value === RSConstants.MIN_PROTON_COUNT );
      self.protonPlusButton.enabled = !( value === RSConstants.MAX_PROTON_COUNT );
    };
    protonCountProperty.link( enabledListener );

    // proton count slider title
    var neutronCountStrut = new HStrut( options.minWidth * 0.05 );
    var neutronCountTitleBox = new HBox( { children: [ neutronCountStrut, numNeutronsText ] } );

    // neutron count arrow/number display
    this.neutronMinusButton = new ArrowButton( 'left', function neutronCountPropertyMinus() {
      neutronCountProperty.value = Math.max( RSConstants.MIN_NEUTRON_COUNT, neutronCountProperty.value - 1 );
    }, _.extend( arrowButtonOptions, {
      startCallback: neutronRemovedStartCallback
    } ) );
    var neutronNumberDisplay = new NumberDisplay( neutronCountProperty, neutronCountRange, {
      backgroundStroke: 'black'
    } );
    this.neutronPlusButton = new ArrowButton( 'right', function neutronCountPropertyPlus() {
      neutronCountProperty.value = Math.min( RSConstants.MAX_NEUTRON_COUNT, neutronCountProperty.value + 1 );
    }, _.extend( arrowButtonOptions, {
      startCallback: neutronAddedStartCallback
    } ) );

    // /enable/disable +/- buttons on min/max
    var neutronCountListener = function( value ) {
      self.neutronMinusButton.enabled = !( value === RSConstants.MIN_NEUTRON_COUNT );
      self.neutronPlusButton.enabled = !( value === RSConstants.MAX_NEUTRON_COUNT );
    };
    this.neutronCountProperty.link( neutronCountListener );

    var neutronCountContent = new HBox( {
      spacing: 8,
      top: 0,
      right: 0,
      children: [ new HStrut( options.minWidth * 0.1 ), this.neutronMinusButton, neutronNumberDisplay, this.neutronPlusButton ]
    } );

    // neutron count slider
    var neutronCountSlider = new HSlider( this.neutronCountProperty, {
      min: RSConstants.MIN_NEUTRON_COUNT,
      max: RSConstants.MAX_NEUTRON_COUNT
    }, _.extend( {}, sliderOptions, {
      thumbFillEnabled: 'rgb(130, 130, 130)',
      thumbFillHighlighted: 'rgb(180, 180, 180)'
    } ) );
    neutronCountSlider.addMajorTick( RSConstants.MIN_NEUTRON_COUNT,
      new Text( RSConstants.MIN_NEUTRON_COUNT, {
        font: RSConstants.PANEL_TICK_FONT,
        fill: RSColors.panelSliderLabelColor,
        pickable: false
      } ) );
    neutronCountSlider.addMajorTick( RSConstants.MAX_NEUTRON_COUNT,
      new Text( RSConstants.MAX_NEUTRON_COUNT, {
        font: RSConstants.PANEL_TICK_FONT,
        fill: RSColors.panelSliderLabelColor,
        pickable: false
      } ) );

    // main panel content
    VBox.call( this, {
      spacing: RSConstants.PANEL_CHILD_SPACING,
      top: 0,
      right: 0,
      align: 'left',
      resize: false,
      children: [ atomPropertiesText, protonCountTitleBox, protonCountContent, protonCountSlider, neutronCountTitleBox,
        neutronCountContent, neutronCountSlider ]
    } );

    this.disposeContent = function() {
      // dispose arrow buttons
      this.protonMinusButton.dispose();
      this.protonPlusButton.dispose();
      this.neutronMinusButton.dispose();
      this.neutronPlusButton.dispose();

      // dispose sliders
      protonCountSlider.dispose();
      neutronCountSlider.dispose();

      // dispose number displays
      protonNumberDisplay.dispose();
      neutronNumberDisplay.dispose();

      // unlink properties
      protonCountProperty.unlink( enabledListener );
      this.neutronCountProperty.unlink( neutronCountListener );
    };
  }

  inherit( VBox, AtomPropertiesPanelContent, {

    /**
     * Make eligible for garbage collection
     *
     * @return {type}  description
     */
    dispose: function() {
      this.disposeContent();
    }
  } );

  rutherfordScattering.register( 'AtomPropertiesPanelContent', AtomPropertiesPanelContent );

  return AtomPropertiesPanel;
} );
