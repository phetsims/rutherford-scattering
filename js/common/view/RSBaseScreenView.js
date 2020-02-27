// Copyright 2016-2019, University of Colorado Boulder

/**
 * Base type for ScreenViews
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import ScreenView from '../../../../joist/js/ScreenView.js';
import Shape from '../../../../kite/js/Shape.js';
import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import PlayPauseButton from '../../../../scenery-phet/js/buttons/PlayPauseButton.js';
import ResetAllButton from '../../../../scenery-phet/js/buttons/ResetAllButton.js';
import StepForwardButton from '../../../../scenery-phet/js/buttons/StepForwardButton.js';
import LaserPointerNode from '../../../../scenery-phet/js/LaserPointerNode.js';
import PhetFont from '../../../../scenery-phet/js/PhetFont.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import rutherfordScatteringStrings from '../../rutherford-scattering-strings.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSA11yStrings from '../RSA11yStrings.js';
import RSColorProfile from '../RSColorProfile.js';
import RSConstants from '../RSConstants.js';
import BeamNode from './BeamNode.js';
import RSControlPanel from './RSControlPanel.js';
import RSScreenSummaryNode from './RSScreenSummaryNode.js';
import ScaleInfoNode from './ScaleInfoNode.js';
import TargetMaterialNode from './TargetMaterialNode.js';
import TinyBox from './TinyBox.js';

const alphaParticlesString = rutherfordScatteringStrings.alphaParticles;

// a11y strings
const toggleAlphaParticleString = RSA11yStrings.toggleAlphaParticle.value;
const alphaParticlesHelpTextString = RSA11yStrings.alphaParticlesHelpText.value;

const otherViewingStreamingOptionsString = RSA11yStrings.otherViewingStreamingOptions.value;
const otherOptionsDescriptionString = RSA11yStrings.otherOptionsDescription.value;

// constants
const GUN_ROTATION = -Math.PI / 2; // so the laser pointer points straight up

/**
 * @param {RSBaseModel} model
 * @param {string} scaleString
 * @param {function(RSBaseModel, Property.<boolean>, ModelViewTransform2, Bounds2 ): Node} createSpaceNode
 * @param {Object} [options]
 * @constructor
 */
function RSBaseScreenView( model, scaleString, createSpaceNode, options ) {

  options = merge( {
    includeElectronLegend: true, // should the particle legend include an entry for the electron?
    includePlumPuddingLegend: false, // should the particle legend include an entry for the plum pudding cloud?
    additionalControlPanels: null, // {Panel[]|null} additional control panels, added below the common panels

    // a11y
    screenSummaryContent: new RSScreenSummaryNode()
  }, options );

  ScreenView.call( this, options );
  const self = this;

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
    fill: RSColorProfile.panelLabelColorProperty,
    maxWidth: 210
  } );
  this.addChild( alphaParticlesText );

  // @protected, alpha particle beam
  this.beamNode = new BeamNode( model.gun.onProperty, {
    centerX: this.gunNode.centerX,
    bottom: this.gunNode.top,
    fill: RSColorProfile.atomBeamColorProperty
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
    centerX: self.targetMaterialNode.centerX,
    centerY: self.targetMaterialNode.centerY
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
    .lineTo( self.spaceNode.left, self.spaceNode.top )
    .moveTo( tinyBoxNode.centerX, tinyBoxNode.bottom )
    .lineTo( self.spaceNode.left, self.spaceNode.bottom ), {
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
    isPlayingProperty: model.runningProperty,
    listener: function() { model.manualStep(); },
    centerY: playPauseButton.centerY,
    centerX: this.scaleInfoNode.centerX + 25,
    radius: 15
  } );
  this.addChild( stepButton );

  // reset all button
  const resetAllButton = new ResetAllButton( {
    listener: function() {
      self.showAlphaTraceProperty.reset();
      model.reset();
    },
    right: this.layoutBounds.maxX - 48,
    bottom: this.layoutBounds.bottom - 20
  } );
  this.addChild( resetAllButton );

  // a11y
  const viewingStreamingOptionsNode = new Node( {
    tagName: 'div',
    labelTagName: 'h3',
    labelContent: otherViewingStreamingOptionsString,
    descriptionContent: otherOptionsDescriptionString
  } );
  this.addChild( viewingStreamingOptionsNode );

  this.pdomControlAreaNode.accessibleOrder = [ null, viewingStreamingOptionsNode, playPauseButton, stepButton, resetAllButton ];
}

rutherfordScattering.register( 'RSBaseScreenView', RSBaseScreenView );

export default inherit( ScreenView, RSBaseScreenView, {

  /**
   * Create a control panel - used by subtypes to generate a control panel from a set
   * of panels.
   *
   * @param  {array.<Panel>} panels
   * @returns {RSControlPanel}
   * @protected
   */
  createControlPanel: function( panels ) {
    return new RSControlPanel( panels, {
      top: this.spaceNode.top,
      left: this.spaceNode.right + RSConstants.PANEL_SPACE_MARGIN
    } );
  }
} );