// Copyright 2016-2019, University of Colorado Boulder

/**
 * Model for the 'Rutherford Atom' screen.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Property = require( 'AXON/Property' );
  var RSBaseModel = require( 'RUTHERFORD_SCATTERING/common/model/RSBaseModel' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RutherfordAtomSpace = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtomSpace' );
  var RutherfordNucleusSpace = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordNucleusSpace' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  /**
   * @constructor
   */
  function RutherfordAtomModel( ) {

    // interactions that create dependencies for the DerivedProperties that will track user interaction, generally
    // used by control panels to prevent multitouch issues by tracking when the user is changing something
    const energyInteractionProperty = new Property( false ); // interaction with the energy slider
    const protonInteractionProperty = new Property( false ); // interaction with the proton count slider
    const neutronInteractionProperty = new Property( false ); // interaction with the neutron count slider

    // @public - create a derived property for user interaction, so that the an interaction occurs when any dependency
    // is true
    const userInteractionProperty = DerivedProperty.or( [ energyInteractionProperty, protonInteractionProperty, neutronInteractionProperty ] );

    RSBaseModel.call( this, userInteractionProperty );

    // @public
    this.energyInteractionProperty = energyInteractionProperty;
    this.protonInteractionProperty = protonInteractionProperty;
    this.neutronInteractionProperty = neutronInteractionProperty;

    // @public {number}
    this.protonCountProperty = new Property( RSConstants.DEFAULT_PROTON_COUNT );

    // @public {number}
    this.neutronCountProperty = new Property( RSConstants.DEFAULT_NEUTRON_COUNT );

    // @public {string} - scene to display, 'atom'|'nucleus'
    this.sceneProperty = new Property( 'atom' );

    // @public (read-only) - spaces containing the atoms
    this.atomSpace = new RutherfordAtomSpace( this.protonCountProperty, this.bounds );
    this.nucleusSpace = new RutherfordNucleusSpace( this.protonCountProperty, this.neutronCountProperty, this.bounds );

    // @public (read-only)
    this.atomSpaces = [ this.atomSpace, this.nucleusSpace ];

  }

  rutherfordScattering.register( 'RutherfordAtomModel', RutherfordAtomModel );

  return inherit( RSBaseModel, RutherfordAtomModel, {

    reset: function() {
      this.protonCountProperty.reset();
      this.neutronCountProperty.reset();
      this.sceneProperty.reset();
      this.energyInteractionProperty.reset();
      this.protonInteractionProperty.reset();
      this.neutronInteractionProperty.reset();

      RSBaseModel.prototype.reset.call( this );
    }
  } );

} ); // define
