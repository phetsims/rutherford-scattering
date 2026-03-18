// Copyright 2016-2026, University of Colorado Boulder

/**
 * Builds the main Plum Pudding sim screen
 *
 * @author Dave Schmitz (Schmitzware)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import AlphaParticlePropertiesPanel from '../../common/view/AlphaParticlePropertiesPanel.js';
import NuclearParticleLegendPanel from '../../common/view/NuclearParticleLegendPanel.js';
import RSBaseScreenView from '../../common/view/RSBaseScreenView.js';
import RSScreenSummaryContent from '../../common/view/RSScreenSummaryContent.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringFluent from '../../RutherfordScatteringFluent.js';
import PlumPuddingAtomModel from '../model/PlumPuddingAtomModel.js';
import PlumPuddingSpaceNode from './PlumPuddingSpaceNode.js';

const atomicScalePatternStringProperty = RutherfordScatteringFluent.pattern[ '0atomicScaleStringProperty' ];

class PlumPuddingAtomScreenView extends RSBaseScreenView {

  public constructor( model: PlumPuddingAtomModel ) {

    const atomicScaleStringProperty = new DerivedStringProperty( [ atomicScalePatternStringProperty ], ( pattern: string ) => {
      return StringUtils.format( pattern, '3.0 x 10<sup>-10</sup>' );
    } );

    super( model, atomicScaleStringProperty, {
      includePlumPuddingLegend: true,
      screenSummaryContent: new RSScreenSummaryContent( 'plumPuddingAtom' )
    } );

    // create the new control panel
    const legendPanelContent = NuclearParticleLegendPanel.createPanelContent( {
      resize: false,
      includeElectron: true,
      includePlumPudding: true
    } );

    const particlePropertiesPanel = new AlphaParticlePropertiesPanel(
      model.alphaParticleEnergyProperty, this.showAlphaTraceProperty, { resize: false } );
    const legendPanel = new NuclearParticleLegendPanel( legendPanelContent, { resize: false } );

    const panels = [
      legendPanel,
      particlePropertiesPanel
    ];
    const controlPanels = this.createControlPanelVBox( panels );
    this.addChild( controlPanels );

    this.setPlayAreaPDOMOrder( [ controlPanels ] );
    this.setControlAreaPDOMOrder();
  }


  /**
   * Create the node in which atoms and alpha particles are rendered.
   */
  public override createSpaceNode(
    model: PlumPuddingAtomModel,
    showAlphaTraceProperty: Property<boolean>,
    modelViewTransform: ModelViewTransform2,
    canvasBounds: Bounds2
  ): Node {
    const plumPuddingSpaceNode = new PlumPuddingSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );

    // redraw the space node on model step
    model.addStepListener( () => {
      plumPuddingSpaceNode.invalidatePaint();
    } );

    return plumPuddingSpaceNode;
  }
}

rutherfordScattering.register( 'PlumPuddingAtomScreenView', PlumPuddingAtomScreenView );
export default PlumPuddingAtomScreenView;