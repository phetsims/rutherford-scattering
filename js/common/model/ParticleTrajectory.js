// Copyright 2002-2016, University of Colorado Boulder

/**
 * A pre constructed trajectory for a particle.  A trajectory is a collection of positions
 * for the particle.  The particle will step through these positions through the animation.
 * Rather than build up a trajectory on the fly, this trajectory is constructed when the particle
 * is created.  When a trajectory fails, a new one is created for the alpha particle from a
 * different position.  This prevents the particle from failing mid-animation and alpha
 * particles won't dissapear from the atom space.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Vector2 = require( 'DOT/Vector2' );
  var Util = require( 'DOT/Util' );
  var Matrix3 = require( 'DOT/Matrix3' );

  // constants
  var TIME_STEP = 1 / 120; // nominal dt, assuming 60 frames per second

  /**
   *
   * @constructor
   */
  function ParticleTrajectory( atomSpace, initialConditions ) {

    // @public (read-only) - collection of TrajectoryPositions for the particle
    this.positions = [];

    // @private
    this.initialConditions = initialConditions;
    this.atomSpace = atomSpace;

    // @private - dilated to support particles sliding off edge of space
    this.dilatedModelBounds = atomSpace.bounds.dilated( 10 );

    // prepared objects used to transition a particle to space
    this.preparedBoundingBox = null; // a bounding box transformed for the trajectory algorithm
    this.preparedAtom = null; // an atom prepared for the particle, the particle has not yet entered the atom bounds
    this.activeAtom = null; // the atom currently used to calculate the trajectory

    // generate the trajectory for the particle
    this.generateTrajectory();
  }

  rutherfordScattering.register( 'ParticleTrajectory', ParticleTrajectory );

  inherit( Object, ParticleTrajectory, {

    getPositionAtTime: function( time ) {
      var position;
      for ( var i = 1; i < this.positions.length; i++ ) {
        var previousTime = Util.toFixed( this.positions[ i - 1 ].time, 5 );
        var nextTime = Util.toFixed( this.positions[i].time, 5 );

        if ( previousTime <= time && time <= nextTime ) {
          position = this.positions[ i ].position;
        }
      }

      assert && assert( position, 'Position not found for time ' + time );
      return position;
    },

    /**
     * Build the trajectory for the particle, depending on the number of atoms in the containing space.
     *
     * @return {type}  description
     */
    generateTrajectory: function() {
      if ( this.atomSpace.atoms.length === 0 ) {
        this.generateStraightTrajectory();
      }
      else {
        this.generateScatterTrajectory();
      }
    },

    /**
     * Generate a trajectory for the particle that might scatter off of an atom.
     *
     * @param  {type} dt description
     * @return {type}    description
     */
    generateScatterTrajectory: function() {

      // continue to build the trajectory for as long as the particle exists in the bounds
      var time = 0;
      var position = this.initialConditions.position;
      var initialPosition = new TrajectoryPosition( position, time );
      this.positions.push( initialPosition );

      while( this.dilatedModelBounds.containsPoint( position ) ) {

          // if there is no active atom, the particle should move straight through space
          if ( !this.activeAtom ) {
            var newPosition = this.moveStraightThroughSpace( position, time );
            time += TIME_STEP;
            this.positions.push( new TrajectoryPosition( newPosition, time ) );

            position = newPosition;
          }
          // move this particle into an atom if it reaches atomic bounds
          // TODO: only initial position for now
          // this.transitionParticleToAtoms( this.initialConditions.position );

          // move this particle back into space if it exits the bounds of an atom
          // this.transitionParticlesToSpace();
        }
    },

    /**
     * Get a TrajectoryPosition that moves straight through space.  This function should never be hits
     * if there is an active nucleus that the particle is interacting with.
     *
     * @param  {number} dt
     * @return {TrajectoryPosition}
     */
    moveStraightThroughSpace: function( previousPosition, dt ) {
      var speed = this.initialConditions.speed;
      var distance = speed * TIME_STEP;
      var direction = this.initialConditions.orientation;
      // var timeInTrajectory = dt;

      var dx = Math.cos( direction ) * distance;
      var dy = Math.sin( direction ) * distance;

      // get the next position
      var x = previousPosition.x + dx;
      var y = previousPosition.y + dy;

      // add new position to the list of positions and set the previous position to the last one.
      return new Vector2( x, y );
    },

    /**
     * Generate a trajectory that travels straight up the space.
     */
    generateStraightTrajectory: function( dt ) {
      assert && assert( this.atomSpace.atoms.length === 0, 'if there is an atom in the space, use generateScatterTrajectory' );

      var speed = this.initialConditions.speed;
      var distance = speed * TIME_STEP;
      var direction = this.initialConditions.orientation;
      var previousPosition = this.initialConditions.position;
      var timeInTrajectory = 0;

      // position deltas should be the same for the entire trajectory
      var dx = Math.cos( direction ) * distance;
      var dy = Math.sin( direction ) * distance;

      // build the trajectory as long as the particle is still in space, dilated to allow for particles to
      // slide off the edge of the space
      while( this.dilatedModelBounds.containsPoint( previousPosition ) ) {

        // get the next position
        var x = previousPosition.x + dx;
        var y = previousPosition.y + dy;

        // add new position to the list of positions and set the previous position to the last one.
        var newPosition = new Vector2( x, y );
        this.positions.push( new TrajectoryPosition( newPosition, timeInTrajectory ) );
        previousPosition = newPosition;

        timeInTrajectory += TIME_STEP;
      }
    },

    /**
     * Transition a particle in empty space to an atom if the particle hits atomic bounds.  If the particle hits
     * a new atom's bounding circle, a new shape is prepared and transformed for the trajectory algorithm.  Once
     * the particle hits the atom's bounding box, the prepared shape is applied until the particle reaches
     * a new atom.
     */
    transitionParticleToAtoms: function( position ) {

      for ( var j = 0; j < this.atomSpace.atoms.length; j++ ) {
        var atom = this.atomSpace.atoms[ j ];

        if ( this.preparedAtom !== atom && atom.boundingCircle.containsPoint( position ) ) {
          this.prepareBoundingBox( atom );
          this.preparedAtom = atom;

          // purely for debugging to visualize transformed shapes
          // this.particleTransitionedEmitter.emit1( particle );
        }

        // apply bounding box if it is prepared and the particle reaches an atomic bounding box
        if ( this.preparedBoundingBox ) {
          if ( this.preparedBoundingBox.containsPoint( position ) && this.atom !== this.preparedAtom ) {
            if ( this.atom ) {
              // if the particle already belongs to an atom, remove it from the atom
              // this.atom.removeParticle( particle );
            }
            // immediately set the atom so it stops traveling farther into the box
            this.activeAtom = this.preparedAtom;

            // particle.boundingBox = particle.preparedBoundingBox;
            // particle.rotationAngle = particle.preparedRotationAngle;

          }
        }
      }
    },

    /**
     * Get the direction that the  particle is travelling in space coordinates as a vector
     * of unit length.  The vector is created from the latest positions in the array since
     * the the the particle orientation is bound to the second quadrant.
     * @return {Vector2}
     */
    getDirection: function() {

      // if there are less than two positions, return a vector pointing in the initial orientation
      if ( this.positions.length < 2 ) {
        return new Vector2( Math.cos( this.initialConditions.orientation ), Math.sin( this.initialConditions.orientation ) ).normalized();
      }

      var position1 = this.positions[ this.positions.length - 2 ].position;
      var position2 = this.positions[ this.positions.length - 1 ].position;
      var direction = new Vector2( position2.x - position1.x, position2.y - position1.y );

      return direction.normalized();
    },

    /**
     * Prepare a bounding box for the trajectory. The bounding box is a rectangle shape of
     * an atom's bounds transformed so that the bottom edge is orthogonal to the current orientation
     * of the trajectory.  The prepared box is set as soon as a particle enters the bounding circle
     * containing an atom.
     *
     * @param {RutherfordAtom} atom
     */
    prepareBoundingBox: function( atom ) {

      // get the angle of the vector orthogonal to the direction of movement
      var direction = this.getDirection();
      var perpendicular = direction.perpendicular();

      var rotationAngle = perpendicular.angle();
      this.preparedRotationAngle = rotationAngle;

      var transformedShape = atom.boundingRect.transformed( Matrix3.rotationAroundPoint( rotationAngle, atom.position ) );
      this.preparedBoundingBox = transformedShape;
    }

  } );

  /**
   * A position in the trajectory for the particle.  Composed of a vector postition and a time at which the particle
   * should be at that position in its lifetime.  This should allow us to update the position of the particle
   * as if it were moving at 60 frames per second even if step() is hindered.
   *
   * @param  {Vector2} position description
   * @param  {number} time     description
   */
  function TrajectoryPosition( position, time ) {
    this.position = position;
    this.time = time;
  }

  inherit( Object, TrajectoryPosition );

  rutherfordScattering.register( 'ParticleTrajectory.TrajectoryPosition', TrajectoryPosition );

  return ParticleTrajectory;
} );
