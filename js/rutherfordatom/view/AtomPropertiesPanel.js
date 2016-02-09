// Copyright 2016, University of Colorado Boulder

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
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Color = require( 'SCENERY/util/Color' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var NumberDisplay = require( 'SCENERY_PHET/NumberDisplay' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Range = require( 'DOT/Range' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );
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
   * @param {Tandem} tandem
   * @constructor
   */
  function AtomPropertiesPanel( model, tandem, options ) {

    options = _.extend( {
      xMargin: 5,
      yMargin: 5,
      align: 'left'
    }, options );

    // strings
    var atomPropertiesText = new Text( atomPropertiesString, { font: options.titleFont, fontWeight: 'bold' } );
    var numProtonsText = new Text( numberOfProtonsString, { font: options.propertyFont, fontWeight: 'bold' } );
    var numNeutronsText = new Text( numberOfNeutronsString, { font: options.propertyFont, fontWeight: 'bold' } );
    var minText = new Text( "min", { font: options.sliderTickfont } );
    var maxText = new Text( "max", { font: options.sliderTickfont } );

    /* Smitty: use default control for this?
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
      scale: 0.7,
      xMargin: 5,
      yMargin: 5,
      arrowHeight: 25,
      arrowWidth: 25,
      touchAreaXDilation: 14,
      touchAreaYDilation: 14
    }
    var protonCountRange = new Range( RSConstants.MIN_PROTON_COUNT, RSConstants.MAX_PROTON_COUNT, RSConstants.DEFAULT_PROTON_COUNT );
    var protonMinusButton = new ArrowButton( 'left', function protonCountPropertyMinus() {
      model.protonCountProperty.value  = Math.max(RSConstants.MIN_PROTON_COUNT, model.protonCountProperty.value - 1);
    }, arrowButtonOptions );
    var protonNumberDisplay = new NumberDisplay( model.protonCountProperty, protonCountRange,'', '{0}', {
      backgroundStroke: 'black' } );
    var protonPlusButton = new ArrowButton( 'right', function protonCountPropertyPlus() {
      model.protonCountProperty.value  = Math.min(RSConstants.MAX_PROTON_COUNT, model.protonCountProperty.value + 1);
    }, arrowButtonOptions);

    var protonContent = new HBox( {
      spacing: 8,
      top: 0,
      right: 0,
      align: 'left',
      children: [ numProtonsText, protonMinusButton, protonNumberDisplay, protonPlusButton ]
    } );

    // proton count slider
    var sliderWidth = options.minWidth*0.83;
    var protonCountSlider = new HSlider( model.protonCountProperty, {
      min: RSConstants.MIN_PROTON_COUNT,
      max: RSConstants.MAX_PROTON_COUNT
    }, {
      trackFill: 'white',
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: new Dimension2( 10, 20 ),
      majorTickLength: 10,
      tickLabelSpacing: 2
    } );
    protonCountSlider.addMajorTick( RSConstants.MIN_PROTON_COUNT, minText );
    protonCountSlider.addMajorTick( RSConstants.MAX_PROTON_COUNT, maxText );

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

  var neutronContent = new HBox( {
      spacing: 8,
      top: 0,
      right: 0,
      align: 'left',
      children: [ numNeutronsText, neutronMinusButton, neutronNumberDisplay, neutronPlusButton ]
    } );

    // neutron count slider
    var neutronCountSlider = new HSlider( model.neutronCountProperty, {
      min: RSConstants.MIN_NEUTRON_COUNT,
      max: RSConstants.MAX_NEUTRON_COUNT
    }, {
      trackFill: 'white',
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: new Dimension2( 10, 20 ),
      majorTickLength: 10,
      tickLabelSpacing: 2
    } );
    neutronCountSlider.addMajorTick( RSConstants.MIN_NEUTRON_COUNT, minText );
    neutronCountSlider.addMajorTick( RSConstants.MAX_NEUTRON_COUNT, maxText );

    var content = new VBox( {
      spacing: 12,
      top: 0,
      right: 0,
      align: 'left',
      children: [ atomPropertiesText, protonContent, protonCountSlider, neutronContent, neutronCountSlider ]
    } );

    Panel.call( this, content, options );
  }

  // Smitty: do I need this?
  rutherfordScattering.register( 'AtomPropertiesPanel', AtomPropertiesPanel );

  return inherit( Panel, AtomPropertiesPanel );

} );
