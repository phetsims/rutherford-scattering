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
  var Property = require( 'AXON/Property' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Constants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function AtomModel( tandem, options ) {

    options = _.extend( {
      play: true // is the sim running or paused
    }, options );

    // @public
    PropertySet.call( this, options, {
      tandemSet: {
        play: tandem.createTandem( 'running' )
      }
    } );

    // @public
    // properties
    this.alphaParticleEnergyProperty = new Property( Constants.DEFAULT_ALPHA_ENERGY );
    this.showAlphaTraceProperty = new Property( Constants.DEFAULT_SHOW_TRACES );

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
