// Copyright 2002-2016, University of Colorado Boulder

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
  var Util = require( 'DOT/Util' );

  // var constants
  var DEFAULT_ORIENTATION =  Util.toRadians(90);

  /**
   * @param {Vector2} initialPosition - required by Rutherford Scattering algorithm
   * @param {number} initialSpeed - required by Rutherford Scattering algorithm
   * @param {number} defaultSpeed - required by Rutherford Scattering algorithm
   * @param {Object} [options]
   * @constructor
   */
  function AlphaParticleModel( initialPosition, initialSpeed, defaultSpeed, options ) {

    // @public (read-only)
    this.defaultSpeed = defaultSpeed;

    // FIXME: is this the correct thing to do here - create properties from values?
    options = _.extend( {
      speed: initialSpeed,
      position: initialPosition,
      orientation: DEFAULT_ORIENTATION
    }, options );

    // @public
    PropertySet.call( this, options );
  }

  rutherfordScattering.register( 'AlphaParticleModel', AlphaParticleModel );

  return inherit( PropertySet, AlphaParticleModel, {

  } );

} );
