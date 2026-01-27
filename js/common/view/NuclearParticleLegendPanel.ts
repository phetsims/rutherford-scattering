// Copyright 2016-2025, University of Colorado Boulder

/**
 * Legend for particles related to the nuclear views in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import optionize from '../../../../phet-core/js/optionize.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringFluent from '../../RutherfordScatteringFluent.js';
import ParticleLegendPanel, { ParticleLegendPanelContentOptions, ParticleLegendPanelOptions } from './ParticleLegendPanel.js';
import ParticleNodeFactory from './ParticleNodeFactory.js';

const alphaParticleStringProperty = RutherfordScatteringFluent.alphaParticleStringProperty;
const electronStringProperty = RutherfordScatteringFluent.electronStringProperty;
const neutronStringProperty = RutherfordScatteringFluent.neutronStringProperty;
const positiveChargeStringProperty = RutherfordScatteringFluent.positiveChargeStringProperty;
const protonStringProperty = RutherfordScatteringFluent.protonStringProperty;

type SelfOptions = {
  includeElectron?: boolean;
  includePlumPudding?: boolean;
};

type NuclearParticleLegendPanelContentOptions = SelfOptions & ParticleLegendPanelContentOptions;

class NuclearParticleLegendPanel extends ParticleLegendPanel {

  public constructor( content: Node, options?: ParticleLegendPanelOptions ) {
    super( content, options );
  }

  /**
   * Create the panel content that is to be in this control panel.
   */
  public static createPanelContent( providedOptions?: NuclearParticleLegendPanelContentOptions ): Node {

    const options = optionize<NuclearParticleLegendPanelContentOptions, SelfOptions>()( {
      includeElectron: true,
      includePlumPudding: true
    }, providedOptions );

    // {Array.<Node>} - children for the content, gets wrapped in AlignBoxes in createPanelContent
    const content = [];
    if ( options.includeElectron ) {
      content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createElectron(), electronStringProperty ) );
    }
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createProton(), protonStringProperty ) );
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNeutron(), neutronStringProperty ) );
    content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createNucleusAlpha(), alphaParticleStringProperty ) );
    if ( options.includePlumPudding ) {
      content.push( ParticleLegendPanel.createParticleBox( ParticleNodeFactory.createPlumPuddingIcon(), positiveChargeStringProperty ) );
    }

    return ParticleLegendPanel.createPanel( content, options );
  }
}

rutherfordScattering.register( 'NuclearParticleLegendPanel', NuclearParticleLegendPanel );
export default NuclearParticleLegendPanel;