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
  var constants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Property = require( 'AXON/Property' );
  var Rectangle = require('SCENERY/nodes/Rectangle');
  var SubSupText = require('SCENERY_PHET/SubSupText');
  var Text = require('SCENERY/nodes/Text');
  var PhetFont = require('SCENERY_PHET/PhetFont');
  var HSlider = require('SUN/HSlider');

  function ControlSlider( options ) {

    options = _.extend( {
      title: new Text( "untitled" ),
      property: new Property( 1 ),
      color: new Color( 100, 200, 100 ),
      withPicker: false,
      range: { min: 0, max: 1 }
    }, options );

    // If there's no labels supplied, convert the range into text
    var trackMaxString = options.range.maxLabel !== undefined ? options.range.maxLabel : options.range.max;
    var trackMinString = options.range.minLabel !== undefined ? options.range.minLabel : options.range.min;

    var BUTTON_CHANGE = 1;
    var BUTTON_SCALE = 0.6;

    var slider = new HSlider( options.property, options.range, _.extend( {
      thumbFillEnabled: options.color,
      thumbFillHighlighted: options.color.brighterColor()
    }, constants.SLIDER_OPTIONS ) );
    slider.addMajorTick( options.range.min, new Text( trackMinString, constants.SLIDER_TICK_TEXT_OPTIONS ) );
    slider.addMajorTick( options.range.max, new Text( trackMaxString, constants.SLIDER_TICK_TEXT_OPTIONS ) );

    var contentChildren;
    if ( options.withPicker ) {
      var plusButton = new ArrowButton( 'right', function() {
        options.property.set( Math.min( options.range.max, options.property.get() + BUTTON_CHANGE ) );
      }, {
        scale: BUTTON_SCALE
      } );

      var minusButton = new ArrowButton( 'left', function() {
        options.property.set( Math.max( options.range.min, options.property.get() - BUTTON_CHANGE ) );
      }, {
        scale: BUTTON_SCALE
      } );

      var arrowPicker = new LayoutBox( {
        align: 'center',
        orientation: 'horizontal',
        spacing: 3,
        children: [ minusButton, plusButton ]
      } );

      contentChildren = [ options.title, arrowPicker, slider ];
    } else {
      contentChildren = [ options.title, slider ];
    }

    LayoutBox.call( this, {
      align: 'center',
      spacing: 2,
      resize: false,
      children: contentChildren
    } );
  }

  return inherit( LayoutBox, ControlSlider );
} );