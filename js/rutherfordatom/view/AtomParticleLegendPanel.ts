// Copyright 2016-2022, University of Colorado Boulder

/**
 * Legend for particles related to the atom screens and scenes in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import Node from '../../../../scenery/js/nodes/Node.js';
import ParticleLegendPanel, { ParticleLegendPanelContentOptions, ParticleLegendPanelOptions } from '../../common/view/ParticleLegendPanel.js';
import ParticleNodeFactory from '../../common/view/ParticleNodeFactory.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';

const alphaParticleTraceString = RutherfordScatteringStrings.alphaParticleTrace;
const electronEnergyLevelString = RutherfordScatteringStrings.electronEnergyLevel;
const nucleusString = RutherfordScatteringStrings.nucleus;

class AtomParticleLegendPanel extends ParticleLegendPanel {

  public constructor( content: Node, options?: ParticleLegendPanelOptions ) {
    super( content, options );
  }

  /**
   * Create the content that is to be contained in this panel.
   */
  public static createPanelContent( providedOptions?: ParticleLegendPanelContentOptions ): Node {

    // add the legend particle entries
    const content = [];
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNucleus(), nucleusString ) );
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createEnergyLevel(), electronEnergyLevelString ) );
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createParticleTrace(), alphaParticleTraceString ) );

    return ParticleLegendPanel.createPanel( content, providedOptions );
  }
}

rutherfordScattering.register( 'AtomParticleLegendPanel', AtomParticleLegendPanel );
export default AtomParticleLegendPanel;