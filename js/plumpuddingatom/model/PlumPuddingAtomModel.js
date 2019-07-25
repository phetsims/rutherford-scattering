// Copyright 2016-2019, University of Colorado Boulder

/**
 * Model for the 'Plum Pudding Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PlumPuddingAtomSpace = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/model/PlumPuddingAtomSpace' );
  var Property = require( 'AXON/Property' );
  var RSBaseModel = require( 'RUTHERFORD_SCATTERING/common/model/RSBaseModel' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

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
