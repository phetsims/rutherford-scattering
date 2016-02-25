// Copyright 2002-2016, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim.  Allows the user to adust the number of protons and neutrons being simulated.
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
  var Text = require( 'SCENERY/nodes/Text' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Range = require( 'DOT/Range' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  // strings
  var atomPropertiesString = require( 'string!RUTHERFORD_SCATTERING/atomProperties' );
  var numberOfProtonsString = require( 'string!RUTHERFORD_SCATTERING/numberOfProtons' );
  var numberOfNeutronsString = require( 'string!RUTHERFORD_SCATTERING/numberOfNeutrons' );

  /**
   * Constructor for a Atom Properties control panel.
   *
   * @param { AtomModel } model - The model controlled by this panel.
   * @constructor
   */
  function AtomPropertiesPanel( model, options ) {

    options = _.extend( {
      xMargin: 15,
      yMargin: 8,
      align: 'left',
      fill: RSConstants.PANEL_COLOR,
      stroke: RSConstants.PANEL_STROKE
    }, options );

    // strings
    var atomPropertiesText = new Text( atomPropertiesString, { font: RSConstants.PANEL_TITLE_FONT, fontWeight: 'bold', fill: RSConstants.PANEL_TITLE_COLOR } );
    var numProtonsText = new Text( numberOfProtonsString, { font: RSConstants.PANEL_PROPERTY_FONT, fontWeight: 'bold', fill: 'rgb( 185, 50, 8 )' } );
    var numNeutronsText = new Text( numberOfNeutronsString, { font: RSConstants.PANEL_PROPERTY_FONT, fontWeight: 'bold', fill: 'rgb( 160, 160, 160 )' } );

    // constants

    /* FIXME: use default control (add new layout) for this?
    var numberControlOptions = {
      titleMaxWidth: 200, // i18n, determined empirically
      titleFont: font,
      valueMaxWidth: 100, // i18n, determined empirically
      valueFont: font,
      decimalPlaces: 0,
      units: "",
      delta: 1,
      minorTickSpacing: 0,
      //thumbFillEnabled: new Color( 0, 180, 0 ),
      majorTicks: [
        { value: RSConstants.MIN_PROTON_COUNT,
          label: new Text( RSConstants.MIN_PROTON_COUNT, { font: font } )
        },
        { value: RSConstants.MAX_PROTON_COUNT,
          label: new Text( RSConstants.MAX_PROTON_COUNT, { font: font } )
        }
      ],
      startCallback: function() {  },
      endCallback: function() {  }
    }
    var protonRange = new Range( RSConstants.MIN_PROTON_COUNT, RSConstants.MAXPROTON_COUNT, RSConstants.DEFAULT_PROTON_COUNT );
    var protonCountSlider = new NumberControl( numberOfProtonsString, model.protonCountProperty, protonRange, numberControlOptions );
    */

    // proton count arrow/number display
    var arrowButtonOptions = {
      scale: 1.0,
      xMargin: 3,
      yMargin: 3,
      arrowHeight: 18,
      arrowWidth: 18,
      touchAreaXDilation: 9,
      touchAreaYDilation: 9,
      startCallback: function() { // called when the pointer is pressed
        model.userInteraction = true;
      },
      endCallback: function() { // called when the pointer is pressed
        model.userInteraction = false;
      }
    };
    var protonCountRange = new Range( RSConstants.MIN_PROTON_COUNT, RSConstants.MAX_PROTON_COUNT, RSConstants.DEFAULT_PROTON_COUNT );
    var protonMinusButton = new ArrowButton( 'left', function protonCountPropertyMinus() {
      model.protonCountProperty.set( Math.max(RSConstants.MIN_PROTON_COUNT, model.protonCountProperty.value - 1) );
    }, arrowButtonOptions );
    var protonNumberDisplay = new NumberDisplay( model.protonCountProperty, protonCountRange, '', '{0}', {
      backgroundStroke: 'black' } );
    var protonPlusButton = new ArrowButton( 'right', function protonCountPropertyPlus() {
      model.protonCountProperty.set( Math.min(RSConstants.MAX_PROTON_COUNT, model.protonCountProperty.value + 1) );
    }, arrowButtonOptions);

    var protonCountContent = new HBox( {
      spacing: 8,
      top: 0,
      right: 0,
      children: [ protonMinusButton, protonNumberDisplay, protonPlusButton ]
    } );

    // proton count slider
    var sliderWidth = options.minWidth*0.75;
    var protonCountSlider = new HSlider( model.protonCountProperty, {
      min: RSConstants.MIN_PROTON_COUNT,
      max: RSConstants.MAX_PROTON_COUNT
    }, {
      trackFill: RSConstants.PANEL_SLIDER_FILL_COLOR,
      trackStroke:RSConstants.PANEL_SSLIDER_FILL_COLOR,
      majorTickStroke: RSConstants.PANEL_SLIDER_FILL_COLOR,
      majorTickLength: 15,
      tickLabelSpacing: 2,
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,
      thumbFillEnabled: 'rgb(220, 58, 10)',
      thumbFillHighlighted: 'rgb(270, 108, 60)',
      thumbCenterLineStroke: 'white',
      startDrag: function() {
        model.userInteraction = true;
      },
      endDrag: function() {
        model.userInteraction = false;
      }
    } );
    protonCountSlider.addMajorTick( RSConstants.MIN_PROTON_COUNT,
      new Text( RSConstants.MIN_PROTON_COUNT, { font: RSConstants.PANEL_TICK_FONT, fill: RSConstants.PANEL_SLIDER_FILL_COLOR } ) );
    protonCountSlider.addMajorTick( RSConstants.MAX_PROTON_COUNT,
      new Text( RSConstants.MAX_PROTON_COUNT, { font: RSConstants.PANEL_TICK_FONT, fill: RSConstants.PANEL_SLIDER_FILL_COLOR } ) );

    // neutron count arrow/number display
    var neutronCountRange = new Range( RSConstants.MIN_NEUTRON_COUNT, RSConstants.MAX_NEUTRON_COUNT, RSConstants.DEFAULT_NEUTRON_COUNT );
    var neutronMinusButton = new ArrowButton( 'left', function neutronCountPropertyMinus() {
      model.neutronCountProperty.value  = Math.max(RSConstants.MIN_NEUTRON_COUNT, model.neutronCountProperty.value - 1);
    }, arrowButtonOptions );
    var neutronNumberDisplay = new NumberDisplay( model.neutronCountProperty, neutronCountRange,'', '{0}', {
      backgroundStroke: 'black' } );
    var neutronPlusButton = new ArrowButton( 'right', function neutronCountPropertyPlus() {
      model.neutronCountProperty.value  = Math.min(RSConstants.MAX_NEUTRON_COUNT, model.neutronCountProperty.value + 1);
    }, arrowButtonOptions);


    var neutronCountContent = new HBox( {
      spacing: 8,
      top: 0,
      right: 0,
      children: [ neutronMinusButton, neutronNumberDisplay, neutronPlusButton ]
    } );

    // neutron count slider
    var neutronCountSlider = new HSlider( model.neutronCountProperty, {
      min: RSConstants.MIN_NEUTRON_COUNT,
      max: RSConstants.MAX_NEUTRON_COUNT
    }, {
      trackFill: RSConstants.PANEL_SLIDER_FILL_COLOR,
      trackStroke: RSConstants.PANEL_SLIDER_FILL_COLOR,
      majorTickStroke: RSConstants.PANEL_SLIDER_FILL_COLOR,
      majorTickLength: 15,
      tickLabelSpacing: 2,
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,
      thumbFillEnabled: 'rgb(130, 130, 130)',
      thumbFillHighlighted: 'rgb(180, 180, 180)',
      thumbCenterLineStroke: 'white',
      startDrag: function() {
        model.userInteraction = true;
      },
      endDrag: function() {
        model.userInteraction = false;
      }
    } );
    neutronCountSlider.addMajorTick( RSConstants.MIN_NEUTRON_COUNT,
      new Text( RSConstants.MIN_NEUTRON_COUNT, { font: RSConstants.PANEL_TICK_FONT, fill: RSConstants.PANEL_SLIDER_FILL_COLOR } ) );
    neutronCountSlider.addMajorTick( RSConstants.MAX_NEUTRON_COUNT,
      new Text( RSConstants.MAX_NEUTRON_COUNT, { font: RSConstants.PANEL_TICK_FONT, fill: RSConstants.PANEL_SLIDER_FILL_COLOR } ) );

    // main panel content
    var content = new VBox( {
      spacing: RSConstants.PANEL_CHILD_SPACING,
      top: 0,
      right: 0,
      align: 'left',
      children: [ atomPropertiesText, numProtonsText, protonCountContent, protonCountSlider, numNeutronsText, neutronCountContent, neutronCountSlider ]
    } );

    Panel.call( this, content, options );
  }

  rutherfordScattering.register( 'AtomPropertiesPanel', AtomPropertiesPanel );

  return inherit( Panel, AtomPropertiesPanel );

} );
