// Copyright 2002-2016, University of Colorado Boulder

/**
 * Model for the 'Plum Pudding Atom' screen, responsible for moving alpha particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSBaseModel = require( 'RUTHERFORD_SCATTERING/common/model/RSBaseModel' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function PlumPuddingAtomModel() {
    RSBaseModel.call( this );
  }

  rutherfordScattering.register( 'PlumPuddingAtomModel', PlumPuddingAtomModel );

  return inherit( RSBaseModel, PlumPuddingAtomModel, {

    /**
     * @param {AlphaParticle} alphaParticle
     * @param {number} dt
     * @override
     * @protected
     */
    moveParticle: function( alphaParticle, dt ) {
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
