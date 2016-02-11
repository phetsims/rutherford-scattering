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
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var RutherfordAtomModel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtomModel' );
  var AtomPropertiesPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomPropertiesPanel' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var PANEL_MIN_WIDTH = 225;

  /**
   * @param {RutherfordAtomModel} rutherfordAtomModel
   * @constructor
   */
  function RutherfordAtomScreenView( rutherfordAtomModel ) {

    ScreenView.call( this );

    // Create the particles legend control panel
    var particleLegendPanel = new ParticleLegendPanel( {
      minWidth: PANEL_MIN_WIDTH,
      rightTop: new Vector2( this.layoutBounds.right - 10, this.layoutBounds.top + 15 ),
      resize: false
    } );
    this.addChild( particleLegendPanel );

    // Create the alpha particle properties control panel
    var alphaParticlePropertiesPanel = new AlphaParticlePropertiesPanel( rutherfordAtomModel, {
      minWidth: PANEL_MIN_WIDTH,
      rightTop: new Vector2( this.layoutBounds.right - 10, particleLegendPanel.bottom + 5 ),
      resize: false
    } );
    this.addChild( alphaParticlePropertiesPanel );

    // Create the atom properties control panel
    var atomPropertiesPanel = new AtomPropertiesPanel( rutherfordAtomModel, {
      minWidth: PANEL_MIN_WIDTH,
      rightTop: new Vector2( this.layoutBounds.right - 10, alphaParticlePropertiesPanel.bottom + 5 ),
      resize: false } );
    this.addChild( atomPropertiesPanel );

    // Add play/pause button.
    var playPauseButton = new PlayPauseButton( rutherfordAtomModel.playProperty,
      {
        bottom: atomPropertiesPanel.bottom + 60,
        centerX: atomPropertiesPanel.centerX - 25,
        radius: 23
      } );
    this.addChild( playPauseButton );

    // Add step button to manually step the animation.
    var stepButton = new StepButton( function() {
        rutherfordAtomModel.manualStep();
      },
      rutherfordAtomModel.playProperty, {
        centerY: playPauseButton.centerY,
        centerX: atomPropertiesPanel.centerX + 25,
        radius: 15
    } );
    this.addChild( stepButton );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        rutherfordAtomModel.reset();
      },
      right:  this.layoutBounds.maxX - 10,
      bottom: atomPropertiesPanel.bottom + 60
    } );
    this.addChild( resetAllButton );

  }

  rutherfordScattering.register( 'RutherfordAtomScreenView', RutherfordAtomScreenView );

  return inherit( ScreenView, RutherfordAtomScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    // @public
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );
