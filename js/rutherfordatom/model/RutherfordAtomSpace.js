// Copyright 2016-2017, University of Colorado Boulder

/**
 * Model for the Rutherford Atom space, responsible for atoms of the model.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const AtomSpace = require( 'RUTHERFORD_SCATTERING/common/model/AtomSpace' );
  const inherit = require( 'PHET_CORE/inherit' );
  const RutherfordAtom = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtom' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Vector2 = require( 'DOT/Vector2' );

  // constants
  const DEFLECTION_WIDTH = 30;

  /**
   * Constructor.
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  function RutherfordAtomSpace( protonCountProperty, bounds ) {

    AtomSpace.call( this, protonCountProperty, bounds, {
      atomWidth: DEFLECTION_WIDTH
    } );

    // factor out for readability
    const atomWidth = this.bounds.width / 2; // bounds of the entire atom, including electron radii
    const halfAtomWidth = atomWidth / 2;

    // create the atoms
    const atom1 = new RutherfordAtom( this.particleRemovedFromAtomEmitter, protonCountProperty, new Vector2( -halfAtomWidth, +halfAtomWidth ), DEFLECTION_WIDTH );
    const atom2 = new RutherfordAtom( this.particleRemovedFromAtomEmitter, protonCountProperty, new Vector2( +halfAtomWidth, +halfAtomWidth ), DEFLECTION_WIDTH );
    const atom3 = new RutherfordAtom( this.particleRemovedFromAtomEmitter, protonCountProperty, new Vector2( 0, -halfAtomWidth ), DEFLECTION_WIDTH );
    const atom4 = new RutherfordAtom( this.particleRemovedFromAtomEmitter, protonCountProperty, new Vector2( -atomWidth, -halfAtomWidth ), DEFLECTION_WIDTH );
    const atom5 = new RutherfordAtom( this.particleRemovedFromAtomEmitter, protonCountProperty, new Vector2( atomWidth, -halfAtomWidth ), DEFLECTION_WIDTH );

    this.atoms.push( atom1, atom2, atom3, atom4, atom5 );

    // make sure that atom bounds do not overlap
    this.checkAtomBounds();
  }

  rutherfordScattering.register( 'RutherfordAtomSpace', RutherfordAtomSpace );

  return inherit( AtomSpace, RutherfordAtomSpace );

} ); // define
