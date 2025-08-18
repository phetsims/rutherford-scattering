// Copyright 2016-2021, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

/**
 * Alpha particle representation - speed, orientation, current/past positions.
 * An alpha particle is initially added to an AtomSpace.  If, during its trajectory, it enters
 * a bounding box of an atom, it will be added to that atom, and its containing atom will
 * cary it through its trajectory until it enters the bounding box of a new atom.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import Property from '../../../../axon/js/Property.js';
import Matrix3 from '../../../../dot/js/Matrix3.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import merge from '../../../../phet-core/js/merge.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import Atom from './Atom.js';

class AlphaParticle {

  public speedProperty: Property<number>;
  public defaultSpeedProperty: Property<number>;
  public positionProperty: Property<Vector2>;
  public orientationProperty: Property<number>;

  // the position coordinates used for trace rendering
  public readonly positions = [];

  // initial position of the particle in a new bounding box, must be set
  // once a particle enters the bounding box of an atom
  public initialPosition = new Vector2( 0, 0 );

  // atom this particle is being deflected by
  public atom: Atom = null;

  // next atom for this particle, set once it has entered a new atom bounding circle
  public preparedAtom: Atom = null;

  // shape which is the bounding box for the atom this particle belongs to,
  // set once the particle enters the bounding box of the atom
  public boundingBox: Shape = null;

  // angle of rotation of this particle relative to the vertical in space coordinates (Math.PI)
  // used to adjust coordinates of the atomic bounding box for the trajectory algorithm
  public rotationAngle: number = null;

  // same as rotation angle, but prepared as soon as the particle enters the bounding circle
  // of the atom nucleus - applied once particle enters bounding box
  public preparedRotationAngle;

  // is this particle in the atom space or does it belong to an atom?
  public isInSpace = true;

  // transformed shape for the bounding box of the next atom, set once
  // the particle enters the bounding circle of the atom
  public preparedBoundingBox: Shape = null;

  // @private - save new particle position
  private positionListener = position => {
    this.positions.push( new Vector2( position.x, position.y ) );
  };

  // @private
  private disposeAlphaParticle = () => {
    this.positionProperty.unlink( positionListener );
  };

  public constructor( options?: object ) {

    options = merge( {
      speed: 0,
      defaultSpeed: 0,
      position: new Vector2( 0, 0 ),  // {Vector2} initial position
      orientation: Math.PI / 2  // {number} in radians
    }, options );

    this.speedProperty = new Property( options.speed );
    this.defaultSpeedProperty = new Property( options.defaultSpeed );
    this.positionProperty = new Property( options.position );
    this.orientationProperty = new Property( options.orientation );

    this.positionProperty.link( positionListener );
  }

  public dispose(): void {
    this.disposeAlphaParticle();
  }

  /**
   * Get the direction that this particle is travelling in space coordinates as a vector
   * of unit length.  The vector is created from the latest positions in the array since
   * the particle orientation is bound to the second quadrant.
   */
  public getDirection(): Vector2 {

    // if there are less than two positions, return a vector pointing in the initial orientation
    if ( this.positions.length < 2 ) {
      const orientation = this.orientationProperty.get();
      return new Vector2( Math.cos( orientation ), Math.sin( orientation ) ).normalized();
    }

    const position1 = this.positions[ this.positions.length - 2 ];
    const position2 = this.positions[ this.positions.length - 1 ];
    const direction = new Vector2( position2.x - position1.x, position2.y - position1.y );

    return direction.normalized();
  }

  /**
   * Set the bounding box for the particle. The bounding box is a rectangle shape of
   * the atom's bounds transformed so that the bottom edge is orthogonal to the orientation
   * of the particle.  The prepared box is set as soon as a particle enters the bounding circle
   * containing the atom.
   */
  public prepareBoundingBox( atom: Atom ): void {

    // get the angle of the vector orthogonal to the direction of movement
    const direction = this.getDirection();
    const perpendicular = direction.perpendicular;

    const rotationAngle = perpendicular.angle;
    this.preparedRotationAngle = rotationAngle;

    const transformedShape = atom.boundingRect.transformed( Matrix3.rotationAroundPoint( rotationAngle, atom.position ) );
    this.preparedBoundingBox = transformedShape;
  }
} // constructor

rutherfordScattering.register( 'AlphaParticle', AlphaParticle );

export default AlphaParticle;