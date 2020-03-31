// Copyright 2016-2020, University of Colorado Boulder

/**
 * Builds the main Plum Pudding sim screen
 *
 * @author Dave Schmitz (Schmitzware)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import AlignGroup from '../../../../scenery/js/nodes/AlignGroup.js';
import AlphaParticlePropertiesPanel from '../../common/view/AlphaParticlePropertiesPanel.js';
import NuclearParticleLegendPanel from '../../common/view/NuclearParticleLegendPanel.js';
import ParticleLegendPanel from '../../common/view/ParticleLegendPanel.js';
import RSBaseScreenView from '../../common/view/RSBaseScreenView.js';
import rutherfordScatteringStrings from '../../rutherfordScatteringStrings.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import PlumPuddingSpaceNode from './PlumPuddingSpaceNode.js';

const pattern0AtomicScaleString = rutherfordScatteringStrings.pattern[ '0atomicScale' ];

/**
 * @param {PlumPuddingAtomModel} model
 * @constructor
 */
function PlumPuddingAtomScreenView( model ) {

  const scaleString = StringUtils.format( pattern0AtomicScaleString, '3.0 x 10<sup>-10</sup>' );

  RSBaseScreenView.call( this, model, scaleString, createSpaceNode, {
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

  this.pdomPlayAreaNode.accessibleOrder = [ this.gunNode ];
  if ( controlPanel ) {
    const newOrder = _.union( [ controlPanel ], this.pdomControlAreaNode.accessibleOrder );
    this.pdomControlAreaNode.setAccessibleOrder( newOrder );
  }
}

rutherfordScattering.register( 'PlumPuddingAtomScreenView', PlumPuddingAtomScreenView );

/**
 * Create the node in which atoms and alpha particles are rendered.
 * @param {PlumPuddingAtomModel} model
 * @param {Property.<boolean>} showAlphaTraceProperty
 * @param {ModelViewTransform2} modelViewTransform
 * @param {Bounds2} canvasBounds
 * @returns {Node}
 */
var createSpaceNode = function( model, showAlphaTraceProperty, modelViewTransform, canvasBounds ) {
  const plumPuddingSpaceNode = new PlumPuddingSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
    canvasBounds: canvasBounds
  } );

  // redraw the space node on model step
  model.addStepListener( function( dt ) {
    plumPuddingSpaceNode.invalidatePaint();
  } );

  return plumPuddingSpaceNode;
};

inherit( RSBaseScreenView, PlumPuddingAtomScreenView );
export default PlumPuddingAtomScreenView;