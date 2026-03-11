// Copyright 2016-2026, University of Colorado Boulder

/**
 * View for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Marla Schulz (PhET Interactive Simulations)
 */

import DerivedStringProperty from '../../../../axon/js/DerivedStringProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import SceneryConstants from '../../../../scenery/js/SceneryConstants.js';
import colorProfileProperty from '../../../../scenery/js/util/colorProfileProperty.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import ToggleNode from '../../../../sun/js/ToggleNode.js';
import atom_png from '../../../images/atom_png.js';
import atomProjector_png from '../../../images/atomProjector_png.js';
import RSColors from '../../common/RSColors.js';
import RSConstants from '../../common/RSConstants.js';
import RSQueryParameters from '../../common/RSQueryParameters.js';
import AlphaParticlePropertiesPanel from '../../common/view/AlphaParticlePropertiesPanel.js';
import NuclearParticleLegendPanel from '../../common/view/NuclearParticleLegendPanel.js';
import RSBaseScreenView from '../../common/view/RSBaseScreenView.js';
import RSScreenSummaryContent from '../../common/view/RSScreenSummaryContent.js';
import ScaleInfoNode from '../../common/view/ScaleInfoNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringFluent from '../../RutherfordScatteringFluent.js';
import RutherfordAtomModel from '../model/RutherfordAtomModel.js';
import AtomParticleLegendPanel from './AtomParticleLegendPanel.js';
import AtomPropertiesPanel, { AtomPropertiesPanelContent } from './AtomPropertiesPanel.js';
import AtomSpaceNode from './AtomSpaceNode.js';
import NucleusSpaceNode from './NucleusSpaceNode.js';
import RutherfordNucleusNode from './RutherfordNucleusNode.js';

// constants
const atomicScalePatternStringProperty = RutherfordScatteringFluent.pattern[ '0atomicScaleStringProperty' ];
const nuclearScalePatternStringProperty = RutherfordScatteringFluent.pattern[ '0nuclearScaleStringProperty' ];
const switchScaleStringProperty = RutherfordScatteringFluent.a11y.switchScaleStringProperty;
const switchScaleDescriptionStringProperty = RutherfordScatteringFluent.a11y.switchScaleDescriptionStringProperty;
const nuclearScaleViewStringProperty = RutherfordScatteringFluent.a11y.nuclearScaleViewStringProperty;
const atomicScaleViewStringProperty = RutherfordScatteringFluent.a11y.atomicScaleViewStringProperty;

class RutherfordAtomScreenView extends RSBaseScreenView {

  private sceneRadioButtonGroup: RectangularRadioButtonGroup<string>;

