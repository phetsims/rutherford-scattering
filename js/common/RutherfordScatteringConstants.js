// Copyright 2002-2015, University of Colorado Boulder

/**
 * constants for this simulation, Rutherford Scattering
 *
 * @author Jake Selig (PhET)
 */
define( function() {
  'use strict';

  var Dimension2 = require( 'DOT/Dimension2' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );

  // Standardize fonts, and group them together for easy viewing
  var bigFont = new PhetFont( 18 );
  var medFont = new PhetFont( 14 );
  var smlFont = new PhetFont( 12 );

  return {
    "CHECKBOX_OPTIONS": {
      checkBoxColor: 'white',
      checkBoxColorBackground: 'black'
    },
    "ENERGY_RANGE": {
      "min": 1,
      "max": 30,
    },
    "PANEL_OPTIONS": {
      "align": 'left',
      "fill": 'black',
      "spacing":  4,
      "stroke": 'white',
      "lineWidth": 3,
      "minWidth": 180,
      "xMargin": 16,
      "yMargin": 16,
      "resize": false
    },
    "PANEL_CONTENT_OPTIONS": {
      "spacing": 10
    },
    "PANEL_TITLE_TEXT_OPTIONS": {
      "fill": 'gold',
      "font": bigFont
    },
    "PANEL_ENTRY_TEXT_OPTIONS": {
      "fill": 'white',
      "font": medFont
    },
    "PROTON_RANGE": {
      min: 20,
      max: 100
    },
    "NEUTRON_RANGE": {
      min: 20,
      max: 150
    },
    "SLIDER_OPTIONS": {
      trackSize: new Dimension2( 130, 2 ),
      tickLabelSpacing: 0,
      majorTickLength: 12,
      majorTickStroke: 'white',
      majorTickFill: 'white',
      thumbSize: new Dimension2( 14, 22 )
    },
    "SLIDER_TICK_TEXT_OPTIONS": {
      fill: 'white',
      font: smlFont
    }
  };
} );