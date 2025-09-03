// Copyright 2016-2025, University of Colorado Boulder

/**
 * Model for the Rutherford Atom space, responsible for atoms of the model.
 *
 * @author Jesse Greenberg
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Vector2 from '../../../../dot/js/Vector2.js';
import AtomSpace from '../../common/model/AtomSpace.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordAtom from './RutherfordAtom.js';
import RutherfordNucleus from './RutherfordNucleus.js';

class RutherfordNucleusSpace extends AtomSpace {

  public readonly rutherfordNucleus: RutherfordNucleus;

  public constructor( protonCountProperty: Property<number>, neutronCountProperty: Property<number>, bounds: Bounds2 ) {

    super( protonCountProperty, bounds );

    // create a nucleus model containing protons and neutrons
    this.rutherfordNucleus = new RutherfordNucleus( protonCountProperty, neutronCountProperty );

    const rutherfordAtom = new RutherfordAtom( this.particleRemovedFromAtomEmitter, protonCountProperty, new Vector2( 0, 0 ), this.bounds.width );
    this.atoms.push( rutherfordAtom );

    // make sure that atom bounds are OK
    this.checkAtomBounds();
  }
}

rutherfordScattering.register( 'RutherfordNucleusSpace', RutherfordNucleusSpace );

export default RutherfordNucleusSpace;