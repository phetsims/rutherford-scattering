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
  var NuclearParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/NuclearParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var Path = require( 'SCENERY/nodes/Path' );
  var LaserPointerNode = require( 'SCENERY_PHET/LaserPointerNode' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var StepForwardButton = require( 'SCENERY_PHET/buttons/StepForwardButton' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Shape = require( 'KITE/Shape' );
  var Property = require( 'AXON/Property' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var RSControlPanel = require( 'RUTHERFORD_SCATTERING/common/view/RSControlPanel' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RSColors = require( 'RUTHERFORD_SCATTERING/common/RSColors' );

  // strings
  var alphaParticlesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticles' );


  /**
   * @param {RSBaseModel} model
   * @param {string} scaleString
   * @param {function(RSBaseModel, Property.<boolean>, ModelViewTransform2, Bounds2 ): Node} createSpaceNode
   * @param {Object} [options]
   * @constructor
   */
  function RSBaseScreenView( model, scaleString, createSpaceNode, options ) {

    options = _.extend( {
      includeElectronLegend: true, // should the particle legend include an entry for the electron?
      includePlumPuddingLegend: false, // should the particle legend include an entry for the plum pudding cloud?
      additionalControlPanels: null // {Panel[]|null} additional control panels, added below the common panels
    }, options );

    ScreenView.call( this, options );
    var self = this;

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
      rotation: -Math.PI / 2 // pointing up
    } );
    this.addChild( this.gunNode );

    var alphaSourceText = new Text( alphaParticlesString, {
      centerX: this.gunNode.centerX,
      top: this.gunNode.bottom + 15,
      font: new PhetFont( 15 ),
      fill: RSConstants.NEUTRAL_FILL_COLOR,
      maxWidth: 210
    } );
    this.addChild( alphaSourceText );

    // when the color profile changes, the alpha source text should be black
    RSColors.linkAttribute( 'panelLabelColor', alphaSourceText, 'fill' );

    // @protected, alpha particle beam
    this.beamNode = new BeamNode( model.gun.onProperty, {
      centerX: this.gunNode.centerX,
      bottom: this.gunNode.top,
      fill: RSColors.atomBeamColor
    } );
    this.addChild( this.beamNode );

    // @protected for layout in subtypes, alpha particle source target
    this.targetMaterialNode = new TargetMaterialNode( {
      centerX: this.beamNode.centerX,
      bottom: this.beamNode.top
    } );
    this.addChild( this.targetMaterialNode );

    // tiny box that indicates what will be zoomed
    var tinyBoxNode = new TinyBox( {
      centerX: self.targetMaterialNode.centerX,
      centerY: self.targetMaterialNode.centerY
    } );
    this.addChild( tinyBoxNode );

    // atom animation space
    var spaceNodeX = this.targetMaterialNode.right + RSConstants.TARGET_SPACE_MARGIN;
    var spaceNodeY = RSConstants.PANEL_TOP_MARGIN;
    var spaceNodeBounds = new Bounds2( spaceNodeX, spaceNodeY,
      spaceNodeX + RSConstants.SPACE_NODE_WIDTH,
      spaceNodeY + RSConstants.SPACE_NODE_HEIGHT );
    var modelViewTransform = new ModelViewTransform2.createRectangleInvertedYMapping( model.bounds, spaceNodeBounds );

    // @protected for layout in subtypes
    this.spaceNode = createSpaceNode( model, this.showAlphaTraceProperty, modelViewTransform, spaceNodeBounds );
    this.addChild( this.spaceNode );

    // dashed lines that connect the tiny box and space
    var dashedLines = new Path( new Shape()
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
    var playPauseButton = new PlayPauseButton( model.runningProperty, {
      bottom: this.scaleInfoNode.bottom + 60,
      centerX: this.scaleInfoNode.centerX - 25,
      radius: 23
    } );
    this.addChild( playPauseButton );

    // step button to manually step the animation.
    var stepButton = new StepForwardButton( {
      playingProperty: model.runningProperty,
      listener: function() { model.manualStep(); },
      centerY: playPauseButton.centerY,
      centerX: this.scaleInfoNode.centerX + 25,
      radius: 15
    } );
    this.addChild( stepButton );

    // @protected, for visibility control by subtypes - control panels that are common to all ScreenViews
    var nuclearParticleLegend = new NuclearParticleLegendPanel( {
      resize: false,
      includeElectron: options.includeElectronLegend,
      includePlumPudding: options.includePlumPuddingLegend
    } );
    var alphaParticlePropertiesPanel = new AlphaParticlePropertiesPanel( model.userInteractionProperty, model.alphaParticleEnergyProperty, this.showAlphaTraceProperty, { resize: false } );
    var controlPanels = [
      nuclearParticleLegend,
      alphaParticlePropertiesPanel
    ];

    // @protected - collect all control panels in a single panel
    this.controlPanel = this.createControlPanel( controlPanels );
    this.addChild( this.controlPanel );

    // reset all button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        self.showAlphaTraceProperty.reset();
        model.reset();
      },
      right: this.controlPanel.right,
      bottom: this.layoutBounds.bottom - 20
    } );
    this.addChild( resetAllButton );
  }

  rutherfordScattering.register( 'RSBaseScreenView', RSBaseScreenView );

  return inherit( ScreenView, RSBaseScreenView, {

    /**
     * Create a control panel - used by subtypes to generate a control panel from a set
     * of panels.
     *
     * @param  {array.<Panel>} panels
     * @return {RSControlPanel}
     * @protected
     */
    createControlPanel: function( panels ) {
      return new RSControlPanel( panels, {
        top: this.spaceNode.top,
        left: this.spaceNode.right + RSConstants.PANEL_SPACE_MARGIN
      } );
    }
  } );
} );
