// Copyright 2002-2016, University of Colorado Boulder

/**
 * Model for the Plum Pudding Atom space.  In this representation, the particles move 
 * straight through space, so no additional atom models are added.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var AtomSpace = require( 'RUTHERFORD_SCATTERING/common/model/AtomSpace' );

  /**
   * Constructor.
   * @param {Property.<number>} protonCountProperty
   * @param {Bounds2} bounds
   */
  function PlumPuddingAtomSpace( protonCountProperty, bounds ) {

    AtomSpace.call( this, protonCountProperty, bounds );

  }

  rutherfordScattering.register( 'PlumPuddingAtomSpace', PlumPuddingAtomSpace );

  return inherit( AtomSpace, PlumPuddingAtomSpace );

} ); // define
