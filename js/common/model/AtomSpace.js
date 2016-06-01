// Copyright 2002-2016, University of Colorado Boulder

/**
 * Model for the Rutherford Atom space, responsible for atoms of the model and model bounds.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor.
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  function AtomSpace( protonCountProperty, bounds ) {
    // @public (read-only)
    this.atoms = [];
    this.particles = [];
    this.bounds = bounds;

    // @public - whether this space is visible or not
    this.isVisible = true;
  }

  rutherfordScattering.register( 'AtomSpace', AtomSpace );

  return inherit( AtomSpace, AtomSpace, {

    /**
     * @param {AlphaParticle} alphaParticle
     * @public
     */
    addParticle: function( alphaParticle ) {
      this.particles.push( alphaParticle );
    },

    /**
     * Remove a particle from this space
     * @param  {AlphaParticle} alphaParticle
     * @public
     */
    removeParticle: function( alphaParticle ) {
      var self = this;
      var index = this.particles.indexOf( alphaParticle );
      if ( index > -1 ) {
        this.particles.splice( index, 1 );
      }
    },

    /**
     * All particles that are in the space and not contained by an atom need to move straight through.
     * If a particle moves into an atom's bounds, it should be removed from the space and added to
     * that atom.  The atom will then handle the particle's trajectory through space.
     */
    moveParticles: function( dt ) {
      var particleMovedToAtom;
      for ( var i = 0 ; i < this.particles.length; i++ ) {
        particleMovedToAtom = false;
        var alphaParticle = this.particles[ i ]; // for readability

        // if the particle is in the bounds of another atom, add it to the atom and remove from the space
        for ( var j = 0; j < this.atoms.length; j++ ) {
          var atom = this.atoms[ j ];
          if ( atom.bounds.containsPoint( alphaParticle.position ) ) {
            this.removeParticle( alphaParticle );
            atom.addParticle( alphaParticle );

            // do nothing more with this particle
            particleMovedToAtom = true;
            break;
          }
        }

        // if the particle has not been added to an atom, move it through space
        if ( !particleMovedToAtom ) {
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
      }

      // move particles owned by the atoms
      this.atoms.forEach( function( atom ) {
        atom.moveParticles( dt );
      } );
    },

    /**
     * Check to make sure that the atom bounds do not overlap each other.
     * Added to prototype so that subtypes can check their atoms once they
     * have been instantiated.
     */
    checkAtomBounds: function() {
    // make sure that none of the atoms overlap each other
      for ( var i = 0; i < this.atoms.length - 1; i++ ) {
        for ( var j = i + 1; j < this.atoms.length; j++ ) {
          // get the atom bounds and erode slightly because bounds should perfectly overlap at edges
          var atom1Bounds = this.atoms[ i ].bounds.eroded( 0.01 );
          var atom2Bounds = this.atoms[ j ].bounds.eroded( 0.01 );
          var boundsIntersect = atom1Bounds.intersectsBounds( atom2Bounds );
          assert && assert( !boundsIntersect, 'Atom bounds intersect' );
        }
      }
    }
  } );
} ); // define
