// Copyright 2016-2022, University of Colorado Boulder

/**
 * Model for the 'Rutherford Atom', responsible for moving alpha particles within its bounds.  For
 * additional information concerning the trajectory algorithm, see trajectories.pdf located in docs
 * (document may be out of date).
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import Atom from '../../common/model/Atom.js';
import RSConstants from '../../common/RSConstants.js';
import rutherfordScattering from '../../rutherfordScattering.js';

class RutherfordAtom extends Atom {

  /**
   * @param {Emitter} particleRemovedEmitter
   * @param {Property.<number>} protonCountProperty
   * @param {Vector2} position
   * @param {number} boundingWidth
   * @param {Object} [options]
   */
  constructor( particleRemovedEmitter, protonCountProperty, position, boundingWidth, options ) {

    super( position, boundingWidth, options );

    // @private
    this.protonCountProperty = protonCountProperty;
    this.particleRemovedemitter = particleRemovedEmitter;
  }

  /**
   * Remove a particle.  Most of the time, a particle needs to be removed from this atom but kept in
   * the space so that a new atom can pick it up if necessary.  On error, notify the space so that
   * the particle can be removed entirely from the model.
   * @param  {AlphaParticle}  particle
   * @param  {boolean} isError
   * @public
   */
  removeParticle( particle, isError, line ) {
    super.removeParticle( particle );

    if ( isError ) {
      this.particleRemovedemitter.emit( particle );
    }
  }

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
   * @param {AlphaParticle} alphaParticle
   * @param {number} dt
   * @override
   * @protected
   */
  moveParticle( alphaParticle, dt ) {

    // apply a rotation to the particle coordinate frame if nececssary so that
    // the trajectory algorithm can proceed as if the particle were moving straight
    // up the space - this is required by the trajectory model, see trajectories.pdf
    const rotationAngle = alphaParticle.rotationAngle;
    const correctedInitialPosition = this.rotatePointAround( alphaParticle.initialPosition, this.position, -rotationAngle );
    const correctedPosition = this.rotatePointAround( alphaParticle.positionProperty.get(), this.position, -rotationAngle );

    // algorithm fails for x=0, so use this min value
    const X0_MIN = 0.00001;

    // Divisor for L used in the calculation of D.
    const L_DIVISOR = 8;

    //-------------------------------------------------------------------------------
    // misc constants that we'll need
    //-------------------------------------------------------------------------------

    const L = this.boundingRect.bounds.getWidth();

    const p = this.protonCountProperty.get(); // protons in the atom's nucleus
    const pd = RSConstants.DEFAULT_PROTON_COUNT; // default setting for the sim

    const s = alphaParticle.speedProperty.get();  // particle's current speed
    const s0 = alphaParticle.speedProperty.initialValue; // speed when it left the gun
    const sd = RSConstants.DEFAULT_ALPHA_ENERGY; // default setting for the sim

    //-------------------------------------------------------------------------------
    // (x0,y0) : the alpha particle's initial position, relative to the atom's center.
    //-------------------------------------------------------------------------------

    // const initialPosition = alphaParticle.initialPosition;
    const relativeInitialPosition = correctedInitialPosition.minus( this.position );

    let x0 = Math.abs( relativeInitialPosition.x );
    if ( x0 < X0_MIN ) {
      x0 = X0_MIN; // algorithm fails for x0 < X0_MIN
    }

    const y0 = relativeInitialPosition.y;

    //-------------------------------------------------------------------------------
    // (x,y) : the alpha particle's current position, relative to the atom's center
    //-------------------------------------------------------------------------------

    // const position = alphaParticle.positionProperty.get();
    const relativePosition = correctedPosition.minus( this.position );

    let x = relativePosition.x;
    const y = relativePosition.y;
    let xWasNegative = false;
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
      this.removeParticle( alphaParticle, true, '149' );
      return;
    }

    const D = ( L / L_DIVISOR ) * ( p / pd ) * ( ( sd * sd ) / ( s0 * s0 ) );

    //-------------------------------------------------------------------------------
    // calculate new alpha particle position, in Polar coordinates
    //-------------------------------------------------------------------------------

    // check intermediate values to handle potential algorithm failures
    const i0 = ( x0 * x0 ) + ( y0 * y0 );
    if ( i0 < 0 ) {
      this.removeParticle( alphaParticle, true, '162' );
      return;
    }

    // b, horizontal distance to atom's center at y == negative infinity
    const b1 = Math.sqrt( i0 );

    // check intermediate values to handle potential algorithm failures
    const i1 = ( -2 * D * b1 ) - ( 2 * D * y0 ) + ( x0 * x0 );
    if ( i1 < 0 ) {
      this.removeParticle( alphaParticle, true, '172' );
      return;
    }

    const b = 0.5 * ( x0 + Math.sqrt( i1 ) );

    // convert current position to Polar coordinates, measured counterclockwise from the -y axis

    // check intermediate values to handle potential algorithm failures
    const i2 = ( x * x ) + ( y * y );
    if ( i2 < 0 ) {
      this.removeParticle( alphaParticle, true, '183' );
      return;
    }

    const r = Math.sqrt( i2 );
    const phi = Math.atan2( x, -y );

    // new position (in Polar coordinates) and speed
    const t1 = ( ( b * Math.cos( phi ) ) - ( ( D / 2 ) * Math.sin( phi ) ) );

    // check intermediate values to handle potential algorithm failures
    const i3 = Math.pow( b, 4 ) + ( r * r * t1 * t1 );
    if ( i3 < 0 ) {
      this.removeParticle( alphaParticle, true, '196' );
      return;
    }
    const phiNew = phi + ( ( b * b * s * dt ) / ( r * Math.sqrt( i3 ) ) );

    // check intermediate values to handle potential algorithm failures
    const i4 = ( ( b * Math.sin( phiNew ) ) + ( ( D / 2 ) * ( Math.cos( phiNew ) - 1 ) ) );
    if ( i4 < 0 ) {
      this.removeParticle( alphaParticle, true, '204' );
      return;
    }
    const rNew = Math.abs( ( b * b ) / i4 );

    // handle potential algorithm failures
    if ( rNew === 0 ) {
      this.removeParticle( alphaParticle, true, '211' );
      return;
    }
    const sNew = s0 * Math.sqrt( 1 - ( D / rNew ) );

    //-------------------------------------------------------------------------------
    // convert to Cartesian coordinates
    //-------------------------------------------------------------------------------

    let xNew = rNew * Math.sin( phiNew );
    if ( xWasNegative ) {
      xNew *= -1; // restore the sign
    }

    const yNew = -rNew * Math.cos( phiNew );

    //-------------------------------------------------------------------------------
    // handle potential algorithm failures
    //-------------------------------------------------------------------------------

    if ( !( b > 0 ) || !( sNew > 0 ) ) {
      this.removeParticle( alphaParticle, true, '232' );
      return;
    }

    //-------------------------------------------------------------------------------
    // set the alpha particle's new properties
    //-------------------------------------------------------------------------------

    // get the change in position relative to the atom's center, and rotate back to space coordinates
    const delta = new Vector2( xNew, yNew ).minus( relativePosition );
    delta.rotate( alphaParticle.rotationAngle );

    // update the position of the particle in its space coordinates
    alphaParticle.positionProperty.set( alphaParticle.positionProperty.get().plus( delta ) );
    alphaParticle.speedProperty.set( sNew );

    alphaParticle.orientationProperty.set( phiNew );

  }

  /**
   * Rotate the point around another origin point, returning a new Vector2.
   * Vector2 does not support RotateAround, should this be moved there?
   * @private
   *
   * @param  {Vector2} point - the point to rotate
   * @param  {Vector2} rotatePoint - the point to rotate around
   * @param  {number} angle
   * @returns {Vector2}
   */
  rotatePointAround( point, rotatePoint, angle ) {

    const sinAngle = Math.sin( angle );
    const cosAngle = Math.cos( angle );

    // translate the point back to the origin by subtracting the pivot point
    const translatedPosition = point.minus( rotatePoint );

    // rotate the point with the equivalent rotation matrix
    const xNew = translatedPosition.x * cosAngle - translatedPosition.y * sinAngle;
    const yNew = translatedPosition.x * sinAngle + translatedPosition.y * cosAngle;

    // translate the point back
    return new Vector2( xNew, yNew ).plus( rotatePoint );
  }
}

rutherfordScattering.register( 'RutherfordAtom', RutherfordAtom );

export default RutherfordAtom;