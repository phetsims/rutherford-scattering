// Copyright 2016, University of Colorado Boulder

/**
 * Gun is the model of a gun that can fire alpha particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var PropertySet = require( 'AXON/PropertySet' );

  // constants

  /**
   * @constructor
   */
  function GunModel() {

    // @public
    PropertySet.call( this, {
      on: false // {boolean} is the light on?
    } );
  }

  rutherfordScattering.register( 'GunModel', GunModel );

  return inherit( PropertySet, GunModel );
} );
