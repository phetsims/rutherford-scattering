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
  var AtomModel = require( 'RUTHERFORD_SCATTERING/common/model/AtomModel' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function PlumPuddingAtomModel( tandem, options ) {

    options = _.extend( {
    }, options );

    AtomModel.call( this, tandem, options );

  }

  rutherfordScattering.register( 'PlumPuddingAtomModel', PlumPuddingAtomModel );

  return inherit( PropertySet, PlumPuddingAtomModel, {

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
