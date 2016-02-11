// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var BeamNode = require( 'RUTHERFORD_SCATTERING/common/view/BeamNode' );
  var TargetMaterialNode = require( 'RUTHERFORD_SCATTERING/common/view/TargetMaterialNode' );
  var TinyBox = require( 'RUTHERFORD_SCATTERING/common/view/TinyBox' );
  var ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var PlumPuddingAtomModel = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/model/PlumPuddingAtomModel' );
  var Path = require( 'SCENERY/nodes/Path' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var Shape = require( 'KITE/Shape' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var PANEL_SPACE_MARGIN = 20;
  var PANEL_TOP_MARGIN = 20;
  var PANEL_INNER_MARGIN = 10;

  /**
   * @param {AtomModel} model
   * @constructor
   */
  function PlumPuddingAtomScreenView( model ) {

    ScreenView.call( this );

    // Smitty: rearrage layout - Gun top as space centerX?

    // Alpha particle source target
    var targetMaterialNode = new TargetMaterialNode( {
      left: this.layoutBounds.left + 10,
      top: this.layoutBounds.top + 300
    } );
    this.addChild( targetMaterialNode );

     // Tiny box that indicates what will be zoomed
    var tinyBoxNode = new TinyBox();
    tinyBoxNode.left = targetMaterialNode.centerX - tinyBoxNode.width/2.0;
    tinyBoxNode.top = targetMaterialNode.centerY - tinyBoxNode.height/2.0;
    this.addChild( tinyBoxNode );

    // Alpha particle beam
    var beamNode = new BeamNode( model.gun.onProperty, {
      centerX: tinyBoxNode.centerX,
      top: targetMaterialNode.bottom
    } );
    this.addChild( beamNode );

    // Alpha particle gun
    var gunNode = new LaserPointerNode( model.gun.onProperty, {
      rotation: -Math.PI / 2, // pointing up
      centerX: targetMaterialNode.centerX,
      top: beamNode.bottom
    } );
    this.addChild( gunNode );

    // Atom animation space
    // Smitty: dynamic size based on layoutBounds?
    var spaceNodeX = targetMaterialNode.right + 50;
    var spaceNodeY = 15;
    var particleSpaceNode = new ParticleSpaceNode( model, {
      canvasBounds: new Bounds2( spaceNodeX, spaceNodeY, spaceNodeX + RSConstants.SPACE_NODE_WIDTH, spaceNodeY + RSConstants.SPACE_NODE_HEIGHT )
    } );
    this.addChild( particleSpaceNode );

    // Dashed lines that connect the tiny box and space
    var dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( particleSpaceNode.left, particleSpaceNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( particleSpaceNode.left, particleSpaceNode.bottom ), {
      stroke: 'white',
      lineDash: [ 5, 5 ]
    } );
    this.addChild( dashedLines );

    // Create the particles legend control panel
    var particleLegendPanel = new ParticleLegendPanel({
      minWidth: 255,
      leftTop: new Vector2( particleSpaceNode.right + PANEL_SPACE_MARGIN, this.layoutBounds.top + PANEL_TOP_MARGIN ),
      fill: RSConstants.PANEL_COLOR,
      stroke: RSConstants.PANEL_STROKE,
      lineWidth: RSConstants.PANEL_LINE_WIDTH,
      titleFont: RSConstants.PANEL_TITLE_FONT,
      propertyFont: RSConstants.PANEL_PROPERTY_FONT,
      rresize: false
    } );
    this.addChild( particleLegendPanel );

    // Create the alpha particle properties control panel
    var alphaParticlePropertiesPanel = new AlphaParticlePropertiesPanel( model, {
      minWidth: 255,
      leftTop: new Vector2( particleSpaceNode.right + PANEL_SPACE_MARGIN, particleLegendPanel.bottom + PANEL_INNER_MARGIN ),
      fill: RSConstants.PANEL_COLOR,
      stroke: RSConstants.PANEL_STROKE,
      lineWidth: RSConstants.PANEL_LINE_WIDTH,
      titleFont: RSConstants.PANEL_TITLE_FONT,
      propertyFont: RSConstants.PANEL_PROPERTY_FONT,
      sliderTickfont: RSConstants.PANEL_TICK_FONT,
      resize: false
    } );
    this.addChild( alphaParticlePropertiesPanel );

    // Add play/pause button.
    var playPauseButton = new PlayPauseButton( model.playProperty, {
      bottom: alphaParticlePropertiesPanel.bottom + 60,
      centerX: alphaParticlePropertiesPanel.centerX - 25,
      radius: 23
    } );
    this.addChild( playPauseButton );

    // Add step button to manually step the animation.
    var stepButton = new StepButton( function() {
        model.manualStep();
      },
      model.playProperty, {
        centerY: playPauseButton.centerY,
        centerX: alphaParticlePropertiesPanel.centerX + 25,
        radius: 15
    } );
    this.addChild( stepButton );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        model.reset();
      },
      right:  this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );
    this.addChild( resetAllButton );

}

  rutherfordScattering.register( 'PlumPuddingAtomScreenView', PlumPuddingAtomScreenView );

  return inherit( ScreenView, PlumPuddingAtomScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );
