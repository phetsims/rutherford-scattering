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

  /**
   * Constructor.
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  function RutherfordNucleusSpace( protonCountProperty, bounds ) {

    AtomSpace.call( this, protonCountProperty, bounds );

    var rutherfordAtom = new RutherfordAtom( protonCountProperty, new Vector2( 0, 0 ), this.bounds.width );
    this.atoms.push( rutherfordAtom );

    // make sure that atom bounds are OK
    this.checkAtomBounds();
  }

  rutherfordScattering.register( 'RutherfordNucleusSpace', RutherfordNucleusSpace );

  return inherit( AtomSpace, RutherfordNucleusSpace );

} ); // define
