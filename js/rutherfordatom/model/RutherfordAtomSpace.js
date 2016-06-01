// Copyright 2002-2016, University of Colorado Boulder

/**
 * Model for the Rutherford Atom space, responsible for atoms of the model.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Vector2 = require( 'DOT/Vector2' );
  var RutherfordAtom = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtom' );
  var AtomSpace = require( 'RUTHERFORD_SCATTERING/common/model/AtomSpace' );

  // constants
  var DEFLECTION_WIDTH = 14;

  /**
   * Constructor.
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  function RutherfordAtomSpace( protonCountProperty, bounds ) {

    AtomSpace.call( this, protonCountProperty, bounds );

    // factor out for readability
    var atomWidth = this.bounds.width / 2; // bounds of the entire atom, including electron radii
    var halfAtomWidth = atomWidth / 2;

    // create the atoms
    var atom1 = new RutherfordAtom( protonCountProperty, new Vector2( -halfAtomWidth, +halfAtomWidth ), DEFLECTION_WIDTH );
    var atom2 = new RutherfordAtom( protonCountProperty, new Vector2( +halfAtomWidth, +halfAtomWidth ), DEFLECTION_WIDTH );
    var atom3 = new RutherfordAtom( protonCountProperty, new Vector2( 0, -halfAtomWidth ), DEFLECTION_WIDTH );
    var atom4 = new RutherfordAtom( protonCountProperty, new Vector2( -atomWidth, -halfAtomWidth ), DEFLECTION_WIDTH );
    var atom5 = new RutherfordAtom( protonCountProperty, new Vector2( atomWidth, -halfAtomWidth ), DEFLECTION_WIDTH );

    this.atoms.push( atom1, atom2, atom3, atom4, atom5 );

    // make sure that atom bounds do not overlap
    this.checkAtomBounds();
  }

  rutherfordScattering.register( 'RutherfordAtomSpace', RutherfordAtomSpace );

  return inherit( AtomSpace, RutherfordAtomSpace );

} ); // define
