// Copyright 2016-2022, University of Colorado Boulder

/**
 * Base type for ScreenViews
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import PlayPauseButton from '../../../../scenery-phet/js/buttons/PlayPauseButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import StepForwardButton from '../../../../scenery-phet/js/buttons/StepForwardButton.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import { Node, Path, Text } from '../../../../scenery/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
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

class RSBaseScreenView extends ScreenView {

  /**
   * @param {RSBaseModel} model
   * @param {string} scaleString
   * @param {function(RSBaseModel, Property.<boolean>, ModelViewTransform2, Bounds2 ): Node} createSpaceNode
   * @param {Object} [options]
   */
  constructor( model, scaleString, createSpaceNode, options ) {

    options = merge( {
      includeElectronLegend: true, // should the particle legend include an entry for the electron?
      includePlumPuddingLegend: false, // should the particle legend include an entry for the plum pudding cloud?
      additionalControlPanels: null, // {Panel[]|null} additional control panels, added below the common panels

      // pdom
      screenSummaryContent: new RSScreenSummaryNode()
    }, options );

    super( options );
    // properties
    this.showAlphaTraceProperty = new Property( RSConstants.DEFAULT_SHOW_TRACES );

    // @protected for layout in subtypes, alpha particle gun
    this.gunNode = new LaserPointerNode( model.gun.onProperty, {
      left: this.layoutBounds.left + 75,
      top: this.layoutBounds.centerY + 50,
      bodySize: new Dimension2( 75, 68 ),
      nozzleSize: new Dimension2( 20, 60 ),
      topColor: 'rgb(211, 140, 70)',
      highlightColor: 'rgb(229, 186, 144)',
      bottomColor: 'rgb(106, 70, 35)',
      buttonColor: 'rgb(0, 203, 230)',
      rotation: GUN_ROTATION, // pointing up
      buttonRotation: -GUN_ROTATION, // so button lighting is correct
      buttonAccessibleName: toggleAlphaParticleString,
      buttonDescriptionContent: alphaParticlesHelpTextString
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

    // @protected, alpha particle beam
    this.beamNode = new BeamNode( model.gun.onProperty, {
      centerX: this.gunNode.centerX,
      bottom: this.gunNode.top,
      fill: RSColors.atomBeamColorProperty
    } );
    this.addChild( this.beamNode );

    // @protected for layout in subtypes, alpha particle source target
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

    // @protected for layout in subtypes
    this.spaceNode = createSpaceNode( model, this.showAlphaTraceProperty, modelViewTransform, spaceNodeBounds );
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

    // @protected, visibility can be manipulated by subtypes - scale info
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
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: otherViewingStreamingOptionsString,
      descriptionContent: otherOptionsDescriptionString
    } );
    this.addChild( viewingStreamingOptionsNode );

    this.pdomControlAreaNode.pdomOrder = [ null, viewingStreamingOptionsNode, playPauseButton, stepButton, resetAllButton ];
  }

  /**
   * Create a control panel - used by subtypes to generate a control panel from a set
   * of panels.
   *
   * @param  {array.<Panel>} panels
   * @returns {RSControlPanel}
   * @protected
   */
  createControlPanel( panels ) {
    return new RSControlPanel( panels, {
      top: this.spaceNode.top,
      left: this.spaceNode.right + RSConstants.PANEL_SPACE_MARGIN
    } );
  }
}

rutherfordScattering.register( 'RSBaseScreenView', RSBaseScreenView );
export default RSBaseScreenView;