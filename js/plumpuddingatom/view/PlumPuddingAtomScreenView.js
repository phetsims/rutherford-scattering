// Copyright 2002-2016, University of Colorado Boulder

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
  var PlumPuddingSpaceNode = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingSpaceNode' );
  var ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var Path = require( 'SCENERY/nodes/Path' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Shape = require( 'KITE/Shape' );
  var Property = require( 'AXON/Property' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var PANEL_MIN_WIDTH = 225;
  var PANEL_SPACE_MARGIN = 50;
  var PANEL_TOP_MARGIN = 15;
  var PANEL_INNER_MARGIN = 10;
  var TARGET_SPACE_MARGIN = 50;

  /**
   * @param {PlumPuddingAtomModel} model
   * @constructor
   */
  function PlumPuddingAtomScreenView( model ) {

    ScreenView.call( this );

    // strings
    var pattern0AtomicScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0atomicScale' );

    // properties
    var showAlphaTraceProperty = new Property( RSConstants.DEFAULT_SHOW_TRACES );

    // Alpha particle gun
    var gunNode = new LaserPointerNode( model.gun.onProperty, {
      rotation: -Math.PI / 2, // pointing up
      left: this.layoutBounds.left + 25,
      top: this.layoutBounds.centerY
    } );
    this.addChild( gunNode );

    // Alpha particle beam
    var beamNode = new BeamNode( model.gun.onProperty, {
      centerX: gunNode.centerX,
      bottom: gunNode.top
    } );
    this.addChild( beamNode );

    // Alpha particle source target
    var targetMaterialNode = new TargetMaterialNode( {
      centerX: beamNode.centerX,
      bottom: beamNode.top
    } );
    this.addChild( targetMaterialNode );

     // Tiny box that indicates what will be zoomed
    var tinyBoxNode = new TinyBox();
    tinyBoxNode.centerX = targetMaterialNode.centerX;
    tinyBoxNode.centerY = targetMaterialNode.centerY;
    this.addChild( tinyBoxNode );

    // Atom animation space
    var spaceNodeX = targetMaterialNode.right + TARGET_SPACE_MARGIN;
    var spaceNodeY = PANEL_TOP_MARGIN;
    var spaceNodeBounds = new Bounds2( spaceNodeX, spaceNodeY,
                                       spaceNodeX + RSConstants.SPACE_NODE_WIDTH,
                                       spaceNodeY + RSConstants.SPACE_NODE_HEIGHT );
    var modelViewTransform = new ModelViewTransform2.createRectangleInvertedYMapping( model.bounds, spaceNodeBounds );
    var plumPuddingSpaceNode = new PlumPuddingSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: spaceNodeBounds
    } );
    this.addChild( plumPuddingSpaceNode );

    // Update spaceNode on model step
    model.addStepListener( function() {
      plumPuddingSpaceNode.invalidatePaint();
    } );

    // Dashed lines that connect the tiny box and space
    var dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( plumPuddingSpaceNode.left, plumPuddingSpaceNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( plumPuddingSpaceNode.left, plumPuddingSpaceNode.bottom ), {
      stroke: 'grey',
      lineDash: [ 5, 5 ]
    } );
    this.addChild( dashedLines );

    // nuclear scale info
    var scaleFormattedString = StringUtils.format( pattern0AtomicScaleString, '300' );
    var scaleInfoNode = new ScaleInfoNode( scaleFormattedString, plumPuddingSpaceNode.getWidth() );
    scaleInfoNode.centerX = plumPuddingSpaceNode.centerX;
    scaleInfoNode.top = plumPuddingSpaceNode.bottom + 10;
    this.addChild( scaleInfoNode );

     // Add play/pause button.
    var playPauseButton = new PlayPauseButton( model.playProperty, {
      bottom: scaleInfoNode.bottom + 60,
      centerX: scaleInfoNode.centerX - 25,
      radius: 23
    } );
    this.addChild( playPauseButton );

    // Add step button to manually step the animation.
    var stepButton = new StepButton( function() {
        model.manualStep();
      },
      model.playProperty, {
        centerY: playPauseButton.centerY,
        centerX: scaleInfoNode.centerX + 25,
        radius: 15
    } );
    this.addChild( stepButton );

    // Create the particles legend control panel
    var particleLegendPanel = new ParticleLegendPanel({
      minWidth: PANEL_MIN_WIDTH,
      leftTop: new Vector2( plumPuddingSpaceNode.right + PANEL_SPACE_MARGIN, this.layoutBounds.top + PANEL_TOP_MARGIN ),
      resize: false
    } );
    this.addChild( particleLegendPanel );

    // Create the alpha particle properties control panel
    var alphaParticlePropertiesPanel = new AlphaParticlePropertiesPanel( model, showAlphaTraceProperty, {
      minWidth: PANEL_MIN_WIDTH,
      leftTop: new Vector2( plumPuddingSpaceNode.right + PANEL_SPACE_MARGIN,
      particleLegendPanel.bottom + PANEL_INNER_MARGIN ),
      resize: false
    } );
    this.addChild( alphaParticlePropertiesPanel );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        showAlphaTraceProperty.reset();
        model.reset();
      },
      right:  alphaParticlePropertiesPanel.right,
      top: alphaParticlePropertiesPanel.bottom + 10
    } );
    this.addChild( resetAllButton );

  }

  rutherfordScattering.register( 'PlumPuddingAtomScreenView', PlumPuddingAtomScreenView );

  return inherit( ScreenView, PlumPuddingAtomScreenView, {

  } ); // inherit

} ); // define
