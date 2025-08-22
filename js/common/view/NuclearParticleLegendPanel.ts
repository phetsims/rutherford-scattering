// Copyright 2016-2022, University of Colorado Boulder

/**
 * Legend for particles related to the nuclear views in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import optionize from '../../../../phet-core/js/optionize.js';
import IntentionalAny from '../../../../phet-core/js/types/IntentionalAny.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import ParticleLegendPanel, { ParticleLegendPanelContentOptions, ParticleLegendPanelOptions } from './ParticleLegendPanel.js';
import ParticleNodeFactory from './ParticleNodeFactory.js';

const alphaParticleString = RutherfordScatteringStrings.alphaParticle;
const electronString = RutherfordScatteringStrings.electron;
const neutronString = RutherfordScatteringStrings.neutron;
const positiveChargeString = RutherfordScatteringStrings.positiveCharge;
const protonString = RutherfordScatteringStrings.proton;

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
  public static createPanelContent( providedOptions?: NuclearParticleLegendPanelContentOptions ): IntentionalAny {

    const options = optionize<NuclearParticleLegendPanelContentOptions, SelfOptions>()( {
      includeElectron: true,
      includePlumPudding: true // TODO: This wasn't here originally, please verify that this default is correct https://github.com/phetsims/rutherford-scattering/issues/181
    }, providedOptions );

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

    return ParticleLegendPanel.createPanel( content, options );
  }
}

rutherfordScattering.register( 'NuclearParticleLegendPanel', NuclearParticleLegendPanel );
export default NuclearParticleLegendPanel;