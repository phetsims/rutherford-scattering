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

  // constants

  // alpha particle
  var MIN_ALPHA_ENERGY      =  6;
  var MAX_ALPHA_ENERGY      =  12;
  var DEFAULT_ALPHA_ENERGY  =  10;

  var DEFAULT_SHOW_TRACES   = false;

  // protons
  var MIN_PROTON_COUNT      =  20;
  var MAX_PROTON_COUNT      =  100;
  var DEFAULT_PROTON_COUNT  =  79;

  // neutrons
  var MIN_NEUTRON_COUNT     =  20;
  var MAX_NEUTRON_COUNT     =  150;
  var DEFAULT_NEUTRON_COUNT =  118;

  return {
    MIN_ALPHA_ENERGY: MIN_ALPHA_ENERGY,
    MAX_ALPHA_ENERGY: MAX_ALPHA_ENERGY,
    DEFAULT_ALPHA_ENERGY: DEFAULT_ALPHA_ENERGY,
    DEFAULT_SHOW_TRACES: DEFAULT_SHOW_TRACES,
    MIN_PROTON_COUNT: MIN_PROTON_COUNT,
    MAX_PROTON_COUNT: MAX_PROTON_COUNT,
    DEFAULT_PROTON_COUNT: DEFAULT_PROTON_COUNT,
    MIN_NEUTRON_COUNT: MIN_NEUTRON_COUNT,
    MAX_NEUTRON_COUNT: MAX_NEUTRON_COUNT,
    DEFAULT_NEUTRON_COUNT: DEFAULT_NEUTRON_COUNT
  };

} );
