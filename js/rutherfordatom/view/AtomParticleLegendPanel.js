// Copyright 2016-2022, University of Colorado Boulder

/**
 * Legend for particles related to the atom screens and scenes in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import ParticleLegendPanel from '../../common/view/ParticleLegendPanel.js';
import ParticleNodeFactory from '../../common/view/ParticleNodeFactory.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';

const alphaParticleTraceString = RutherfordScatteringStrings.alphaParticleTrace;
const electronEnergyLevelString = RutherfordScatteringStrings.electronEnergyLevel;
const nucleusString = RutherfordScatteringStrings.nucleus;

class AtomParticleLegendPanel extends ParticleLegendPanel {

  /**
   * @param {Node} content
   * @param {Object} [options]
   */
  constructor( content, options ) {
    super( content, options );
  }

  /**
   * Create the content that is to be contained in this panel.
   *
   * @param  {Object} [options]
   * @returns {Node}
   * @public
   */
  static createPanelContent( options ) {

    // add the legend particle entries
    const content = [];
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNucleus(), nucleusString ) );
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createEnergyLevel(), electronEnergyLevelString ) );
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createParticleTrace(), alphaParticleTraceString ) );

    return ParticleLegendPanel.createPanelContent( content, options );
  }
}

rutherfordScattering.register( 'AtomParticleLegendPanel', AtomParticleLegendPanel );
export default AtomParticleLegendPanel;