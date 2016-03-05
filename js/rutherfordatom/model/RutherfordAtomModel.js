// Copyright 2002-2016, University of Colorado Boulder

/**
 * Model for the 'Rutherford Atom' screen, responsible for moving alpha particles.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSBaseModel = require( 'RUTHERFORD_SCATTERING/common/model/RSBaseModel' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * @constructor
   */
  function RutherfordAtomModel( ) {
    RSBaseModel.call( this );
    this.addProperty( 'protonCount', RSConstants.DEFAULT_PROTON_COUNT );
    this.addProperty( 'neutronCount', RSConstants.DEFAULT_NEUTRON_COUNT );
  }

  rutherfordScattering.register( 'RutherfordAtomModel', RutherfordAtomModel );

  return inherit( RSBaseModel, RutherfordAtomModel, {

    /**
     * @param {AlphaParticleModel} alphaParticle
     * @param {number} dt
     * @override
     * @protected
     */
    moveParticle: function( alphaParticle, dt ) {

      // algorithm fails for x=0, so use this min value
      var X0_MIN = 0.00001;

      // Divisor for L used in the calculation of D.
      var L_DIVISOR = 8;

      //-------------------------------------------------------------------------------
      // misc constants that we'll need
      //-------------------------------------------------------------------------------

      var L = this.bounds.getWidth();

      var p = this.protonCountProperty.get(); // protons in the atom's nucleus
      var pd = RSConstants.DEFAULT_PROTON_COUNT; // default setting for the sim

      var s = alphaParticle.speedProperty.get();  // particle's current speed
      var s0 = alphaParticle.speedProperty.initialValue; // speed when it left the gun
      var sd = RSConstants.DEFAULT_ALPHA_ENERGY; // default setting for the sim

      //-------------------------------------------------------------------------------
      // (x0,y0) : the alpha particle's initial position, relative to the atom's center.
      //-------------------------------------------------------------------------------

      var initialPosition = alphaParticle.positionProperty.initialValue;

      var x0 = Math.abs( initialPosition.x );
      if ( x0 < X0_MIN ) {
        x0 = X0_MIN; // algorithm fails for x0 < X0_MIN
      }

      var y0 = initialPosition.y;

      //-------------------------------------------------------------------------------
      // (x,y) : the alpha particle's current position, relative to the atom's center
      //-------------------------------------------------------------------------------

      var position = alphaParticle.positionProperty.get();

      var x = position.x;
      var y = position.y;
      var xWasNegative = false;
      if ( x < 0 ) {
        // This algorithm fails for x < 0, so adjust accordingly.
        x *= -1;
        xWasNegative = true;
      }

      //-------------------------------------------------------------------------------
      // calculate D -
      //-------------------------------------------------------------------------------

      // handle potential algorithm failures
      if ( ( pd <= 0 ) || ( s0 === 0 ) ) {
        this.removeParticle( alphaParticle );
        return;
      }

      var D = ( L / L_DIVISOR ) * ( p / pd ) * ( ( sd * sd ) / ( s0 * s0 ) );

      //-------------------------------------------------------------------------------
      // calculate new alpha particle position, in Polar coordinates
      //-------------------------------------------------------------------------------

      // check intermediate values to handle potential algorithm failures
      var i0 = ( x0 * x0 ) + ( y0 * y0 );
      if ( i0 < 0 ) {
        this.removeParticle( alphaParticle );
        return;
      }

      // b, horizontal distance to atom's center at y == negative infinity
      var b1 = Math.sqrt( i0 );

      // check intermediate values to handle potential algorithm failures
      var i1 = ( -2 * D * b1 ) - ( 2 * D * y0 ) + ( x0 * x0 );
      if ( i1 < 0 ) {
        this.removeParticle( alphaParticle );
        return;
      }

      var b = 0.5 * ( x0 + Math.sqrt( i1 ) );

      // convert current position to Polar coordinates, measured counterclockwise from the -y axis

      // check intermediate values to handle potential algorithm failures
      var i2 = ( x * x ) + ( y * y );
      if ( i2 < 0 ) {
        this.removeParticle( alphaParticle );
        return;
      }

      var r = Math.sqrt( i2 );
      var phi = Math.atan2( x, -y );

      // new position (in Polar coordinates) and speed
      var t1 = ( ( b * Math.cos( phi ) ) - ( ( D / 2 ) * Math.sin( phi ) ) );

      // check intermediate values to handle potential algorithm failures
      var i3 = Math.pow( b, 4 ) + ( r * r * t1 * t1 );
      if ( i3 < 0 ) {
        this.removeParticle( alphaParticle );
        return;
      }
      var phiNew = phi + ( ( b * b * s * dt ) / ( r * Math.sqrt( i3 ) ) );

      // check intermediate values to handle potential algorithm failures
      var i4 = ( ( b * Math.sin( phiNew ) ) + ( ( D / 2 ) * ( Math.cos( phiNew ) - 1 ) ) );
      if ( i4 < 0 ) {
        this.removeParticle( alphaParticle );
        return;
      }
      var rNew = Math.abs( ( b * b ) / i4 );

      // handle potential algorithm failures
      if ( rNew === 0 ) {
        this.removeParticle( alphaParticle );
        return;
      }
      var sNew = s0 * Math.sqrt( 1 - ( D / rNew ) );

      //-------------------------------------------------------------------------------
      // convert to Cartesian coordinates
      //-------------------------------------------------------------------------------

      var xNew = rNew * Math.sin( phiNew );
      if ( xWasNegative ) {
        xNew *= -1; // restore the sign
      }

      var yNew = -rNew * Math.cos( phiNew );

      //-------------------------------------------------------------------------------
      // handle potential algorithm failures
      //-------------------------------------------------------------------------------

      if ( !( b > 0 ) || !( sNew > 0 ) ) {
        this.removeParticle( alphaParticle );
        return;
      }

      //-------------------------------------------------------------------------------
      // set the alpha particle's new properties
      //-------------------------------------------------------------------------------

      alphaParticle.positionProperty.value = new Vector2( xNew, yNew );
      alphaParticle.speedProperty.value = sNew;
      alphaParticle.orientationProperty.value = phiNew;
    }

  } ); // inherit

} ); // define
