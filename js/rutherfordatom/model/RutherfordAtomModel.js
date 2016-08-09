// Copyright 2002-2016, University of Colorado Boulder

/**
 * Model for the 'Rutherford Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSBaseModel = require( 'RUTHERFORD_SCATTERING/common/model/RSBaseModel' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RutherfordAtomSpace = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtomSpace' );
  var RutherfordNucleusSpace = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordNucleusSpace' );
  var DerivedProperty = require( 'AXON/DerivedProperty' );

  /**
   * @constructor
   */
  function RutherfordAtomModel( ) {
    RSBaseModel.call( this );
    this.addProperty( 'protonCount', RSConstants.DEFAULT_PROTON_COUNT );
    this.addProperty( 'neutronCount', RSConstants.DEFAULT_NEUTRON_COUNT );
    this.addProperty( 'scene', 'nucleus' ); // scene to display, 'atom'|'nucleus'

    // interactions that create dependencies for the userInteractionProperty
    // these will be passed on to individual panels and interface elements
    this.addProperty( 'energyInteraction', false ); // interaction with the energy slider
    this.addProperty( 'protonInteraction', false ); // interaction with the proton count slider
    this.addProperty( 'neutronInteraction', false ); // interaction with the neutron count slider

    // create a derived property for user interaction, so that the an interaction occurs when any dependency
    // is true
    this.userInteractionProperty = DerivedProperty.or( [ this.energyInteractionProperty, this.protonInteractionProperty, this.neutronInteractionProperty ] );

    // @private - energy level changed
    var self = this;
    var userInteractionListener = function( userInteraction ) {
      if ( userInteraction ) {
        self.removeAllParticles();
      }
    };

    // no need to unlink this property as base model will exist for life of sim
    this.userInteractionProperty.link( userInteractionListener );

    // @public (read-only) - spaces containing the atoms
    this.atomSpace = new RutherfordAtomSpace( this.protonCountProperty, this.bounds );
    this.nucleusSpace = new RutherfordNucleusSpace( this.protonCountProperty, this.neutronCountProperty, this.bounds );

    // @public (read-only)
    this.atomSpaces = [ this.atomSpace, this.nucleusSpace ];

  }

  rutherfordScattering.register( 'RutherfordAtomModel', RutherfordAtomModel );

  return inherit( RSBaseModel, RutherfordAtomModel );

} ); // define
