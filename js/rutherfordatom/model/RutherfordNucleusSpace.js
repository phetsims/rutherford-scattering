// Copyright 2016-2020, University of Colorado Boulder

/**
 * Model for the Rutherford Atom space, responsible for atoms of the model.
 *
 * @author Jesse Greenberg
 */

import Vector2 from '../../../../dot/js/Vector2.js';
import inherit from '../../../../phet-core/js/inherit.js';
import AtomSpace from '../../common/model/AtomSpace.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordAtom from './RutherfordAtom.js';
import RutherfordNucleus from './RutherfordNucleus.js';

/**
 * Constructor.
 * @param {Property.<number>} protonCountProperty
 * @param {Property.<number>} neutronCountProperty
 * @param {Bounds2} bounds
 */
function RutherfordNucleusSpace( protonCountProperty, neutronCountProperty, bounds ) {

  AtomSpace.call( this, protonCountProperty, bounds );

  // create a nucleus model containing protons and neutrons
  this.rutherfordNucleus = new RutherfordNucleus( protonCountProperty, neutronCountProperty );

  const rutherfordAtom = new RutherfordAtom( this.particleRemovedFromAtomEmitter, protonCountProperty, new Vector2( 0, 0 ), this.bounds.width );
  this.atoms.push( rutherfordAtom );

  // make sure that atom bounds are OK
  this.checkAtomBounds();
}

rutherfordScattering.register( 'RutherfordNucleusSpace', RutherfordNucleusSpace );

inherit( AtomSpace, RutherfordNucleusSpace );
export default RutherfordNucleusSpace;