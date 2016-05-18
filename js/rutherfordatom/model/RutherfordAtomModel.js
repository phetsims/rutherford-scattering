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

  /**
   * @constructor
   */
  function RutherfordAtomModel( ) {
    RSBaseModel.call( this );
    this.addProperty( 'protonCount', RSConstants.DEFAULT_PROTON_COUNT );
    this.addProperty( 'neutronCount', RSConstants.DEFAULT_NEUTRON_COUNT );
    this.addProperty( 'scene', 'nucleus' ); // scene to display, 'atom'|'nucleus'

    // @public (read-only) - spaces containing the atoms
    this.atomSpace = new RutherfordAtomSpace( this.protonCountProperty, this.bounds );
    this.nucleusSpace = new RutherfordNucleusSpace( this.protonCountProperty, this.bounds );

    // @public (read-only)
    this.atomSpaces = [ this.atomSpace, this.nucleusSpace ];

  }

  rutherfordScattering.register( 'RutherfordAtomModel', RutherfordAtomModel );

  return inherit( RSBaseModel, RutherfordAtomModel );

} ); // define
