// Copyright 2016-2019, University of Colorado Boulder

/**
 * Legend for particles related to the atom screens and scenes in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  const ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // strings
  const alphaParticleTraceString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleTrace' );
  const electronEnergyLevelString = require( 'string!RUTHERFORD_SCATTERING/electronEnergyLevel' );
  const nucleusString = require( 'string!RUTHERFORD_SCATTERING/nucleus' );

  /**
   * Constructor.
   * @param {VBox} content
   * @param {Object} [options]
   * @constructor
   */
  function AtomParticleLegendPanel( content, options ) {
    ParticleLegendPanel.call( this, content, options );
  }

  rutherfordScattering.register( 'AtomParticleLegendPanel', AtomParticleLegendPanel );

  return inherit( ParticleLegendPanel, AtomParticleLegendPanel, {}, {

    /**
     * Create the content that is to be contained in this panel.
     *
     * @param  {Object} [options]
     * @returns {VBox}
     */
    createPanelContent: function( options ) {

      // add the legend particle entries
      const content = [];
      content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNucleus(), nucleusString ) );
      content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createEnergyLevel(), electronEnergyLevelString ) );
      content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createParticleTrace(), alphaParticleTraceString ) );

      return ParticleLegendPanel.createPanelContent( content, options );
    }
  } );
} );
