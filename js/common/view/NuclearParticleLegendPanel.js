// Copyright 2016-2020, University of Colorado Boulder

/**
 * Legend for particles related to the nuclear views in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import merge from '../../../../phet-core/js/merge.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import rutherfordScatteringStrings from '../../rutherfordScatteringStrings.js';
import ParticleLegendPanel from './ParticleLegendPanel.js';
import ParticleNodeFactory from './ParticleNodeFactory.js';

const alphaParticleString = rutherfordScatteringStrings.alphaParticle;
const electronString = rutherfordScatteringStrings.electron;
const neutronString = rutherfordScatteringStrings.neutron;
const positiveChargeString = rutherfordScatteringStrings.positiveCharge;
const protonString = rutherfordScatteringStrings.proton;

class NuclearParticleLegendPanel extends ParticleLegendPanel {

  /**
   * @param {Node} content
   * @param {Object} [options]
   */
  constructor( content, options ) {
    super( content, options );
  }

  /**
   * Create the panel content that is to be in this control panel.
   * @param  {Object} options
   * @returns {Node}
   * @public
   */
  static createPanelContent( options ) {

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
}

rutherfordScattering.register( 'NuclearParticleLegendPanel', NuclearParticleLegendPanel );
export default NuclearParticleLegendPanel;