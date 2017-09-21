// Copyright 2016-2017, University of Colorado Boulder

/**
 * Legend for particles related to the nuclear views in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // strings
  var alphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );
  var electronString = require( 'string!RUTHERFORD_SCATTERING/electron' );
  var neutronString = require( 'string!RUTHERFORD_SCATTERING/neutron' );
  var positiveChargeString = require( 'string!RUTHERFORD_SCATTERING/positiveCharge' );
  var protonString = require( 'string!RUTHERFORD_SCATTERING/proton' );

  /**
   *
   * @param {VBox} content
   * @param {Object} [options]
   * @constructor
   */
  function NuclearParticleLegendPanel( content, options ) {
    ParticleLegendPanel.call( this, content, options );
  }

  rutherfordScattering.register( 'NuclearParticleLegendPanel', NuclearParticleLegendPanel );

  return inherit( ParticleLegendPanel, NuclearParticleLegendPanel, {}, {

    /**
     * Create the panel content that is to be in this control panel.
     *
     * @param  {Object} options
     * @returns {VBox}
     */
    createPanelContent: function( options ) {

      options = _.extend( {
        includeElectron: true // should the panel include an entry for the electron?
      }, options );

      // add the legend particle entries
      var children = [];
      if ( options.includeElectron ) {
        children.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createElectron(), electronString ) );
      }
      children.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createProton(), protonString ) );
      children.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNeutron(), neutronString ) );
      children.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNucleusAlpha(), alphaParticleString ) );
      if ( options.includePlumPudding ) {
        children.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createPlumPuddingIcon(), positiveChargeString ) );
      }

      return ParticleLegendPanel.createPanelContent( children, options );
    }
  } );
} );
