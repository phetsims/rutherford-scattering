// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var AtomModel = require( 'RUTHERFORD_SCATTERING/common/model/AtomModel' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  /**
   * @param {Object} options
   * @constructor
   */
  function RutherfordAtomModel( options ) {

    options = _.extend( {
      protonCount:  RSConstants.DEFAULT_PROTON_COUNT,
      neutronCount: RSConstants.DEFAULT_NEUTRON_COUNT
    }, options );

    AtomModel.call( this, options);
  }

  rutherfordScattering.register( 'RutherfordAtomModel', RutherfordAtomModel );

  return inherit( AtomModel, RutherfordAtomModel, {

    // @public
    reset: function() {

      this.protonCountProperty.reset();
      this.neutronCountProperty.reset();

      // base reset
      AtomModel.prototype.reset.call(this);
    },

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle model animation here.
    },

    /**
     * Step one frame manually.  Assuming 60 frames per second.
     */
    manualStep: function() {

      console.log('manualStep');
    }

  } );

} );
