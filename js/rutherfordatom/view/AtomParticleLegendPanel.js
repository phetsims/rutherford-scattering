// Copyright 2002-2016, University of Colorado Boulder

/**
 * Legend for particles related to the atom screens and scenes in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );

  // strings
  var nucleusString = require( 'string!RUTHERFORD_SCATTERING/nucleus' );
  var electronEnergyLevelString = require( 'string!RUTHERFORD_SCATTERING/electronEnergyLevel' );
  var alphaParticleTraceString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleTrace' );

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
     * @param  {Object} [ options ]
     * @returns {VBox}
     */
    createPanelContent: function( options ) {

      // add the legend particle entries
      var children = [];
      children.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNucleus(), nucleusString ) );
      children.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createEnergyLevel(), electronEnergyLevelString ) );
      children.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createParticleTrace(), alphaParticleTraceString ) );

      return ParticleLegendPanel.createPanelContent( children, options );
    }
  } );
} );
