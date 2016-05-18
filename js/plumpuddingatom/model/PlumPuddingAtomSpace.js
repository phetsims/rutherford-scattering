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
  var PlumPuddingAtom = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/model/PlumPuddingAtom' );
  var AtomSpace = require( 'RUTHERFORD_SCATTERING/common/model/AtomSpace' );

  /**
   * Constructor.
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  function PlumPuddingAtomSpace( protonCountProperty, bounds ) {

    AtomSpace.call( this, protonCountProperty, bounds );

    var plumPuddingAtom = new PlumPuddingAtom(  protonCountProperty, new Vector2( 0, 0 ), this.bounds.width );
    this.atoms.push( plumPuddingAtom );

    // make sure that atom bounds are OK
    this.checkAtomBounds();
  }

  rutherfordScattering.register( 'PlumPuddingAtomSpace', PlumPuddingAtomSpace );

  return inherit( AtomSpace, PlumPuddingAtomSpace );

} ); // define
