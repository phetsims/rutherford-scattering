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

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function AtomModel( tandem, options ) {

    options = _.extend( {
      minAlphaParticleEnergy: 6,
      maxAlphaParticleEnergy: 12,
      defaultAlphaParticleEnergy: 10,
      play: true // is the sim running or paused
    }, options );

    // @public
    PropertySet.call( this, options, {
      tandemSet: {
        play: tandem.createTandem( 'running' )
      }
    } );

    //
    this.alphaParticleEnergyProperty = new Property( this.defaultAlphaParticleEnergy );

  }

  rutherfordScattering.register( 'AtomModel', AtomModel );

  return inherit( PropertySet, AtomModel, {

    // @public
    reset: function() {
      this.alphaParticleEnergyProperty.reset();
    }
  } );

} );
