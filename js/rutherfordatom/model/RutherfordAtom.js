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
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Vector2 = require( 'DOT/Vector2' );
  var Atom = require( 'RUTHERFORD_SCATTERING/common/model/Atom' );

  /**
   * @constructor
   */
  function RutherfordAtom( protonCountProperty, position, boundingWidth, options ) {

    options = _.extend( {
      scatterWidth: 3 // width in bounds which will cause a scatter, bounding width by default
    } );
    this.scatterWidth = options.scatterWidth;

    Atom.call( this, position, boundingWidth, options );

    // @private
    this.protonCountProperty = protonCountProperty;

  }

  rutherfordScattering.register( 'RutherfordAtom', RutherfordAtom );

  return inherit( Atom, RutherfordAtom, {

    moveParticles: function( dt ) {
      var self = this;
      this.particles.forEach( function( particle ) {
        self.moveParticle( particle, dt );
      } );
    },

    /**
     * @param {AlphaParticle} alphaParticle
     * @param {number} dt
     * @override
     * @protected
     */
    moveParticle: function( alphaParticle, dt ) {

      // if the horizontal position is off by this much, a collision will occur
      if ( Math.abs( this.position.x - alphaParticle.positionProperty.initialValue.x ) <= this.scatterWidth ) {
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
        var relativeInitialPosition = initialPosition.minus( this.position );

        var x0 = Math.abs( relativeInitialPosition.x );
        if ( x0 < X0_MIN ) {
          x0 = X0_MIN; // algorithm fails for x0 < X0_MIN
        }

        var y0 = relativeInitialPosition.y;

        //-------------------------------------------------------------------------------
        // (x,y) : the alpha particle's current position, relative to the atom's center
        //-------------------------------------------------------------------------------

        var position = alphaParticle.positionProperty.get();
        var relativePosition = position.minus( this.position );

        var x = relativePosition.x;
        var y = relativePosition.y;
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

        // get the change in position relative to the atom's center
        var delta = new Vector2( xNew, yNew ).minus( relativePosition );

        // update the position of the particle in its space coordinates
        alphaParticle.positionProperty.value = position.plus( delta );
        alphaParticle.speedProperty.value = sNew;
        alphaParticle.orientationProperty.value = phiNew;
      }
      else {
        // move straight through the space
        var speed = alphaParticle.speedProperty.get();
        var distance = speed * dt;
        var direction = alphaParticle.orientationProperty.get();
        var dx = Math.cos( direction ) * distance;
        var dy = Math.sin( direction ) * distance;
        var particlePosition = alphaParticle.positionProperty.get();
        var particleX = particlePosition.x + dx;
        var particleY = particlePosition.y + dy;
        alphaParticle.positionProperty.value = new Vector2( particleX, particleY );
      }
    }

  } ); // inherit

} ); // define