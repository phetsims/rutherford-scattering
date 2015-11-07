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
  var Property = require( 'AXON/Property' );
  var Range = require( 'DOT/Range' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Text = require( 'SCENERY/nodes/Text' );
  var HSlider = require( 'SUN/HSlider' );

  function ControlSlider( options ) {

    var pickerLayoutBox;

    options = _.extend( {
      title: new Text( 'undefined', { fill: 'white' } ),
      property: new Property( 1 ),
      color: new Color( 100, 200, 100 ),
      withPicker: false,
      range: new Range( 0, 1 ),
      rangeLabels: {}
    }, options );

    var sliderTickTextOptions = {
      fill: 'white',
      font: RSConstants.SLIDER_FONT
    };

    // If there's no labels supplied, convert the range into text
    var trackMaxString = options.rangeLabels.maxLabel || options.range.max;
    var trackMinString = options.rangeLabels.minLabel || options.range.min;

    // Add lines to end of slider. Major ticks just don't look right.
    var slider = new HSlider( options.property, options.range, {
      majorTickLength: 12,
      majorTickLineWidth: 1,
      majorTickStroke: 'white',
      thumbFillEnabled: options.color,
      thumbFillHighlighted: options.color.brighterColor(),
      thumbSize: new Dimension2( 14, 24 ),
      tickLabelSpacing: 2,
      trackSize: new Dimension2( 160, 2 )
    } );

    // Ticks on either side of the scale. Doesn't seem to be an easier way to do this...
    slider.addMajorTick( options.range.min, new Text( trackMinString, sliderTickTextOptions ) );
    slider.addMajorTick( options.range.max, new Text( trackMaxString, sliderTickTextOptions ) );

    // first child is optional
    var contentChildren = [ options.title ];

    // Picker with arrows is an optional feature
    if ( options.withPicker ) {
      pickerLayoutBox = _makePickerBox( options.property, function(){}, function(){} );
      contentChildren.push( pickerLayoutBox );
    }

    // The slider is not optional
    contentChildren.push( slider );

    LayoutBox.call( this, {
      align: 'left',
      spacing: 4,
      resize: false,
      children: contentChildren
    } );

    // These need to be called after the parent is created to overwrite it
    options.title.left = 0;
    if ( options.withPicker ) {
      pickerLayoutBox.centerX = slider.centerX;
    }
  }

  function _makePickerBox( property, downListener, upListener ) {
    var arrowOptions = {
      scale: 0.6
    };

    var pickerLayoutBox = new LayoutBox( {
      orientation: 'horizontal'
    } );



    var arrowLeft = new ArrowButton( 'left', downListener, arrowOptions );
    var arrowRight = new ArrowButton( 'right', upListener, arrowOptions );

    var pickerBox = new Rectangle( 0, 0, arrowLeft.width*1.7, arrowLeft.height, 2, 2, {
      fill: 'white',
      stroke: 'black'
    } );

    var formatPropertyValue = function(v) {
      return Math.floor(v);
    };

    var pickerBoxText = new Text( formatPropertyValue( property.get() ), {
      //center: pickerBox.center,
      centerX: pickerBox.width / 2,
      centerY: pickerBox.height / 2,
      font: RSConstants.SLIDER_FONT
    });

    // Listen for the property to change, then
    property.link( function( propertyValue ) {
      pickerBoxText.text = formatPropertyValue( property.get() );
      //pickerBoxText.center = pickerBox.center;
      pickerBoxText.centerX = pickerBox.width / 2;
      pickerBoxText.centerY = pickerBox.height / 2;
    } );

    pickerBox.addChild( pickerBoxText );
    pickerLayoutBox.addChild( arrowLeft );
    pickerLayoutBox.addChild( pickerBox );
    pickerLayoutBox.addChild( arrowRight );

    return pickerLayoutBox;
  }

  return inherit( LayoutBox, ControlSlider );
} );
