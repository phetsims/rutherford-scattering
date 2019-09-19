// Copyright 2016-2017, University of Colorado Boulder

/**
 * Model for the Plum Pudding Atom space.  In this representation, the particles move 
 * straight through space, so no additional atom models are added.
 *
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const AtomSpace = require( 'RUTHERFORD_SCATTERING/common/model/AtomSpace' );
  const inherit = require( 'PHET_CORE/inherit' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

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
