// Copyright 2016-2022, University of Colorado Boulder

/**
 * Builds the main Plum Pudding sim screen
 *
 * @author Dave Schmitz (Schmitzware)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { AlignGroup } from '../../../../scenery/js/imports.js';
import AlphaParticlePropertiesPanel from '../../common/view/AlphaParticlePropertiesPanel.js';
import NuclearParticleLegendPanel from '../../common/view/NuclearParticleLegendPanel.js';
import ParticleLegendPanel from '../../common/view/ParticleLegendPanel.js';
import RSBaseScreenView from '../../common/view/RSBaseScreenView.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import PlumPuddingSpaceNode from './PlumPuddingSpaceNode.js';

const pattern0AtomicScaleString = RutherfordScatteringStrings.pattern[ '0atomicScale' ];

class PlumPuddingAtomScreenView extends RSBaseScreenView {

  /**
   * @param {PlumPuddingAtomModel} model
   */
  constructor( model ) {

    const scaleString = StringUtils.format( pattern0AtomicScaleString, '3.0 x 10<sup>-10</sup>' );

    super( model, scaleString, createSpaceNode, {
      includePlumPuddingLegend: true
    } );

    // create the new control panel
    const propertiesPanelContent = AlphaParticlePropertiesPanel.createPanelContent( model.userInteractionProperty,
      model.alphaParticleEnergyProperty, this.showAlphaTraceProperty, { resize: false } );
    const legendPanelContent = NuclearParticleLegendPanel.createPanelContent( {
      resize: false,
      includeElectron: true,
      includePlumPudding: true
    } );

    // handle alignment for the panels, should have exactly the same width, but the legend content should be aligned
    // to the left
    const contentAlignGroup = new AlignGroup( { matchVertical: false } );
    const particleContentBox = contentAlignGroup.createBox( propertiesPanelContent );
    const legendContentBox = contentAlignGroup.createBox( legendPanelContent, { xAlign: ParticleLegendPanel.LEGEND_CONTENT_ALIGN } );

    const particlePropertiesPanel = new AlphaParticlePropertiesPanel( particleContentBox, { resize: false } );
    const legendPanel = new NuclearParticleLegendPanel( legendContentBox, { resize: false } );

    const panels = [
      legendPanel,
      particlePropertiesPanel
    ];
    const controlPanel = this.createControlPanel( panels );
    this.addChild( controlPanel );

    this.pdomPlayAreaNode.pdomOrder = [ this.gunNode ];
    if ( controlPanel ) {
      const newOrder = _.union( [ controlPanel ], this.pdomControlAreaNode.pdomOrder );
      this.pdomControlAreaNode.setPDOMOrder( newOrder );
    }
  }
}

/**
 * Create the node in which atoms and alpha particles are rendered.
 * @param {PlumPuddingAtomModel} model
 * @param {Property.<boolean>} showAlphaTraceProperty
 * @param {ModelViewTransform2} modelViewTransform
 * @param {Bounds2} canvasBounds
 * @returns {Node}
 */
const createSpaceNode = ( model, showAlphaTraceProperty, modelViewTransform, canvasBounds ) => {
  const plumPuddingSpaceNode = new PlumPuddingSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
    canvasBounds: canvasBounds
  } );

  // redraw the space node on model step
  model.addStepListener( dt => {
    plumPuddingSpaceNode.invalidatePaint();
  } );

  return plumPuddingSpaceNode;
};

rutherfordScattering.register( 'PlumPuddingAtomScreenView', PlumPuddingAtomScreenView );
export default PlumPuddingAtomScreenView;