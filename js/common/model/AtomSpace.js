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

  /**
   * Constructor.
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  function AtomSpace( protonCountProperty, bounds ) {
    // @public (read-only)
    this.atoms = [];
    this.bounds = bounds;

    // @public - whether this space is visible or not
    this.isVisible = true;
  }

  rutherfordScattering.register( 'AtomSpace', AtomSpace );

  return inherit( AtomSpace, AtomSpace, {
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
