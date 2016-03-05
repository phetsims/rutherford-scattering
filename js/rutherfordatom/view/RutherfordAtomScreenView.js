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
  var GunTargetNode = require( 'RUTHERFORD_SCATTERING/common/view/GunTargetNode' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var AtomPropertiesPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomPropertiesPanel' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var Property = require( 'AXON/Property' );
  var Vector2 = require( 'DOT/Vector2' );
  var RutherfordAtomSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordAtomSpaceNode' );
  var ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var pattern0NuclearScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0nuclearScale' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomScreenView( model ) {

    ScreenView.call( this );

    var scaleFormattedString = StringUtils.format( pattern0NuclearScaleString, '150' );

    // properties
    var showAlphaTraceProperty = new Property( RSConstants.DEFAULT_SHOW_TRACES );

    var gunTargetNode = new GunTargetNode( model, {
      left: this.layoutBounds.left + 75,
      top: this.layoutBounds.top + RSConstants.PANEL_TOP_MARGIN
    } );
    this.addChild( gunTargetNode );

    // atom animation space
    var spaceNodeX = gunTargetNode.right;
    var spaceNodeY = RSConstants.PANEL_TOP_MARGIN;
    var spaceNodeBounds = new Bounds2( spaceNodeX, spaceNodeY,
      spaceNodeX + RSConstants.SPACE_NODE_WIDTH,
      spaceNodeY + RSConstants.SPACE_NODE_HEIGHT );
    var modelViewTransform = new ModelViewTransform2.createRectangleInvertedYMapping( model.bounds, spaceNodeBounds );
    var rutherfordAtomSpaceNode = new RutherfordAtomSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: spaceNodeBounds
    } );
    this.addChild( rutherfordAtomSpaceNode );

    // redraw the spaceNode on model step
    model.addStepListener( function() {
      rutherfordAtomSpaceNode.invalidatePaint();
    } );

    // nuclear scale info
    var scaleInfoNode = new ScaleInfoNode( scaleFormattedString, rutherfordAtomSpaceNode.getWidth(), {
      centerX: rutherfordAtomSpaceNode.centerX,
      top: rutherfordAtomSpaceNode.bottom + 10
    } );
    this.addChild( scaleInfoNode );

    // add play/pause button.
    var playPauseButton = new PlayPauseButton( model.runningProperty, {
      bottom: scaleInfoNode.bottom + 60,
      centerX: scaleInfoNode.centerX - 25,
      radius: 23
    } );
    this.addChild( playPauseButton );

    // add step button to manually step the animation.
    var stepButton = new StepButton( function() {
        model.manualStep();
      },
      model.runningProperty, {
        centerY: playPauseButton.centerY,
        centerX: scaleInfoNode.centerX + 25,
        radius: 15
      } );
    this.addChild( stepButton );

    // create the particles legend control panel
    var particleLegendPanel = new ParticleLegendPanel( {
      leftTop: new Vector2( rutherfordAtomSpaceNode.right + RSConstants.PANEL_SPACE_MARGIN,
        this.layoutBounds.top + RSConstants.PANEL_TOP_MARGIN ),
      resize: false
    } );
    this.addChild( particleLegendPanel );

    // Create the alpha particle properties control panel
    var alphaParticlePropertiesPanel = new AlphaParticlePropertiesPanel( model, showAlphaTraceProperty, {
      leftTop: new Vector2( rutherfordAtomSpaceNode.right + RSConstants.PANEL_SPACE_MARGIN,
        particleLegendPanel.bottom + RSConstants.PANEL_VERTICAL_MARGIN ),
      resize: false
    } );
    this.addChild( alphaParticlePropertiesPanel );

    // create the atom properties control panel
    var atomPropertiesPanel = new AtomPropertiesPanel( model, {
      leftTop: new Vector2( rutherfordAtomSpaceNode.right + RSConstants.PANEL_SPACE_MARGIN,
        alphaParticlePropertiesPanel.bottom + RSConstants.PANEL_VERTICAL_MARGIN ),
      resize: false
    } );
    this.addChild( atomPropertiesPanel );

    // reset all button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        showAlphaTraceProperty.reset();
        model.reset();
      },
      right: atomPropertiesPanel.right,
      top: playPauseButton.top
    } );
    this.addChild( resetAllButton );

  }

  rutherfordScattering.register( 'RutherfordAtomScreenView', RutherfordAtomScreenView );

  return inherit( ScreenView, RutherfordAtomScreenView );

} );
