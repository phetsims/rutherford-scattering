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
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var SpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/SpaceNode' );
  var PlumPuddingAtomModel = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/model/PlumPuddingAtomModel' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var PANEL_COLOR = '#eaeaea';
  var PANEL_STROKE = 'gray';
  var PANEL_LINE_WIDTH = 1;
  var TITLE_FONT = new PhetFont( 16 );
  var PROPERTY_FONT = new PhetFont( 12 );
  var TICK_FONT = new PhetFont( 12 );

  /**
   * @param {AtomModel} plumPuddingAtomModel
   * @constructor
   */
  function PlumPuddingAtomScreenView( plumPuddingAtomModel ) {

    ScreenView.call( this );

    // fonts

    // Create the particles legend control panel
    var particleLegendPanel = new ParticleLegendPanel({
      minWidth: 255,
      rightTop: new Vector2( this.layoutBounds.right - 10, this.layoutBounds.top + 25 ),
      fill: PANEL_COLOR,
      stroke: PANEL_STROKE,
      lineWidth: PANEL_LINE_WIDTH,
      titleFont: TITLE_FONT,
      propertyFont: PROPERTY_FONT,
      rresize: false
    } );
    this.addChild( particleLegendPanel );

    // Create the alpha particle properties control panel
    var alphaParticlePropertiesPanel = new AlphaParticlePropertiesPanel( plumPuddingAtomModel, {
      minWidth: 255,
      rightTop: new Vector2( this.layoutBounds.right - 10, particleLegendPanel.bottom + 5 ),
      fill: PANEL_COLOR,
      stroke: PANEL_STROKE,
      lineWidth: PANEL_LINE_WIDTH,
      titleFont: TITLE_FONT,
      propertyFont: PROPERTY_FONT,
      sliderTickfont: TICK_FONT,
      resize: false
    } );
    this.addChild( alphaParticlePropertiesPanel );

    // Atom animation space
    var spaceX = 10; // Smitty: FIXME
    var spaceY = 10;
    var spaceNode = new SpaceNode( plumPuddingAtomModel, {
      canvasBounds: new Bounds2( spaceX, spaceY, spaceX + RSConstants.SPACE_NODE_WIDTH, RSConstants.SPACE_NODE_HEIGHT )
    } );
    this.addChild( spaceNode );

    // Add play/pause button.
    var playPauseButton = new PlayPauseButton( plumPuddingAtomModel.playProperty, {
      bottom: alphaParticlePropertiesPanel.bottom + 60,
      centerX: alphaParticlePropertiesPanel.centerX - 25,
      radius: 23
    } );
    this.addChild( playPauseButton );

    // Add step button to manually step the animation.
    var stepButton = new StepButton( function() {
        plumPuddingAtomModel.manualStep();
      },
      plumPuddingAtomModel.playProperty, {
        centerY: playPauseButton.centerY,
        centerX: alphaParticlePropertiesPanel.centerX + 25,
        radius: 15
    } );
    this.addChild( stepButton );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        plumPuddingAtomModel.reset();
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
