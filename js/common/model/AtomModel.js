// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  /**
   * @param {Object} options
   * @constructor
   */
  function AtomModel( options ) {

    options = _.extend( {
      alphaParticleEnergy: RSConstants.DEFAULT_ALPHA_ENERGY,
      showAlphaTrace: RSConstants.DEFAULT_SHOW_TRACES,
      play: true // is the sim running or paused
    }, options );

    // @public
    PropertySet.call( this, options, {
      play: 'running'
    } );

  }

  rutherfordScattering.register( 'AtomModel', AtomModel );

  return inherit( PropertySet, AtomModel, {

    // @public
    reset: function() {
      this.alphaParticleEnergyProperty.reset();
      this.showAlphaTraceProperty.reset();
    }
  } );

} );
