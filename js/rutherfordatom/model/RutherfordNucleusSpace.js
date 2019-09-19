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
  const RutherfordNucleus = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordNucleus' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Vector2 = require( 'DOT/Vector2' );

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

  return inherit( AtomSpace, RutherfordNucleusSpace );

} ); // define
