// Copyright 2016-2025, University of Colorado Boulder

/**
 * Base type for ScreenViews
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ScreenView, { ScreenViewOptions } from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import optionize from '../../../../phet-core/js/optionize.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import PlayPauseButton from '../../../../scenery-phet/js/buttons/PlayPauseButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import StepForwardButton from '../../../../scenery-phet/js/buttons/StepForwardButton.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel from '../../../../sun/js/Panel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import RSBaseModel from '../model/RSBaseModel.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';
import BeamNode from './BeamNode.js';
import RSControlPanel from './RSControlPanel.js';
import RSScreenSummaryNode from './RSScreenSummaryNode.js';
import ScaleInfoNode from './ScaleInfoNode.js';
import TargetMaterialNode from './TargetMaterialNode.js';
import TinyBox from './TinyBox.js';

// constants
const alphaParticlesString = RutherfordScatteringStrings.alphaParticles;
const toggleAlphaParticleString = RutherfordScatteringStrings.a11y.toggleAlphaParticle;
const alphaParticlesHelpTextString = RutherfordScatteringStrings.a11y.alphaParticlesHelpText;

const otherViewingStreamingOptionsString = RutherfordScatteringStrings.a11y.otherViewingStreamingOptions;
const otherOptionsDescriptionString = RutherfordScatteringStrings.a11y.otherOptionsDescription;

const GUN_ROTATION = -Math.PI / 2; // so the laser pointer points straight up

type SelfOptions = {
  includeElectronLegend?: boolean;
  includePlumPuddingLegend?: boolean;
  additionalControlPanels?: Panel[] | null;
};

type RSBaseScreenViewOptions = SelfOptions & ScreenViewOptions;

type CreateSpaceNode = (
  model: RSBaseModel,
  showAlphaTraceProperty: Property<boolean>,
  modelViewTransform: ModelViewTransform2,
  spaceNodeBounds: Bounds2
) => Node;

abstract class RSBaseScreenView extends ScreenView {

  public readonly showAlphaTraceProperty: Property<boolean>;
  
  // Alpha particle gun for layout in subtypes
  protected readonly gunNode: LaserPointerNode;
  
  // Alpha particle beam
  protected readonly beamNode: BeamNode;
  
  // Alpha particle source target for layout in subtypes
  protected readonly targetMaterialNode: TargetMaterialNode;
  
  // Space node for layout in subtypes
  protected readonly spaceNode: Node;
  
  // Scale info, visibility can be manipulated by subtypes
  protected readonly scaleInfoNode: ScaleInfoNode;

  /**
   * @param model
   * @param scaleString
   * @param createSpaceNode
   */
  public constructor( model: RSBaseModel, scaleString: string, providedOptions?: RSBaseScreenViewOptions ) {

    const options = optionize<RSBaseScreenViewOptions, SelfOptions, ScreenViewOptions>()( {
      includeElectronLegend: true, // should the particle legend include an entry for the electron?
      includePlumPuddingLegend: false, // should the particle legend include an entry for the plum pudding cloud?
      additionalControlPanels: null, // {Panel[]|null} additional control panels, added below the common panels

      // pdom
      screenSummaryContent: new RSScreenSummaryNode()
    }, providedOptions );

    super( options );
    
    this.showAlphaTraceProperty = new Property( RSConstants.DEFAULT_SHOW_TRACES );

    this.gunNode = new LaserPointerNode( model.gun.onProperty, {
      left: this.layoutBounds.left + 75,
      top: this.layoutBounds.centerY + 50,
      bodySize: new Dimension2( 75, 68 ),
      nozzleSize: new Dimension2( 20, 60 ),
      topColor: 'rgb(211, 140, 70)',
      highlightColor: 'rgb(229, 186, 144)',
      bottomColor: 'rgb(106, 70, 35)',
      buttonOptions: {
        baseColor: 'rgb(0, 203, 230)',
        rotation: -GUN_ROTATION // so button lighting is correct
      },
      rotation: GUN_ROTATION, // pointing up
      accessibleName: toggleAlphaParticleString,
      accessibleHelpText: alphaParticlesHelpTextString
    } );
    this.addChild( this.gunNode );

    const alphaParticlesText = new Text( alphaParticlesString, {
      centerX: this.gunNode.centerX,
      top: this.gunNode.bottom + 15,
      font: new PhetFont( 15 ),
      fill: RSColors.panelLabelColorProperty,
      maxWidth: 210
    } );
    this.addChild( alphaParticlesText );

    this.beamNode = new BeamNode( model.gun.onProperty, {
      centerX: this.gunNode.centerX,
      bottom: this.gunNode.top,
      fill: RSColors.atomBeamColorProperty
    } );
    this.addChild( this.beamNode );

    this.targetMaterialNode = new TargetMaterialNode( {
      centerX: this.beamNode.centerX,
      bottom: this.beamNode.top
    } );
    this.addChild( this.targetMaterialNode );

    // tiny box that indicates what will be zoomed
    const tinyBoxNode = new TinyBox( {
      centerX: this.targetMaterialNode.centerX,
      centerY: this.targetMaterialNode.centerY
    } );
    this.addChild( tinyBoxNode );

    // atom animation space
    const spaceNodeX = this.targetMaterialNode.right + RSConstants.TARGET_SPACE_MARGIN - RSConstants.SPACE_BUFFER;
    const spaceNodeY = RSConstants.PANEL_TOP_MARGIN - RSConstants.SPACE_BUFFER;
    const spaceNodeBounds = new Bounds2( spaceNodeX, spaceNodeY,
      spaceNodeX + RSConstants.SPACE_NODE_WIDTH,
      spaceNodeY + RSConstants.SPACE_NODE_HEIGHT );
    const modelViewTransform = ModelViewTransform2.createRectangleInvertedYMapping( model.bounds, spaceNodeBounds );

    this.spaceNode = this.createSpaceNode( model, this.showAlphaTraceProperty, modelViewTransform, spaceNodeBounds );
    this.addChild( this.spaceNode );

    // dashed lines that connect the tiny box and space
    const dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.centerX, tinyBoxNode.top )
      .lineTo( this.spaceNode.left, this.spaceNode.top )
      .moveTo( tinyBoxNode.centerX, tinyBoxNode.bottom )
      .lineTo( this.spaceNode.left, this.spaceNode.bottom ), {
      stroke: 'grey',
      lineDash: [ 5, 5 ]
    } );
    this.addChild( dashedLines );

    this.scaleInfoNode = new ScaleInfoNode( scaleString, this.spaceNode.getWidth(), {
      centerX: this.spaceNode.centerX,
      top: this.spaceNode.bottom + 10
    } );
    this.addChild( this.scaleInfoNode );

    // play/pause button
    const playPauseButton = new PlayPauseButton( model.runningProperty, {
      bottom: this.scaleInfoNode.bottom + 60,
      centerX: this.scaleInfoNode.centerX - 25,
      radius: 23
    } );
    this.addChild( playPauseButton );

    // step button to manually step the animation.
    const stepButton = new StepForwardButton( {
      enabledProperty: DerivedProperty.not( model.runningProperty ),
      listener: () => { model.manualStep(); },
      centerY: playPauseButton.centerY,
      centerX: this.scaleInfoNode.centerX + 25,
      radius: 15
    } );
    this.addChild( stepButton );

    // reset all button
    const resetAllButton = new ResetAllButton( {
      listener: () => {
        this.showAlphaTraceProperty.reset();
        model.reset();
      },
      right: this.layoutBounds.maxX - 48,
      bottom: this.layoutBounds.bottom - 20
    } );
    this.addChild( resetAllButton );

    // pdom
    const viewingStreamingOptionsNode = new Node( {
      accessibleHeading: otherViewingStreamingOptionsString,
      descriptionContent: otherOptionsDescriptionString
    } );
    this.addChild( viewingStreamingOptionsNode );

    this.pdomControlAreaNode.pdomOrder = [ null, viewingStreamingOptionsNode, playPauseButton, stepButton, resetAllButton ];
  }

  /**
   * Create a control panel - used by subtypes to generate a control panel from a set
   * of panels.
   */
  protected createControlPanel( panels: Array<Panel> ): RSControlPanel {
    return new RSControlPanel( panels, {
      top: this.spaceNode.top,
      left: this.spaceNode.right + RSConstants.PANEL_SPACE_MARGIN
    } );
  }

  protected abstract createSpaceNode(
    model: RSBaseModel,
    showAlphaTraceProperty: Property<boolean>,
    modelViewTransform: ModelViewTransform2,
    canvasBounds: Bounds2
  ): Node;
}

rutherfordScattering.register( 'RSBaseScreenView', RSBaseScreenView );
export default RSBaseScreenView;