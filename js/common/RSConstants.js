// Copyright 2002-2015, University of Colorado Boulder

/**
 * constants for this simulation, Rutherford Scattering
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  var Color = require( 'SCENERY/util/Color' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Range = require( 'DOT/Range' );
  var Vector2 = require( 'DOT/Vector2' );

  var constants = {};

  // Dimenstions
  constants.CANVAS_RENDERING_SIZE = new Dimension2( 800, 800 );
  constants.ANIMATION_BOX_SIZE = new Dimension2( 700, 700 );
  constants.TINY_BOX_SIZE = new Dimension2( 10, 10 );
  constants.BOX_OF_HYDROGEN_SIZE = new Dimension2( 70, 18 );
  constants.BOX_OF_HYDROGEN_DEPTH = 10;
  constants.BEAM_SIZE = new Dimension2( 0.75 * constants.BOX_OF_HYDROGEN_SIZE.width, 75 );
  constants.SHOW_BOX_LENGTH = true;

  // Clock
  constants.CLOCK_FRAME_RATE = 25; // fps
  constants.CLOCK_STEP = 1;

  // Fonts
  constants.DEFAULT_FONT = new PhetFont( { weight: 'bold', size: 18 } );
  constants.CONTROL_FONT = new PhetFont( { weight: 'bold', size: 16 } );
  constants.TITLE_FONT = new PhetFont( { weight: 'bold', size: 16 } );
  constants.SLIDER_FONT = new PhetFont( { size: 12 } );

  // Colors
  constants.ANIMATION_BOX_COLOR = new Color( 'black' );
  constants.ANIMATION_BOX_STRIKE_COLOR = new Color( 'white' );
  constants.BEAM_OF_ALPHA_PARTICLES_COLOR = new Color( 160, 160, 160 );
  constants.CANVAS_BACKGROUND = new Color( 'black' );
  constants.CANVAS_LABELS_COLOR = new Color( 'white' );
  constants.COLOR_TRANSPARENT = new Color( 0, 0, 0, 0 );

  // State
  constants.CLOCK_PAUSED = false;
  constants.TRACES_ENABLED = false;
  constants.GUN_ENABLED = false;
  constants.GUN_INTENSITY = 1.0;
  constants.INITIAL_SPEED_RANGE = new Range( 6, 12, 10 );
  constants.NUMBER_OF_PROTONS_RANGE = new Range( 20, 100, 79 );
  constants.NUMBER_OF_NEUTRONS_RANGE = new Range( 20, 150, 118 );
  constants.ELECTRON_ANGULAR_SPEED = 0.75 * ( 180 / Math.PI ); // degrees -> radians

  // Panels
  constants.PANEL_OPTIONS = {
    align: 'left',
    fill: 'black',
    spacing:  3,
    stroke: 'white',
    lineWidth: 2,
    minWidth: 200,
    xMargin: 3,
    yMargin: 3,
    resize: false
  };

  return constants;
} );