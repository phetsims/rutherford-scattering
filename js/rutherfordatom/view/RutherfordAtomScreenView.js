// Copyright 2016-2021, University of Colorado Boulder

/**
 * View for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ColorProfile from '../../../../scenery-phet/js/ColorProfile.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import AlignGroup from '../../../../scenery/js/nodes/AlignGroup.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import colorProfileProperty from '../../../../scenery/js/util/colorProfileProperty.js';
import RectangularRadioButtonGroup from '../../../../sun/js/buttons/RectangularRadioButtonGroup.js';
import atomProjectorImage from '../../../images/AtomProjector_png.js';
import atomImage from '../../../images/Atom_png.js';
import RSColorProfile from '../../common/RSColorProfile.js';
import RSQueryParameters from '../../common/RSQueryParameters.js';
import AlphaParticlePropertiesPanel from '../../common/view/AlphaParticlePropertiesPanel.js';
import NuclearParticleLegendPanel from '../../common/view/NuclearParticleLegendPanel.js';
import ParticleLegendPanel from '../../common/view/ParticleLegendPanel.js';
import RSBaseScreenView from '../../common/view/RSBaseScreenView.js';
import ScaleInfoNode from '../../common/view/ScaleInfoNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import rutherfordScatteringStrings from '../../rutherfordScatteringStrings.js';
import AtomParticleLegendPanel from './AtomParticleLegendPanel.js';
import AtomPropertiesPanel from './AtomPropertiesPanel.js';
import AtomSpaceNode from './AtomSpaceNode.js';
import NucleusSpaceNode from './NucleusSpaceNode.js';
import RutherfordNucleusNode from './RutherfordNucleusNode.js';

// constants
const pattern0AtomicScaleString = rutherfordScatteringStrings.pattern[ '0atomicScale' ];
const pattern0NuclearScaleString = rutherfordScatteringStrings.pattern[ '0nuclearScale' ];
const switchScaleString = rutherfordScatteringStrings.a11y.switchScale;
const switchScaleDescriptionString = rutherfordScatteringStrings.a11y.switchScaleDescription;
const nuclearScaleViewString = rutherfordScatteringStrings.a11y.nuclearScaleView;
const atomicScaleViewString = rutherfordScatteringStrings.a11y.atomicScaleView;

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
      beam.fill = atomSceneVisible ? RSColorProfile.atomBeamColorProperty : RSColorProfile.nucleusBeamColorProperty;

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

    // create radio buttons for the scene - new buttons must be created
    // every time the color profile changes
    const nucleusIcon = RutherfordNucleusNode.RutherfordNucleusIcon( 20, 20 );
    const buttonOptions = { scale: 0.18 };

    /**
     * Create the RadioButonGroup that will act as the scene selection control in this sim.
     *
     * @param {Image} atomIconImage - the icon for the atomic scene, changes with color profile
     * @returns {RectangularRadioButtonGroup} - returns a RectangularRadioButtonGroup that must be disposed when profile changes
     */
    const createRadioButtons = atomIconImage => new RectangularRadioButtonGroup( model.sceneProperty, [
      { value: 'atom', node: new Image( atomIconImage, buttonOptions ), labelContent: atomicScaleViewString },
      { value: 'nucleus', node: nucleusIcon, labelContent: nuclearScaleViewString }
    ], {
      orientation: 'vertical',
      spacing: 15,
      left: this.targetMaterialNode.left,
      top: this.spaceNode.top,
      baseColor: RSColorProfile.panelColorProperty.value, // TODO: update this when requested
      deselectedStroke: RSColorProfile.panelBorderColorProperty.value, // TODO: update this when requested
      selectedStroke: RSColorProfile.radioButtonBorderColorProperty, // TODO: update this when requested
      buttonContentYMargin: 8,
      selectedLineWidth: 2,
      deselectedLineWidth: 1.5,
      maxWidth: this.targetMaterialNode.width,

      tagName: 'div',
      descriptionContent: switchScaleDescriptionString,
      labelTagName: 'h3',
      labelContent: switchScaleString,
      appendDescription: true
    } );

    // @private
    this.sceneRadioButtonGroup = createRadioButtons( atomImage );
    this.pdomControlAreaNode.addChild( this.sceneRadioButtonGroup );

    // if the background, panel or stroke colors change, draw a new button group
    // no need to unlink, screen view exists for life of sim
    colorProfileProperty.link( profileName => {

      // remove and dispose of the old button group
      this.pdomControlAreaNode.removeChild( this.sceneRadioButtonGroup );
      this.sceneRadioButtonGroup.dispose();

      // get the correct image for the 'atom' scene icon
      const iconImage = ( profileName === ColorProfile.PROJECTOR_COLOR_PROFILE_NAME ) ? atomProjectorImage : atomImage;

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
      errorText.text = StringUtils.fillIn( errorCountPattern, {
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