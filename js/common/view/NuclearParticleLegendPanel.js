// Copyright 2016-2020, University of Colorado Boulder

/**
 * Legend for particles related to the nuclear views in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import rutherfordScatteringStrings from '../../rutherfordScatteringStrings.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import ParticleLegendPanel from './ParticleLegendPanel.js';
import ParticleNodeFactory from './ParticleNodeFactory.js';

const alphaParticleString = rutherfordScatteringStrings.alphaParticle;
const electronString = rutherfordScatteringStrings.electron;
const neutronString = rutherfordScatteringStrings.neutron;
const positiveChargeString = rutherfordScatteringStrings.positiveCharge;
const protonString = rutherfordScatteringStrings.proton;

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

export default inherit( ParticleLegendPanel, NuclearParticleLegendPanel, {}, {

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