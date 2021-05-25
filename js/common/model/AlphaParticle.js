// Copyright 2016-2021, University of Colorado Boulder

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

class AlphaParticle {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

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

    // @public (read-only) - the position coordinates used for trace rendering
    this.positions = [];

    // @public - initial position of the particle in a new bounding box, must be set
    // once a particle enters the bounding box of an atom
    this.initialPosition = new Vector2( 0, 0 );

    // @public - atom this particle is being deflected by
    this.atom = null;

    // @public - next atom for this particle, set once it has entered a new atom bounding circle
    this.preparedAtom = null;

    // @public {Shape} - shape which is the bounding box for the atom this particle belongs to,
    // set once the particle enters the bounding box of the atom
    this.boundingBox = null;

    // @public - angle of rotation of this particle relative to the vertical in space coordinates (Math.PI)
    // used to adjust coordinates of the atomic bounding box for the trajectory algorithm
    this.rotationAngle = null;

    // @public - same as rotation angle, but prepared as soon as the particle enters the bounding circle
    // of the atom nucleus - applied once particle enters bounding box
    this.preparedRotationAngle;

    // @public - is this particle in the atom space or does it belong to an atom?
    this.isInSpace = true;

    // @public {Shape} - transformed shape for the bounding box of the next atom, set once
    // the particle enters the bounding circle of the atom
    this.preparedBoundingBox = null;

    // @private - save new particle position
    const positionListener = position => {
      this.positions.push( new Vector2( position.x, position.y ) );
    };
    this.positionProperty.link( positionListener );

    // @private
    this.disposeAlphaParticle = () => {
      this.positionProperty.unlink( positionListener );
    };

  }

  // @public
  dispose() {
    this.disposeAlphaParticle();
  }

  /**
   * Get the direction that this particle is travelling in space coordinates as a vector
   * of unit length.  The vector is created from the latest positions in the array since
   * the particle orientation is bound to the second quadrant.
   * @returns {Vector2}
   * @public
   */
  getDirection() {

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
   * @param {RutherfordAtom} atom
   * @public
   */
  prepareBoundingBox( atom ) {

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