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
  var Vector2 = require( 'DOT/Vector2' );

  // used to assign unique id to each object
  var idCounter = 1;

  /**
   * @param {Object} options
   * @constructor
   */
  function AlphaParticleModel( options ) {

    // @pubic (read-only) - unique id
    this.id = idCounter++;

    options = _.extend( {
      speed: 0, // {number} in FIXME: units?
      defaultSpeed: 0,
      position: new Vector2( 0, 0 ),  // {Vector2} initial position
      orientation: Math.PI / 2  // {number} in radians
    }, options );

    // @public
    PropertySet.call( this, {
      speed: options.speed,
      defaultSpeed: options.defaultSpeed,
      position: options.position,
      orientation: options.orientation
    } );

  } // constructor

  rutherfordScattering.register( 'AlphaParticleModel', AlphaParticleModel );

  return inherit( PropertySet, AlphaParticleModel, {

  } );  // inherit

} );  // define
