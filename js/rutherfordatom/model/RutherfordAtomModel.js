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
  var AtomModel = require( 'RUTHERFORD_SCATTERING/common/model/AtomModel' );
  var Constants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function RutherfordAtomModel( tandem, options ) {

    options = _.extend( {
    }, options );

    AtomModel.call( this, tandem, options);

    //
    this.protonCountProperty = new Property( Constants.DEFAULT_PROTON_COUNT );
    this.neutronCountProperty = new Property( Constants.DEFAULT_NEUTRON_COUNT );
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
