// Copyright 2015, University of Colorado Boulder

/**
 * A generic slider control that can be used to control a numeric property within a given range.
 * This is a cut-down version, inspired by "UNDER_PRESSURE/common/view/ControlSlider"
 * inspiration credit: Anton Ulyanov, Vasily Shakhov (Mlearner)
 * inspiration credit: Siddhartha Chinthapally (Actual Concepts)
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowButton = require( 'SCENERY_PHET/buttons/ArrowButton' );
  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var NumberPicker = require( 'SCENERY_PHET/NumberPicker');
  var NumberProperty = require( 'AXON/NumberProperty' );
  var Range = require( 'DOT/Range' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Text = require('SCENERY/nodes/Text');
  var HSlider = require('SUN/HSlider');

  function ControlSlider( options ) {

    var BUTTON_CHANGE = 1;
    var BUTTON_SCALE = 0.6;

    options = _.extend( {
      title: new Text( "untitled" ),
      property: new NumberProperty( 1 ),
      color: new Color( 100, 200, 100 ),
      withPicker: false,
      range: new Range( 0, 1 ),
      rangeLabels: {}
    }, options );

    var tickTextOptions = {
      fill: 'white',
      font: RSConstants.SLIDER_FONT
    };

    // If there's no labels supplied, convert the range into text
    var trackMaxString = options.rangeLabels.maxLabel !== undefined ? options.rangeLabels.maxLabel : options.range.max;
    var trackMinString = options.rangeLabels.minLabel !== undefined ? options.rangeLabels.minLabel : options.range.min;

    var slider = new HSlider( options.property, options.range, {
      majorTickLength: 10,
      majorTickLineWidth: 2,
      majorTickStroke: 'white',
      thumbFillEnabled: options.color,
      thumbFillHighlighted: options.color.brighterColor(),
      thumbSize: new Dimension2( 14, 24 )
    } );
    slider.addMajorTick( options.range.min, new Text( trackMinString, tickTextOptions ) );
    slider.addMajorTick( options.range.max, new Text( trackMaxString, tickTextOptions ) );

    // Title at the top
    var contentChildren = [ options.title ];

    // Picker with arrows is an optional feature
    if ( options.withPicker ) {
      /*
      var plusButton = new ArrowButton( 'right', function() {
        options.property.set( Math.min( options.range.max, options.property.get() + BUTTON_CHANGE ) );
      }, {
        scale: BUTTON_SCALE
      } );
      */

      var pickerValue = new NumberPicker( options.property, options.property, {
        font: RSConstants.SLIDER_FONT
      } );

      /*
      var minusButton = new ArrowButton( 'left', function() {
        options.property.set( Math.max( options.range.min, options.property.get() - BUTTON_CHANGE ) );
      }, {
        scale: BUTTON_SCALE
      } );


      var arrowPicker = new LayoutBox( {
        align: 'center',
        orientation: 'horizontal',
        spacing: 3,
        children: [ pickerValue ] // minusButton, pickerValue, plusButton ]
      } );
      */

      contentChildren.push( pickerValue );
    }

    // The slider is not optional
    contentChildren.push( slider );

    LayoutBox.call( this, {
      align: 'center',
      spacing: 2,
      resize: false,
      children: contentChildren
    } );
  }

  return inherit( LayoutBox, ControlSlider );
} );