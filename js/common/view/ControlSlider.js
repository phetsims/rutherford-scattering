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
  var constants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Rectangle = require('SCENERY/nodes/Rectangle');
  var Text = require('SCENERY/nodes/Text');
  var SubSupText = require('SCENERY_PHET/SubSupText');
  var PhetFont = require('SCENERY_PHET/PhetFont');
  var HSlider = require('SUN/HSlider');

  function ControlSlider( titleText, trackProperty, trackRange, thumbColor, hasPicker, options ) {

    options = _.extend( {
      align: 'center',
      spacing: 2,
      resize: false
    }, options );

    // If there's no labels supplied, convert the range into text
    var trackMaxString = trackRange.maxLabel ? trackRange.maxLabel : trackRange.max;
    var trackMinString = trackRange.minLabel ? trackRange.minLabel : trackRange.min;

    var BUTTON_CHANGE = 1;
    var BUTTON_SCALE = 0.6;

    var slider = new HSlider( trackProperty, trackRange, _.extend( {
      thumbFillEnabled: thumbColor
    }, constants.SLIDER_OPTIONS ) );
    slider.addMajorTick( trackRange.min, new Text( trackMinString, constants.SLIDER_TICK_TEXT_OPTIONS ) );
    slider.addMajorTick( trackRange.max, new Text( trackMaxString, constants.SLIDER_TICK_TEXT_OPTIONS ) );

    var contentChildren;
    if ( hasPicker ) {
      var plusButton = new ArrowButton( 'right', function() {
        trackProperty.set( Math.min( trackRange.max, trackProperty.get() + BUTTON_CHANGE ) );
      }, {
        scale: BUTTON_SCALE
      } );

      var minusButton = new ArrowButton( 'left', function() {
        trackProperty.set( Math.max( trackRange.min, trackProperty.get() - BUTTON_CHANGE ) );
      }, {
        scale: BUTTON_SCALE
      } );

      var arrowPicker = new LayoutBox( {
        align: 'center',
        orientation: 'horizontal',
        spacing: 3,
        children: [ minusButton, plusButton ]
      } );

      contentChildren = [ titleText, arrowPicker, slider ];
    } else {
      contentChildren = [ titleText, slider ];
    }

    LayoutBox.call( this, _.extend( {
      children: contentChildren
    }, options ) );
  }

  return inherit( LayoutBox, ControlSlider );
} );