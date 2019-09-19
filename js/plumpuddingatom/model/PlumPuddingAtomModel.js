// Copyright 2016-2019, University of Colorado Boulder

/**
 * Model for the 'Plum Pudding Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const PlumPuddingAtomSpace = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/model/PlumPuddingAtomSpace' );
  const Property = require( 'AXON/Property' );
  const RSBaseModel = require( 'RUTHERFORD_SCATTERING/common/model/RSBaseModel' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  /**
   * @constructor
   */
  function PlumPuddingAtomModel() {

    // @public {boolean} - a property to track user interaction - only one element will change this in this screen,
    // so a DerivedProperty is not necessary as in RutherfordAtomModel
    const userInteractionProperty = new Property( false );

    RSBaseModel.call( this, userInteractionProperty );

    // @public (read-only) - space containing the atom
    this.plumPuddingSpace = new PlumPuddingAtomSpace( this.protonCountProperty, this.bounds );

    // @public (read-only)
    this.atomSpaces = [ this.plumPuddingSpace ];

  }

  rutherfordScattering.register( 'PlumPuddingAtomModel', PlumPuddingAtomModel );

  return inherit( RSBaseModel, PlumPuddingAtomModel );

} ); // define
