// Copyright 2002-2016, University of Colorado Boulder

/**
 * Builds the main Plum Pudding sim screen
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
  var PlumPuddingSpaceNode = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingSpaceNode' );
  var ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Property = require( 'AXON/Property' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );


  /**
   * @param {PlumPuddingAtomModel} model
   * @constructor
   */
  function PlumPuddingAtomScreenView( model ) {

    ScreenView.call( this );

    // strings
    var pattern0AtomicScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0atomicScale' );
    var scaleFormattedString = StringUtils.format( pattern0AtomicScaleString, '300' );

    // properties
    var showAlphaTraceProperty = new Property( RSConstants.DEFAULT_SHOW_TRACES );

    var gunTargetNode = new GunTargetNode( model, showAlphaTraceProperty, scaleFormattedString, {
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
    var plumPuddingSpaceNode = new PlumPuddingSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: spaceNodeBounds
    } );
    this.addChild( plumPuddingSpaceNode );

    // redraw the spaceNode on model step
    model.addStepListener( function() {
      plumPuddingSpaceNode.invalidatePaint();
    } );

    // nuclear scale info
    var scaleInfoNode = new ScaleInfoNode( scaleFormattedString, plumPuddingSpaceNode.getWidth(), {
      centerX: plumPuddingSpaceNode.centerX,
      top: plumPuddingSpaceNode.bottom + 10
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
    var particleLegendPanel = new ParticleLegendPanel({
      leftTop: new Vector2( plumPuddingSpaceNode.right + RSConstants.PANEL_SPACE_MARGIN,
        this.layoutBounds.top + RSConstants.PANEL_TOP_MARGIN ),
      resize: false
    } );
    this.addChild( particleLegendPanel );

    // create the alpha particle properties control panel
    var alphaParticlePropertiesPanel = new AlphaParticlePropertiesPanel( model, showAlphaTraceProperty, {
      leftTop: new Vector2( plumPuddingSpaceNode.right + RSConstants.PANEL_SPACE_MARGIN,
      particleLegendPanel.bottom + RSConstants.PANEL_VERTICAL_MARGIN ),
      resize: false
    } );
    this.addChild( alphaParticlePropertiesPanel );

    // reset all button.
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        showAlphaTraceProperty.reset();
        model.reset();
      },
      right:  alphaParticlePropertiesPanel.right,
      top: playPauseButton.top
    } );
    this.addChild( resetAllButton );

  }

  rutherfordScattering.register( 'PlumPuddingAtomScreenView', PlumPuddingAtomScreenView );

  return inherit( ScreenView, PlumPuddingAtomScreenView );

} ); // define
