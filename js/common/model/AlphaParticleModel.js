// Copyright 2002-2016, University of Colorado Boulder

/**
 * Alpha particle representation - speed, orientation, current/past positions.
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

  /**
   * @param {Object} [options]
   * @constructor
   */
  function AlphaParticleModel( options ) {

    options = _.extend( {
      speed: 0,
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

    // @public (read-only) - the position coordinates used for trace rendering
    this.positions = [ ];

    // @private - save new particle location
    var self = this;
    var positionListener = function( position ) {
        self.positions.push( new Vector2( position.x, position.y ) );
    };
    this.positionProperty.link( positionListener );

    // @private
    this.disposeAlphaParticleModel = function() {
      this.positionProperty.unlink( positionListener );
    };

  } // constructor

  rutherfordScattering.register( 'AlphaParticleModel', AlphaParticleModel );

  return inherit( PropertySet, AlphaParticleModel, {

    // @public
    dispose: function() {
      this.disposeAlphaParticleModel();
    }

  } );  // inherit

} );  // define
