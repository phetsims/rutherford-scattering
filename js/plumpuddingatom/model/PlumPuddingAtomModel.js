// Copyright 2002-2016, University of Colorado Boulder

/**
 * The model which advances the alpha particle in the Plum Pudding sim
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var AtomModel = require( 'RUTHERFORD_SCATTERING/common/model/AtomModel' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PlumPuddingAtomModel( options ) {

    options = _.extend( {
    }, options );

    AtomModel.call( this, options );
  }

  rutherfordScattering.register( 'PlumPuddingAtomModel', PlumPuddingAtomModel );

  return inherit( AtomModel, PlumPuddingAtomModel, {

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @param {double} dt
     * @protected
     */
    moveParticle: function ( alphaParticle, dt ) {
      var speed = alphaParticle.speedProperty.get();
      var distance = speed * dt;
      var direction = alphaParticle.orientationProperty.get();
      var dx = Math.cos( direction ) * distance;
      var dy = Math.sin( direction ) * distance;
      var position = alphaParticle.positionProperty.get();
      var x = position.x + dx;
      var y = position.y + dy;
      alphaParticle.positionProperty.value = new Vector2( x, y );
    }

  } ); // inherit

} ); // define
