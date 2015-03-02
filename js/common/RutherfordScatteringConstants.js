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
  var Range = require( 'DOT/Range' );

  // Standardize fonts, and group them together for easy viewing
  var BIG_FONT = new PhetFont( 18 );
  var MEDIUM_FONT = new PhetFont( 14 );
  var SMALL_FONT = new PhetFont( 12 );

  return {
    CHECKBOX_OPTIONS: {
      checkBoxColor: 'white',
      checkBoxColorBackground: 'black'
    },
    ENERGY_RANGE: new Range( 1, 30 ),
    PANEL_OPTIONS: {
      align: 'left',
      fill: 'black',
      spacing:  4,
      stroke: 'white',
      lineWidth: 3,
      minWidth: 150,
      xMargin: 10,
      yMargin: 10,
      resize: false
    },
    PANEL_CONTENT_OPTIONS: {
      spacing: 10
    },
    PANEL_TITLE_TEXT_OPTIONS: {
      fill: 'gold',
      font: BIG_FONT
    },
    PANEL_ENTRY_TEXT_OPTIONS: {
      fill: 'white',
      font: MEDIUM_FONT
    },
    PROTON_RANGE: new Range( 20, 100 ),
    NEUTRON_RANGE: new Range( 20, 150 ),
    SLIDER_OPTIONS: {
      trackSize: new Dimension2( 130, 2 ),
      tickLabelSpacing: 0,
      majorTickLength: 12,
      majorTickStroke: 'white',
      majorTickFill: 'white',
      thumbSize: new Dimension2( 14, 22 )
    },
    SLIDER_TICK_TEXT_OPTIONS: {
      fill: 'white',
      font: SMALL_FONT
    }
  };
} );