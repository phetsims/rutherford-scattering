// Copyright 2016-2021, University of Colorado Boulder

/**
 * Model for the Rutherford Atom space, responsible for atoms of the model.
 *
 * @author Jesse Greenberg
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import AtomSpace from '../../common/model/AtomSpace.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordAtom from './RutherfordAtom.js';

// constants
const DEFLECTION_WIDTH = 30;

class RutherfordAtomSpace extends AtomSpace {

  /**
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  constructor( protonCountProperty, bounds ) {

    super( protonCountProperty, bounds, {
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
}

rutherfordScattering.register( 'RutherfordAtomSpace', RutherfordAtomSpace );

export default RutherfordAtomSpace;