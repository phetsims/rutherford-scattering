// Copyright 2016-2023, University of Colorado Boulder

/**
 * View for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { AlignGroup, colorProfileProperty, Image, Node, SceneryConstants, Text } from '../../../../scenery/js/imports.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import atom_png from '../../../images/atom_png.js';
import atomProjector_png from '../../../images/atomProjector_png.js';
import RSColors from '../../common/RSColors.js';
import RSQueryParameters from '../../common/RSQueryParameters.js';
import AlphaParticlePropertiesPanel from '../../common/view/AlphaParticlePropertiesPanel.js';
import NuclearParticleLegendPanel from '../../common/view/NuclearParticleLegendPanel.js';
import ParticleLegendPanel from '../../common/view/ParticleLegendPanel.js';
import RSBaseScreenView from '../../common/view/RSBaseScreenView.js';
import ScaleInfoNode from '../../common/view/ScaleInfoNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import AtomParticleLegendPanel from './AtomParticleLegendPanel.js';
import AtomPropertiesPanel from './AtomPropertiesPanel.js';
import AtomSpaceNode from './AtomSpaceNode.js';
import NucleusSpaceNode from './NucleusSpaceNode.js';
import RutherfordNucleusNode from './RutherfordNucleusNode.js';

// constants
const pattern0AtomicScaleString = RutherfordScatteringStrings.pattern[ '0atomicScale' ];
const pattern0NuclearScaleString = RutherfordScatteringStrings.pattern[ '0nuclearScale' ];
const switchScaleString = RutherfordScatteringStrings.a11y.switchScale;
const switchScaleDescriptionString = RutherfordScatteringStrings.a11y.switchScaleDescription;
const nuclearScaleViewString = RutherfordScatteringStrings.a11y.nuclearScaleView;
const atomicScaleViewString = RutherfordScatteringStrings.a11y.atomicScaleView;

class RutherfordAtomScreenView extends RSBaseScreenView {

  /**
   * @param {RutherfordAtomModel} model
   */
  constructor( model ) {

    const nucleusScaleString = StringUtils.format( pattern0NuclearScaleString, '1.5 x 10<sup>-13</sup>' );
    const atomicScaleString = StringUtils.format( pattern0AtomicScaleString, '6.0 x 10<sup>-10</sup>' );

    super( model, nucleusScaleString, createSpaceNode, {
      includeElectronLegend: false
    } );

    // scale info for the 'atom' scene, only visible when atom scene is selected
    const atomicScaleInfoNode = new ScaleInfoNode( atomicScaleString, this.spaceNode.getWidth(), {
      center: this.scaleInfoNode.center
    } );
    this.addChild( atomicScaleInfoNode );

    // create the panels of the control panel on the right
    const createPanels = () => {

      let legendContent;
      const atomSceneVisible = model.sceneProperty.value === 'atom';

      // create content for the control panels
      const atomLegendContent = AtomParticleLegendPanel.createPanelContent( { resize: false } );
      const nuclearLegendContent = NuclearParticleLegendPanel.createPanelContent( {
        resize: false,
        includeElectron: false,
        includePlumPudding: false
      } );
      const particlePropertiesContent = AlphaParticlePropertiesPanel.createPanelContent( model.energyInteractionProperty, model.alphaParticleEnergyProperty, this.showAlphaTraceProperty, { resize: false } );
      const atomPropertiesContent = AtomPropertiesPanel.createPanelContent( model, { resize: false } );

      // make sure that content for all panels are aligned and the legend content is aligned to the left
      // this content does not include title
      const contentAlignGroup = new AlignGroup( { matchVertical: false } );
      const atomContentBox = contentAlignGroup.createBox( atomLegendContent, { xAlign: ParticleLegendPanel.LEGEND_CONTENT_ALIGN } );
      const nuclearContentBox = contentAlignGroup.createBox( nuclearLegendContent, { xAlign: ParticleLegendPanel.LEGEND_CONTENT_ALIGN } );
      const particlePropertiesContentBox = contentAlignGroup.createBox( particlePropertiesContent );
      const atromPropertiesContentBox = contentAlignGroup.createBox( atomPropertiesContent );

      // create content for the legend panels
      if ( atomSceneVisible ) {
        legendContent = atomContentBox;
      }
      else {
        legendContent = nuclearContentBox;
      }

      // create the panels
      const panelOptions = { resize: false };
      const legendPanel = atomSceneVisible ? new AtomParticleLegendPanel( legendContent, panelOptions ) : new NuclearParticleLegendPanel( legendContent, panelOptions );
      const particlePropertiesPanel = new AlphaParticlePropertiesPanel( particlePropertiesContentBox, panelOptions );
      const atomPropertiesPanel = new AtomPropertiesPanel( atromPropertiesContentBox, panelOptions );

      return [
        legendPanel,
        particlePropertiesPanel,
        atomPropertiesPanel
      ];
    };

    // when various panels are added/removed due to changing color profile or scene, reset the accessible order
    const restorePDOMOrder = () => {
      this.pdomPlayAreaNode.pdomOrder = [ this.gunNode ];
      this.pdomControlAreaNode.pdomOrder = _.uniq( this.pdomControlAreaNode.pdomOrder.concat( [
        this.controlPanel,
        this.sceneRadioButtonGroup
      ].filter( _.identity ) ) );
    };

    // {Node} control panel is created below by sceneProperty listener, to correspond to scene
    let controlPanel = null;

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

      // dispose and remove the old control panel
      if ( controlPanel ) {
        this.removeChild( controlPanel );
        controlPanel.dispose();
      }

      // create the new control panel
      const panels = createPanels();
      controlPanel = this.createControlPanel( panels );
      this.addChild( controlPanel );

      restorePDOMOrder();
    } );

    /**
     * Create the RadioButonGroup that will act as the scene selection control in this sim. New buttons must be
     * created every time the color profile changes.
     *
     * @param {Image} atomIconImage - the icon for the atomic scene, changes with color profile
     * @returns {RectangularRadioButtonGroup} - returns a RectangularRadioButtonGroup that must be disposed when profile changes
     */
    const createRadioButtons = atomIconImage => new RectangularRadioButtonGroup( model.sceneProperty, [
      { value: 'atom', createNode: () => new Image( atomIconImage, { scale: 0.18 } ), labelContent: atomicScaleViewString },
      { value: 'nucleus', createNode: () => RutherfordNucleusNode.RutherfordNucleusIcon( 20, 20 ), labelContent: nuclearScaleViewString }
    ], {
      orientation: 'vertical',
      spacing: 15,
      left: this.targetMaterialNode.left,
      top: this.spaceNode.top,
      radioButtonOptions: {
        baseColor: RSColors.panelColorProperty.value, // TODO: update this when requested
        yMargin: 8,
        buttonAppearanceStrategyOptions: {
          deselectedStroke: RSColors.panelBorderColorProperty.value, // TODO: update this when requested
          selectedStroke: RSColors.radioButtonBorderColorProperty, // TODO: update this when requested
          selectedLineWidth: 2,
          deselectedLineWidth: 1.5
        }
      },
      maxWidth: this.targetMaterialNode.width,

      tagName: 'div',
      descriptionContent: switchScaleDescriptionString,
      labelTagName: 'h3',
      labelContent: switchScaleString,
      appendDescription: true
    } );

    // @private
    this.sceneRadioButtonGroup = createRadioButtons( atom_png );
    this.pdomControlAreaNode.addChild( this.sceneRadioButtonGroup );

    // if the background, panel or stroke colors change, draw a new button group
    // no need to unlink, screen view exists for life of sim
    colorProfileProperty.link( profileName => {

      // remove and dispose of the old button group
      this.pdomControlAreaNode.removeChild( this.sceneRadioButtonGroup );
      this.sceneRadioButtonGroup.dispose();

      // get the correct image for the 'atom' scene icon
      const iconImage = ( profileName === SceneryConstants.PROJECTOR_COLOR_PROFILE ) ? atomProjector_png : atom_png;

      // create the new radio button group
      const newButtonGroup = createRadioButtons( iconImage );
      this.sceneRadioButtonGroup = newButtonGroup;
      this.pdomControlAreaNode.addChild( newButtonGroup );

      // add laser, all control panels, and scene buttons to pdomOrder, must be set after
      // creating new radio buttons
      restorePDOMOrder();
    } );

    restorePDOMOrder();
  }
}

/**
 * Create the node in which atoms and alpha particles are rendered.  Node contains both
 * scene representations, and visibility is controlled from this node.
 *
 * @param {RutherfordAtomModel} model
 * @param {Property.<boolean>} showAlphaTraceProperty
 * @param {ModelViewTransform2} modelViewTransform
 * @param {Bounds2} canvasBounds
 * @returns {Node}
 */
const createSpaceNode = ( model, showAlphaTraceProperty, modelViewTransform, canvasBounds ) => {

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
      leftBottom: atomSpaceNode.leftTop
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
  model.addStepListener( dt => {
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
};

rutherfordScattering.register( 'RutherfordAtomScreenView', RutherfordAtomScreenView );
export default RutherfordAtomScreenView;