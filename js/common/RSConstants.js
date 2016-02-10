// Copyright 2016, University of Colorado Boulder

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

  // constants
  var RSConstants = {

    //----------------------------------------------------------------------------
    // Model
    //----------------------------------------------------------------------------

    // alpha particle
    MIN_ALPHA_ENERGY:       6,
    MAX_ALPHA_ENERGY:       12,
    DEFAULT_ALPHA_ENERGY:   10,

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


    //----------------------------------------------------------------------------
    // Dimensions
    //----------------------------------------------------------------------------

    // Animation space size, must be square!
    SPACE_NODE_WIDTH:       700,
    SPACE_NODE_HEIGHT:      700,

  };

  rutherfordScattering.register( 'RSConstants', RSConstants );

  return RSConstants;

} );
