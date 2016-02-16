// Copyright 2002-2016, University of Colorado Boulder

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
  var GunModel = require( 'RUTHERFORD_SCATTERING/common/model/GunModel' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PlumPuddingAtomModel( options ) {

    options = _.extend( {
    }, options );

    AtomModel.call( this, options );

    this.gun = new GunModel( this );
  }

  rutherfordScattering.register( 'PlumPuddingAtomModel', PlumPuddingAtomModel );

  return inherit( AtomModel, PlumPuddingAtomModel, {

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @param {double} dt
     * @protected
     */
    moveParticle: function ( alphaParticle, dt ) {
      /*
      double speed = alphaParticle.getSpeed();
      double distance = speed * dt;
      double direction = alphaParticle.getOrientation();
      double dx = Math.cos( direction ) * distance;
      double dy = Math.sin( direction ) * distance;
      double x = alphaParticle.getX() + dx;
      double y = alphaParticle.getY() + dy;
      alphaParticle.setPosition( x, y );
      */
      var speed = alphaParticle.speedProperty.get();
      var distance = speed * dt;
      var direction = alphaParticle.orientationProperty.get();
      var dx = Math.cos( direction ) * distance;
      var dy = Math.sin( direction ) * distance;
      var position = alphaParticle.positionProperty.get();
      var x = position.x + dx;
      var y = position.y + dy;
      alphaParticle.positionProperty.value = new Vector2( x, y );
    },

    // @public
    step: function( dt ) {
      //console.log('step: ' + dt);
      this.gun.step( dt );
      this.moveParticles( dt );
    },

    /**
     * Step one frame manually.  Assuming 60 frames per second.
     */
    manualStep: function() {

      console.log('manualStep');
    }

  } );
} );