  public constructor( model: RutherfordAtomModel ) {

    const nucleusScaleStringProperty = new DerivedStringProperty( [ nuclearScalePatternStringProperty ], ( pattern: string ) => {
      return StringUtils.format( pattern, '1.5 x 10<sup>-13</sup>' );
    } );
    const atomicScaleStringProperty = new DerivedStringProperty( [ atomicScalePatternStringProperty ], ( pattern: string ) => {
      return StringUtils.format( pattern, '6.0 x 10<sup>-10</sup>' );
    } );

    super( model, nucleusScaleStringProperty, {
      includeElectronLegend: false,
      screenSummaryContent: new RSScreenSummaryContent( 'rutherfordAtom' )
    } );

    // scale info for the 'atom' scene, only visible when atom scene is selected
    const atomicScaleInfoNode = new ScaleInfoNode( atomicScaleStringProperty, this.spaceNode.getWidth(), {
      center: this.scaleInfoNode.center
    } );
    this.addChild( atomicScaleInfoNode );

    // create the legend and control panels for the atom scene
    const panelOptions = { resize: false };
    const atomLegendContent = AtomParticleLegendPanel.createPanelContent( panelOptions );
    const atomLegendPanel = new AtomParticleLegendPanel( atomLegendContent, panelOptions );

    const atomParticlePropertiesPanel = new AlphaParticlePropertiesPanel(
      model.alphaParticleEnergyProperty, this.showAlphaTraceProperty, panelOptions );

    const atomPropertiesContent = AtomPropertiesPanel.createPanelContent( model, panelOptions );
    const atomPropertiesPanel = new AtomPropertiesPanel( atomPropertiesContent, panelOptions );
    const atomControlPanels = this.createControlPanelVBox( [ atomLegendPanel, atomParticlePropertiesPanel, atomPropertiesPanel ] );
    this.addChild( atomControlPanels );


    // create the legend and control panels for the nucleus scene
    const nuclearLegendContent = NuclearParticleLegendPanel.createPanelContent( {
      resize: false,
      includeElectron: false,
      includePlumPudding: false
    } );
    const nucleusLegendPanel = new NuclearParticleLegendPanel( nuclearLegendContent, panelOptions );
    const nucleusParticlePropertiesPanel = new AlphaParticlePropertiesPanel(
      model.alphaParticleEnergyProperty, this.showAlphaTraceProperty, { resize: false } );
    const nucleusAtomPropertiesContent: AtomPropertiesPanelContent = AtomPropertiesPanel.createPanelContent( model, { resize: false } );
    const nucleusAtomPropertiesPanel = new AtomPropertiesPanel( nucleusAtomPropertiesContent, panelOptions );
    const nucleusControlPanels = this.createControlPanelVBox( [ nucleusLegendPanel, nucleusParticlePropertiesPanel, nucleusAtomPropertiesPanel ] );
    this.addChild( nucleusControlPanels );

    // for the 'Atom' scene, the beam should be semi-transparent, the scale indicator
    // should be updated, and the control/legend panels need to change
    // no need to unlink, screen view exists for life of sim
    model.sceneProperty.link( scene => {
      const beam = this.beamNode;
      const atomSceneVisible = scene === 'atom';

      // update visibility of scene specific scale info
      this.scaleInfoNode.visible = !atomSceneVisible;
      atomicScaleInfoNode.visible = atomSceneVisible;

      // recenter the gun beam and set new fill
      beam.centerX = this.gunNode.centerX;
      beam.fill = atomSceneVisible ? RSColors.atomBeamColorProperty : RSColors.nucleusBeamColorProperty;

      // set the visibility of the control panels
      atomControlPanels.visible = atomSceneVisible;
      nucleusControlPanels.visible = !atomSceneVisible;
    } );

    /**
     * Create the RadioButonGroup that will act as the scene selection control in this sim. New buttons must be
     * created every time the color profile changes.
     * @param colorProfileProperty - the color profile property, used to determine which image to use for the 'atom' scene button
     */
    const createRadioButtons = ( colorProfileProperty: Property<string> ): RectangularRadioButtonGroup<string> => new RectangularRadioButtonGroup( model.sceneProperty, [
      {
        value: 'atom',
        createNode: () => new ToggleNode( colorProfileProperty, [ {

          value: SceneryConstants.PROJECTOR_COLOR_PROFILE,
          createNode: () => new Image( atomProjector_png, { scale: 0.18 } )
        }, {
          value: SceneryConstants.DEFAULT_COLOR_PROFILE,
          createNode: () => new Image( atom_png, { scale: 0.18 } )
        } ] ),
        options: {
          accessibleName: atomicScaleViewStringProperty
        }
      },
      {
        value: 'nucleus',
        createNode: () => RutherfordNucleusNode.RutherfordNucleusIcon( 20, 20 ),
        options: {
          accessibleName: nuclearScaleViewStringProperty
        }
      }
    ], {
      orientation: 'vertical',
      spacing: 15,
      left: this.targetMaterialNode.left,
      top: this.spaceNode.top,
      radioButtonOptions: {
        baseColor: RSColors.panelColorProperty,
        yMargin: 8,
        buttonAppearanceStrategyOptions: {
          deselectedStroke: RSColors.panelBorderColorProperty,
          selectedStroke: RSColors.radioButtonBorderColorProperty,
          selectedLineWidth: 2,
          deselectedLineWidth: 1.5
        }
      },
      maxWidth: this.targetMaterialNode.width,

      accessibleName: switchScaleStringProperty,

      accessibleHelpText: switchScaleDescriptionStringProperty
    } );

    this.sceneRadioButtonGroup = createRadioButtons( colorProfileProperty );
    this.addChild( this.sceneRadioButtonGroup );

    this.setPlayAreaPDOMOrder( [ atomControlPanels, nucleusControlPanels ] );
    this.setControlAreaPDOMOrder( this.sceneRadioButtonGroup );
  }


  /**
   * Create the node in which atoms and alpha particles are rendered.  Node contains both
   * scene representations, and visibility is controlled from this node.
   */
  public override createSpaceNode(
    model: RutherfordAtomModel,
    showAlphaTraceProperty: Property<boolean>,
    modelViewTransform: ModelViewTransform2,
    canvasBounds: Bounds2
  ): Node {

    // create the single nucleus representation scene
    const nucleusSpaceNode = new NucleusSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );

    // create the multiple atom representation scene
    const atomSpaceNode = new AtomSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );

    if ( RSQueryParameters.showErrorCount ) {
      // show the number of particles that were removed from the space in error
      const errorCountPattern = 'Error count: {{numRemoved}}';
      const errorText = new Text( '', {
        font: new PhetFont( 18 ),
        fill: 'red',
        leftBottom: atomSpaceNode.leftTop,
        maxWidth: RSConstants.TEXT_MAX_WIDTH
      } );
      atomSpaceNode.addChild( errorText );

      let atomsRemoved = 0;
      model.atomSpace.particleRemovedFromAtomEmitter.addListener( particle => {
        atomsRemoved += 1;
        errorText.string = StringUtils.fillIn( errorCountPattern, {
          numRemoved: atomsRemoved
        } );
      } );
    }

    // update view on model step
    model.addStepListener( () => {
      nucleusSpaceNode.invalidatePaint();
      atomSpaceNode.invalidatePaint();
    } );

    // update which scene is visible and remove all particles
    // no need to unlink, screen view exists for life of sim
    model.sceneProperty.link( scene => {
      const nucleusVisible = scene === 'nucleus';

      // set visibility of model space
      model.nucleusSpace.isVisible = nucleusVisible;
      model.atomSpace.isVisible = !nucleusVisible;

      // set node visibility
      nucleusSpaceNode.visible = nucleusVisible;
      atomSpaceNode.visible = !nucleusVisible;

      model.removeAllParticles();
    } );

    return new Node( {
      children: [ nucleusSpaceNode, atomSpaceNode ]
    } );
  }
}

rutherfordScattering.register( 'RutherfordAtomScreenView', RutherfordAtomScreenView );
export default RutherfordAtomScreenView;