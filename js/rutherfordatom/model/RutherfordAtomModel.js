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
  var Property = require( 'AXON/Property' );

  /**
   * @constructor
   */
  function RutherfordAtomModel( ) {
    RSBaseModel.call( this );

    // @public {number}
    this.protonCountProperty = new Property( RSConstants.DEFAULT_PROTON_COUNT );

    // @public {number}
    this.neutronCountProperty = new Property( RSConstants.DEFAULT_NEUTRON_COUNT );

    // @public {string} - scene to display, 'atom'|'nucleus'
    this.sceneProperty = new Property( 'atom' );

    // TODO: Remove once #119 is resolved
    Property.preventGetSet( this, 'protonCount' );
    Property.preventGetSet( this, 'neutronCount' );
    Property.preventGetSet( this, 'scene' );

    // interactions that create dependencies for the userInteractionProperty
    // these will be passed on to individual panels and interface elements
    // NOT added to property set because we don't want these to get reset with 'reset all'
    this.energyInteractionProperty = new Property( false ); // interaction with the energy slider
    this.protonInteractionProperty = new Property( false ); // interaction with the proton count slider
    this.neutronInteractionProperty = new Property( false ); // interaction with the neutron count slider

    // @public - specific interaction properties for the rutherford atom portion, for multitouch
    // tracked in the model because the control panels gets disposed when the scene changes, and we
    // do not want these properties to be reset at that time
    this.interactionPropertyGroup = {
      leftProtonButtonInteractionProperty: new Property( false ),
      rightProtonButtonInteractionProperty: new Property( false ),
      protonSliderInteractionProperty: new Property( false ),
      leftNeutronButtonInteractionProperty: new Property( false ),
      rightNeutronButtonInteractionProperty: new Property( false ),
      neutronSliderInteractionProperty: new Property( false )
    };

    // TODO: for debugging, remove after #119 is done
    Property.preventGetSet( this, 'leftProtonButtonInteraction' );
    Property.preventGetSet( this, 'rightProtonButtonInteraction' );
    Property.preventGetSet( this, 'protonSliderInteraction' );
    Property.preventGetSet( this, 'leftNeutronButtonInteraction' );
    Property.preventGetSet( this, 'rightNeutronButtonInteraction' );
    Property.preventGetSet( this, 'neutronSliderInteraction' );

    // @public - create a derived property for user interaction, so that the an interaction occurs when any dependency
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
