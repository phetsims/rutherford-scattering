// Copyright 2016-2020, University of Colorado Boulder

/**
 * This object is collection of constants that configure global properties.
 * If you change something here, it will change *everywhere* in this simulation.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Dimension2 from '../../../dot/js/Dimension2.js';
import PhetFont from '../../../scenery-phet/js/PhetFont.js';
import rutherfordScattering from '../rutherfordScattering.js';

// constants
const RSConstants = {

  //----------------------------------------------------------------------------
  // Model
  //----------------------------------------------------------------------------

  // alpha particle
  MIN_ALPHA_ENERGY: 50,
  MAX_ALPHA_ENERGY: 100,
  DEFAULT_ALPHA_ENERGY: 80,

  DEFAULT_SHOW_TRACES: false,

  // protons
  MIN_PROTON_COUNT: 20,
  MAX_PROTON_COUNT: 100,
  DEFAULT_PROTON_COUNT: 79,

  // neutrons
  MIN_NEUTRON_COUNT: 20,
  MAX_NEUTRON_COUNT: 150,
  DEFAULT_NEUTRON_COUNT: 118,

  //----------------------------------------------------------------------------
  // Views
  //----------------------------------------------------------------------------

  // properties of panels
  PANEL_COLOR: 'black',
  PANEL_STROKE: 'gray',
  PANEL_LINE_WIDTH: 1,
  PANEL_TITLE_FONT: new PhetFont( 16 ),
  PANEL_TITLE_COLOR: 'rgb( 200, 200, 95 )',
  PANEL_PROPERTY_FONT: new PhetFont( 14 ),
  PANEL_VALUE_DISPLAY_FONT: new PhetFont( 20 ),
  PANEL_TICK_FONT: new PhetFont( 14 ),
  PANEL_SLIDER_FILL_COLOR: 'rgb( 180, 180, 180 )',
  PANEL_SLIDER_THUMB_DIMENSION: new Dimension2( 15, 30 ),
  PANEL_CHILD_SPACING: 5,    // spacing between child panel components
  PANEL_MIN_WIDTH: 230,
  PANEL_MAX_WIDTH: 275,
  PANEL_SPACE_MARGIN: 35,   // spacing between the particle space and the property panels
  PANEL_TOP_MARGIN: 15,   // spacing for all top panels from edge of window
  PANEL_VERTICAL_MARGIN: 10,   // vertical spacing between property panels
  PANEL_X_MARGIN: 15,

  TARGET_SPACE_MARGIN: 50,   // spacing from gold target material to particle space

  SCALE_TITLE_FONT: new PhetFont( 18 ),

  //----------------------------------------------------------------------------
  // Dimensions
  //----------------------------------------------------------------------------

  // dimension of the beam
  BEAM_SIZE: new Dimension2( 40, 110 ),

  // Animation space size, must be square!
  SPACE_NODE_WIDTH: 510,
  SPACE_NODE_HEIGHT: 510,
  SPACE_BUFFER: 10, // a buffer around the space so that the particles 'slide' into space

  //----------------------------------------------------------------------------
  // Other common colors
  //----------------------------------------------------------------------------
  ATOM_BEAM_FILL: 'rgba(143,143,143,0.4)',
  NUCLEUS_BEAM_FILL: 'rgba(143,143,143,1)'
};

rutherfordScattering.register( 'RSConstants', RSConstants );

export default RSConstants;