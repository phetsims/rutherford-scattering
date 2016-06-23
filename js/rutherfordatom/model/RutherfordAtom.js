// Copyright 2002-2016, University of Colorado Boulder

/**
 * Model for the 'Rutherford Atom', responsible for moving alpha particles within its bounds.  For 
 * additional information concerning the trajectory algorithm, see trajectories.pdf located in docs
 * (document may be out of date).
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
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
   * Constructor.
   * @param {Emitter} particleRemovedEmitter
   * @param {Property.<number>} protonCountProperty
   * @param {Vector2} position
   * @param {number} boundingWidth
   * @param {Object} options
   */
  function RutherfordAtom( particleRemovedEmitter, protonCountProperty, position, boundingWidth, options ) {

    Atom.call( this, position, boundingWidth, options );

    // @private
    this.protonCountProperty = protonCountProperty;
    this.particleRemovedemitter = particleRemovedEmitter;

  }

  rutherfordScattering.register( 'RutherfordAtom', RutherfordAtom );

  return inherit( Atom, RutherfordAtom, {

    /**
     * Remove a particle.  On error, notify the space so that the particle can be removed 
     * entirely not just this atom.
     * @param  {AlphaParticle}  particle
     * @param  {Boolean} isError
     */
    removeParticle: function( particle, isError ) {
      Atom.prototype.removeParticle.call( this, particle );

      if ( isError ) {
        this.particleRemovedemitter.emit1( particle );
      }
    },

    /**
     * ASSUMPTIONS MADE IN THIS ALGORITHM: 
     * (1) The atom is located at (0,0).
     * This is not the case in our model. So coordindates are adjusted 
     * as described in the comments.
     * (2) +y is up.
     * Our model has +y down. So we'll be adjusting the sign on y 
     * coordinates, as described in the comments.
     * (3) alpha particles are moving from bottom to top
     * (4) x values are positive.
     * The algoritm fails for negative values of x. This is not
     * mentioned in the specification document. So we have to convert
     * to positive values of x, then convert back.
     * (5) Using "phi=arctan(-x,y)" as described in the spec causes
     * particles to jump discontinuously when they go above the y axis.
     * This is fixed by using Math.atan2 instead.
     * (6) Depending on the parameters supplied, the algorithm will tend
     * to fail as the alpha particle's horizontal position (x) gets closer
     * to zero. So the Gun model is calibrated to fire alpha particles 
     * with some min initial x value.
     *
     * NOTE: In the original algorithm, particles are removed to prevent failure.  Now that the sim
     * supports multiple deflections, this is too aggressive and simply returning is sufficient.  Commenting out
     * these removeParticle functions, but keeping for documentation since I am unfamiliar with this algorithm
     * and this may need to be revisited in the future.
     * - Jesse Greenberg (6/22/16)
     * 
     * @param {AlphaParticle} alphaParticle
     * @param {number} dt
     * @override
     * @protected
     */
    moveParticle: function( alphaParticle, dt ) {

      // apply a rotation to the particle coordinate frame if nececssary so that
      // the trajectory algorithm can proceed as if the particle were moving straight
      // up the space - this is required by the trajectory model, see trajectories.pdf
      var rotationAngle = alphaParticle.rotationAngle;
      var correctedInitialPosition = this.rotatePointAround( alphaParticle.initialPosition, this.position, -rotationAngle );
      var correctedPosition = this.rotatePointAround( alphaParticle.position, this.position, -rotationAngle );

      // algorithm fails for x=0, so use this min value
      var X0_MIN = 0.00001;

      // Divisor for L used in the calculation of D.
      var L_DIVISOR = 8;

      //-------------------------------------------------------------------------------
      // misc constants that we'll need
      //-------------------------------------------------------------------------------

      var L = this.boundingRect.bounds.getWidth();

      var p = this.protonCountProperty.get(); // protons in the atom's nucleus
      var pd = RSConstants.DEFAULT_PROTON_COUNT; // default setting for the sim

      var s = alphaParticle.speedProperty.get();  // particle's current speed
      var s0 = alphaParticle.speedProperty.initialValue; // speed when it left the gun
      var sd = RSConstants.DEFAULT_ALPHA_ENERGY; // default setting for the sim

      //-------------------------------------------------------------------------------
      // (x0,y0) : the alpha particle's initial position, relative to the atom's center.
      //-------------------------------------------------------------------------------

      // var initialPosition = alphaParticle.initialPosition;
      var relativeInitialPosition = correctedInitialPosition.minus( this.position );

      var x0 = Math.abs( relativeInitialPosition.x );
      if ( x0 < X0_MIN ) {
        x0 = X0_MIN; // algorithm fails for x0 < X0_MIN
      }

      var y0 = relativeInitialPosition.y;

      //-------------------------------------------------------------------------------
      // (x,y) : the alpha particle's current position, relative to the atom's center
      //-------------------------------------------------------------------------------

      // var position = alphaParticle.positionProperty.get();
      var relativePosition = correctedPosition.minus( this.position );

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

      // handle potential algorithm failures, see documentation above
      if ( ( pd <= 0 ) || ( s0 === 0 ) ) {
        // this.removeParticle( alphaParticle, true );
        return;
      }

      var D = ( L / L_DIVISOR ) * ( p / pd ) * ( ( sd * sd ) / ( s0 * s0 ) );

      //-------------------------------------------------------------------------------
      // calculate new alpha particle position, in Polar coordinates
      //-------------------------------------------------------------------------------

      // check intermediate values to handle potential algorithm failures, see documentation above
      var i0 = ( x0 * x0 ) + ( y0 * y0 );
      if ( i0 < 0 ) {
        // this.removeParticle( alphaParticle, true );
        return;
      }

      // b, horizontal distance to atom's center at y == negative infinity
      var b1 = Math.sqrt( i0 );

      // check intermediate values to handle potential algorithm failures, see documentation above
      var i1 = ( -2 * D * b1 ) - ( 2 * D * y0 ) + ( x0 * x0 );
      if ( i1 < 0 ) {
        // this.removeParticle( alphaParticle, true );
        return;
      }

      var b = 0.5 * ( x0 + Math.sqrt( i1 ) );

      // convert current position to Polar coordinates, measured counterclockwise from the -y axis

      // check intermediate values to handle potential algorithm failures, see documentation above
      var i2 = ( x * x ) + ( y * y );
      if ( i2 < 0 ) {
        // this.removeParticle( alphaParticle, true );
        return;
      }

      var r = Math.sqrt( i2 );
      var phi = Math.atan2( x, -y );

      // new position (in Polar coordinates) and speed
      var t1 = ( ( b * Math.cos( phi ) ) - ( ( D / 2 ) * Math.sin( phi ) ) );

      // check intermediate values to handle potential algorithm failures, see documentation above
      var i3 = Math.pow( b, 4 ) + ( r * r * t1 * t1 );
      if ( i3 < 0 ) {
        // this.removeParticle( alphaParticle, true );
        return;
      }
      var phiNew = phi + ( ( b * b * s * dt ) / ( r * Math.sqrt( i3 ) ) );

      // check intermediate values to handle potential algorithm failures
      // see documentation above, this one must be kept because it truly signifies a failure
      var i4 = ( ( b * Math.sin( phiNew ) ) + ( ( D / 2 ) * ( Math.cos( phiNew ) - 1 ) ) );
      if ( i4 < 0 ) {
        this.removeParticle( alphaParticle, true );
        return;
      }
      var rNew = Math.abs( ( b * b ) / i4 );

      // handle potential algorithm failures, see documentation above
      if ( rNew === 0 ) {
        // this.removeParticle( alphaParticle, true );
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
        // this.removeParticle( alphaParticle, true );
        return;
      }

      //-------------------------------------------------------------------------------
      // set the alpha particle's new properties
      //-------------------------------------------------------------------------------

      // get the change in position relative to the atom's center, and rotate back to space coordinates
      var delta = new Vector2( xNew, yNew ).minus( relativePosition );
      delta.rotate( alphaParticle.rotationAngle );

      // update the position of the particle in its space coordinates
      alphaParticle.positionProperty.value = alphaParticle.positionProperty.value.plus( delta );
      alphaParticle.speedProperty.value = sNew;

      alphaParticle.orientationProperty.value = phiNew;

    },

    /**
     * Rotate the point around another origin point, returning a new Vector2.
     * Vector2 does not support RotateAround, should this be moved there?
     * 
     * @param  {Vector2} point - the point to rotate
     * @param  {Vector2} rotatePoint - the point to rotate around
     * @param  {number} angle
     * @return {Vector2}
     */
    rotatePointAround: function( point, rotatePoint, angle ) {

        var sinAngle = Math.sin( angle );
        var cosAngle = Math.cos( angle );

        // translate the point back to the origin by subtracting the pivot point
        var translatedPosition = point.minus( rotatePoint );

        // rotate the point with the equivalent rotation matrix
        var xNew = translatedPosition.x * cosAngle - translatedPosition.y * sinAngle;
        var yNew = translatedPosition.x * sinAngle + translatedPosition.y * cosAngle;

        // translate the point back
        return new Vector2( xNew, yNew ).plus( rotatePoint ); 
    }

  } ); // inherit

} ); // define
