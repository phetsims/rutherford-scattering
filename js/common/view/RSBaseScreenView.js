// Copyright 2016, University of Colorado Boulder

/**
 * Base type for ScreenViews
 *
 * @author Chris Malley (PixelZoom)
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
  var ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Path = require( 'SCENERY/nodes/Path' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Shape = require( 'KITE/Shape' );
  var Property = require( 'AXON/Property' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Dimension2 = require( 'DOT/Dimension2' );

  // strings
  var alphaSourceString = require( 'string!RUTHERFORD_SCATTERING/alphaParticles' );

  /**
   * @param {RSBaseModel} model
   * @param {string} scaleString
   * @param {function(RSBaseModel, Property.<boolean>, ModelViewTransform2, Bounds2 ): Node} createSpaceNode
   * @param {Object} [options]
   * @constructor
   */
  function RSBaseScreenView( model, scaleString, createSpaceNode, options ) {

    options = _.extend( {
      additionalControlPanels: null // {Panel[]|null} additional control panels, added below the common panels
    }, options );

    ScreenView.call( this, options );

    // properties
    var showAlphaTraceProperty = new Property( RSConstants.DEFAULT_SHOW_TRACES );

    // alpha particle gun
    var gunNode = new LaserPointerNode( model.gun.onProperty, {
      left: this.layoutBounds.left + 75,
      top: this.layoutBounds.centerY,
      bodySize: new Dimension2( 75, 68 ),
      nozzleSize: new Dimension2( 20, 60 ),
      topColor: 'rgb(211, 140, 70)',
      highlightColor: 'rgb(229, 186, 144)',
      bottomColor: 'rgb(106, 70, 35)',
      buttonColor: 'rgb(0, 203, 230)',
      rotation: -Math.PI / 2 // pointing up
    } );
    this.addChild( gunNode );

    // particle gun label
    var alphaSourceText = new Text( alphaSourceString, {
      centerX: gunNode.centerX,
      top: gunNode.bottom  + 15,
      font: new PhetFont( 15 ),
      fill: RSConstants.NEUTRAL_FILL_COLOR,
      maxWidth: 210
    } );
    this.addChild( alphaSourceText );

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
    var tinyBoxNode = new TinyBox( {
      centerX: targetMaterialNode.centerX,
      centerY: targetMaterialNode.centerY
    } );
    this.addChild( tinyBoxNode );

    // atom animation space
    var spaceNodeX = targetMaterialNode.right + RSConstants.TARGET_SPACE_MARGIN;
    var spaceNodeY = RSConstants.PANEL_TOP_MARGIN;
    var spaceNodeBounds = new Bounds2( spaceNodeX, spaceNodeY,
      spaceNodeX + RSConstants.SPACE_NODE_WIDTH,
      spaceNodeY + RSConstants.SPACE_NODE_HEIGHT );
    var modelViewTransform = new ModelViewTransform2.createRectangleInvertedYMapping( model.bounds, spaceNodeBounds );
    var spaceNode = createSpaceNode( model, showAlphaTraceProperty, modelViewTransform, spaceNodeBounds );
    this.addChild( spaceNode );

    // redraw the spaceNode on model step
    model.addStepListener( function( dt ) {
      spaceNode.invalidatePaint();
    } );

    // dashed lines that connect the tiny box and space
    var dashedLines = new Path( new Shape()
      .moveTo( tinyBoxNode.left, tinyBoxNode.top )
      .lineTo( spaceNode.left, spaceNode.top )
      .moveTo( tinyBoxNode.left, tinyBoxNode.bottom )
      .lineTo( spaceNode.left, spaceNode.bottom ), {
      stroke: 'grey',
      lineDash: [ 5, 5 ]
    } );
    this.addChild( dashedLines );

    // scale info
    var scaleInfoNode = new ScaleInfoNode( scaleString, spaceNode.getWidth(), {
      centerX: spaceNode.centerX,
      top: spaceNode.bottom + 10
    } );
    this.addChild( scaleInfoNode );

    // play/pause button
    var playPauseButton = new PlayPauseButton( model.runningProperty, {
      bottom: scaleInfoNode.bottom + 60,
      centerX: scaleInfoNode.centerX - 25,
      radius: 23
    } );
    this.addChild( playPauseButton );

    // step button to manually step the animation.
    var stepButton = new StepButton( function() {
        model.manualStep();
      },
      model.runningProperty, {
        centerY: playPauseButton.centerY,
        centerX: scaleInfoNode.centerX + 25,
        radius: 15
      } );
    this.addChild( stepButton );

    // control panels that are common to all ScreenViews
    var controlPanels = [
      new ParticleLegendPanel( { resize: false } ),
      new AlphaParticlePropertiesPanel( model.userInteractionProperty, model.alphaParticleEnergyProperty, showAlphaTraceProperty, { resize: false } )
    ];

    // additional controls panels, optionally added by subtype
    if ( options.additionalControlPanels ) {
      controlPanels = controlPanels.concat( options.additionalControlPanels );
    }

    // arrange control panels vertically
    var vBox = new VBox( {
      align: 'left',
      children: controlPanels,
      spacing: RSConstants.PANEL_VERTICAL_MARGIN,
      top: spaceNode.top,
      left: spaceNode.right + RSConstants.PANEL_SPACE_MARGIN
    } );
    this.addChild( vBox );

    // reset all button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        showAlphaTraceProperty.reset();
        model.reset();
      },
      right: vBox.right,
      bottom: this.layoutBounds.bottom - 20
    } );
    this.addChild( resetAllButton );
  }

  rutherfordScattering.register( 'RSBaseScreenView', RSBaseScreenView );

  return inherit( ScreenView, RSBaseScreenView );
} );
