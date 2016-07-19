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
  var AtomSpace = require( 'RUTHERFORD_SCATTERING/common/model/AtomSpace' );
  var RutherfordAtom = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtom' );
  var RutherfordNucleus = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordNucleus' );

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

    var rutherfordAtom = new RutherfordAtom( this.particleRemovedFromAtomEmitter, protonCountProperty, new Vector2( 0, 0 ), this.bounds.width );
    this.atoms.push( rutherfordAtom );

    // make sure that atom bounds are OK
    this.checkAtomBounds();
  }

  rutherfordScattering.register( 'RutherfordNucleusSpace', RutherfordNucleusSpace );

  return inherit( AtomSpace, RutherfordNucleusSpace );

} ); // define
