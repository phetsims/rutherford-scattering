// Copyright 2002-2016, University of Colorado Boulder

/**
 *
 * @author Dave Schmitz (Schmitzware)
 *
 * This class is a collection of constants that configure global properties.
 * If you change something here, it will change *everywhere* in this simulation.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Jonathan Olson (PhET Interactive Simulations)
 * @author Chandrashekar Bemagoni (Actual Concepts)
 */
define( function( require ) {
  'use strict';

  // modules
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Dimension2 = require( 'DOT/Dimension2' );

  // constants
  var RSConstants = {

    //----------------------------------------------------------------------------
    // Model
    //----------------------------------------------------------------------------

    // alpha particle
    MIN_ALPHA_ENERGY:       50,
    MAX_ALPHA_ENERGY:       100,
    DEFAULT_ALPHA_ENERGY:   80,

    DEFAULT_SHOW_TRACES:    false,

    // protons
    MIN_PROTON_COUNT:       20,
    MAX_PROTON_COUNT:       100,
    DEFAULT_PROTON_COUNT:   79,

    // neutrons
    MIN_NEUTRON_COUNT:      20,
    MAX_NEUTRON_COUNT:      150,
    DEFAULT_NEUTRON_COUNT:  118,

    //----------------------------------------------------------------------------
    // Views
    //----------------------------------------------------------------------------

    // property panels
    PANEL_COLOR: 'black',
    PANEL_STROKE: 'gray',
    PANEL_LINE_WIDTH: 1,
    PANEL_TITLE_FONT:  new PhetFont( 16 ),
    PANEL_TITLE_COLOR: 'rgb( 200, 200, 95 )',
    PANEL_PROPERTY_FONT:  new PhetFont( 14 ),
    PANEL_TICK_FONT:  new PhetFont( 14 ),
    PANEL_SLIDER_FILL_COLOR: 'rgb( 180, 180, 180 )',
    PANEL_SLIDER_THUMB_DIMENSION:new Dimension2( 15, 30 ),
    PANEL_CHILD_SPACING: 5,

    //----------------------------------------------------------------------------
    // Dimensions
    //----------------------------------------------------------------------------

    // Animation space size, must be square!
    SPACE_NODE_WIDTH:       490,
    SPACE_NODE_HEIGHT:      490

  };

  rutherfordScattering.register( 'RSConstants', RSConstants );

  return RSConstants;

} );
