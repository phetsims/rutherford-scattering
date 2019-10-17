// Copyright 2016-2019, University of Colorado Boulder

/**
 * Legend for particles related to the nuclear views in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  const ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // strings
  const alphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );
  const electronString = require( 'string!RUTHERFORD_SCATTERING/electron' );
  const neutronString = require( 'string!RUTHERFORD_SCATTERING/neutron' );
  const positiveChargeString = require( 'string!RUTHERFORD_SCATTERING/positiveCharge' );
  const protonString = require( 'string!RUTHERFORD_SCATTERING/proton' );

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

      options = merge( {
        includeElectron: true // should the panel include an entry for the electron?
      }, options );

      // {Array.<Node>} - children for the content, gets wrapped in AlignBoxes in createPanelContent
      const content = [];
      if ( options.includeElectron ) {
        content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createElectron(), electronString ) );
      }
      content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createProton(), protonString ) );
      content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNeutron(), neutronString ) );
      content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNucleusAlpha(), alphaParticleString ) );
      if ( options.includePlumPudding ) {
        content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createPlumPuddingIcon(), positiveChargeString ) );
      }

      return ParticleLegendPanel.createPanelContent( content, options );
    }
  } );
} );
