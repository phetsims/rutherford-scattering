// Copyright 2016-2020, University of Colorado Boulder

/**
 * Legend for particles related to the atom screens and scenes in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import inherit from '../../../../phet-core/js/inherit.js';
import ParticleLegendPanel from '../../common/view/ParticleLegendPanel.js';
import ParticleNodeFactory from '../../common/view/ParticleNodeFactory.js';
import rutherfordScatteringStrings from '../../rutherfordScatteringStrings.js';
import rutherfordScattering from '../../rutherfordScattering.js';

const alphaParticleTraceString = rutherfordScatteringStrings.alphaParticleTrace;
const electronEnergyLevelString = rutherfordScatteringStrings.electronEnergyLevel;
const nucleusString = rutherfordScatteringStrings.nucleus;

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

export default inherit( ParticleLegendPanel, AtomParticleLegendPanel, {}, {

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