// Copyright 2002-2016, University of Colorado Boulder

/**
 * Builds the main Rutherford sim screen
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
  var RutherfordSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordSpaceNode' );
  var ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var AtomPropertiesPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomPropertiesPanel' );
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

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomScreenView( model ) {

    ScreenView.call( this );

    // strings
    var pattern0NuclearScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0nuclearScale' );

    // properties
    var showAlphaTraceProperty = new Property( RSConstants.DEFAULT_SHOW_TRACES );

    // alpha particle gun
    var gunNode = new LaserPointerNode( model.gun.onProperty, {
      rotation: -Math.PI / 2, // pointing up
      left: this.layoutBounds.left + 75,
      top: this.layoutBounds.centerY
    } );
    this.addChild( gunNode );

    // alpha particle beam
    var beamNode = new BeamNode( model.gun.onProperty, {
      centerX: gunNode.centerX,
      bottom: gunNode.top
    } );
    this.addChild( beamNode );

    // alpha particle source target
    var targetMaterialNode = new TargetMaterialNode( {
      centerX: beamNode.centerX,
      bottom: beamNode.top
    } );
    this.addChild( targetMaterialNode );

     // tiny box that indicates what will be zoomed
    var tinyBoxNode = new TinyBox();
    tinyBoxNode.centerX = targetMaterialNode.centerX;
    tinyBoxNode.centerY = targetMaterialNode.centerY;
    this.addChild( tinyBoxNode );

    // atom animation space
    var spaceNodeX = targetMaterialNode.right + RSConstants.TARGET_SPACE_MARGIN;
    var spaceNodeY = RSConstants.PANEL_TOP_MARGIN;
    var spaceNodeBounds = new Bounds2( spaceNodeX, spaceNodeY,
                                       spaceNodeX + RSConstants.SPACE_NODE_WIDTH,
                                       spaceNodeY + RSConstants.SPACE_NODE_HEIGHT );
    var modelViewTransform = new ModelViewTransform2.createRectangleInvertedYMapping( model.bounds, spaceNodeBounds );
    var rutherfordSpaceNode = new RutherfordSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: spaceNodeBounds
    } );
    this.addChild( rutherfordSpaceNode );

    // redraw the spaceNode on model step
    model.addStepListener( function(dt) {
      rutherfordSpaceNode.invalidatePaint();
    } );

    // dashed lines that connect the tiny box and space
    var dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( rutherfordSpaceNode.left, rutherfordSpaceNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( rutherfordSpaceNode.left, rutherfordSpaceNode.bottom ), {
      stroke: 'grey',
      lineDash: [ 5, 5 ]
    } );
    this.addChild( dashedLines );

    // nuclear scale info
    var scaleFormattedString = StringUtils.format( pattern0NuclearScaleString, '150' );
    var scaleInfoNode = new ScaleInfoNode( scaleFormattedString, rutherfordSpaceNode.getWidth() );
    scaleInfoNode.centerX = rutherfordSpaceNode.centerX;
    scaleInfoNode.top = rutherfordSpaceNode.bottom + 10;
    this.addChild( scaleInfoNode );

    // add play/pause button.
    var playPauseButton = new PlayPauseButton( model.playProperty, {
      bottom: scaleInfoNode.bottom + 60,
      centerX: scaleInfoNode.centerX - 25,
      radius: 23
    } );
    this.addChild( playPauseButton );

    // add step button to manually step the animation.
    var stepButton = new StepButton( function() {
        model.manualStep();
      },
      model.playProperty, {
        centerY: playPauseButton.centerY,
        centerX: scaleInfoNode.centerX + 25,
        radius: 15
    } );
    this.addChild( stepButton );

    // create the particles legend control panel
    var particleLegendPanel = new ParticleLegendPanel({
      leftTop: new Vector2( rutherfordSpaceNode.right + RSConstants.PANEL_SPACE_MARGIN,
        this.layoutBounds.top + RSConstants.PANEL_TOP_MARGIN ),
      resize: false
    } );
    this.addChild( particleLegendPanel );

    // Create the alpha particle properties control panel
    var alphaParticlePropertiesPanel = new AlphaParticlePropertiesPanel( model, showAlphaTraceProperty, {
      leftTop: new Vector2( rutherfordSpaceNode.right + RSConstants.PANEL_SPACE_MARGIN,
        particleLegendPanel.bottom + RSConstants.PANEL_VERTICAL_MARGIN ),
      resize: false
    } );
    this.addChild( alphaParticlePropertiesPanel );

    // create the atom properties control panel
    var atomPropertiesPanel = new AtomPropertiesPanel( model, {
      leftTop: new Vector2( rutherfordSpaceNode.right + RSConstants.PANEL_SPACE_MARGIN,
        alphaParticlePropertiesPanel.bottom + RSConstants.PANEL_VERTICAL_MARGIN ),
      resize: false } );
    this.addChild( atomPropertiesPanel );

    // reset all button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        showAlphaTraceProperty.reset();
        model.reset();
      },
      right:  atomPropertiesPanel.right,
      top: atomPropertiesPanel.bottom + 10
    } );
    this.addChild( resetAllButton );

  }

  rutherfordScattering.register( 'RutherfordAtomScreenView', RutherfordAtomScreenView );

  return inherit( ScreenView, RutherfordAtomScreenView, {

  } );

} );
