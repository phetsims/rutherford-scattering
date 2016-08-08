// Copyright 2002-2016, University of Colorado Boulder

/**
 * View for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (Pixelzoom)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSBaseScreenView = require( 'RUTHERFORD_SCATTERING/common/view/RSBaseScreenView' );
  var NucleusSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/NucleusSpaceNode' );
  var AtomSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomSpaceNode' );
  var AtomPropertiesPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomPropertiesPanel' );
  var AtomParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomParticleLegendPanel' );
  var NuclearParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/NuclearParticleLegendPanel' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var RutherfordNucleusNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordNucleusNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RSQueryParameters = require( 'RUTHERFORD_SCATTERING/common/RSQueryParameters' );
  var ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require('SCENERY_PHET/PhetFont' );
  var RSColors = require( 'RUTHERFORD_SCATTERING/common/RSColors' );
  var RSGlobals = require( 'RUTHERFORD_SCATTERING/common/RSGlobals' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  // constants
  var SHOW_ERROR_COUNT = RSQueryParameters.SHOW_ERROR_COUNT;

  // strings
  var pattern0NuclearScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0nuclearScale' );
  var pattern0AtomicScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0atomicScale' );

  // images
  var atomImage = require( 'image!RUTHERFORD_SCATTERING/Atom.png' );
  var atomProjectorImage = require( 'image!RUTHERFORD_SCATTERING/AtomProjector.png' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomScreenView( model ) {

    var nucleusScaleString = StringUtils.format( pattern0NuclearScaleString, '1.5 x 10<sup>-13</sup>' );
    var atomicScaleString = StringUtils.format( pattern0AtomicScaleString, '6.0 x 10<sup>-10</sup>'  );

    RSBaseScreenView.call( this, model, nucleusScaleString, createSpaceNode, {
      includeElectronLegend: false
    } );

    // scale info for the 'atom' scene, only visible when atom scene is selected
    var atomicScaleInfoNode = new ScaleInfoNode( atomicScaleString, this.spaceNode.getWidth(), {
      center: this.scaleInfoNode.center
    } );
    this.addChild( atomicScaleInfoNode );

    // create the panels of the control panel on the right
    var createPanels = function() {
      var legendContent;
      var atomSceneVisible = model.sceneProperty.value === 'atom';

      // create content for the legend panels
      if ( atomSceneVisible ) {
        legendContent = AtomParticleLegendPanel.createPanelContent( { resize: false } );
      }
      else {
        legendContent = NuclearParticleLegendPanel.createPanelContent( {
          resize: false,
          includeElectron: false,
          includePlumPudding: false
        } );
      }

      var particlePropertiesContent = AlphaParticlePropertiesPanel.createPanelContent( model.userInteractionProperty, model.alphaParticleEnergyProperty, self.showAlphaTraceProperty, { resize: false } );
      var atomPropertiesContent = AtomPropertiesPanel.createPanelContent( model.userInteractionProperty, model.protonCountProperty, model.neutronCountProperty, { resize: false } );

      var minWidth = RSConstants.PANEL_MIN_WIDTH;
      if ( particlePropertiesContent.width !== atomPropertiesContent.width ) {
        // max panel width including the X margins
        var maxPanelWidth = Math.max( particlePropertiesContent.width, atomPropertiesContent.width, legendContent.width ) + 2 * RSConstants.PANEL_X_MARGIN;
        minWidth = Math.max( minWidth, maxPanelWidth );
      }

      // create the panels, limited by the min width
      var panelOptions = { minWidth: minWidth, resize: false };
      var legendPanel = atomSceneVisible ? new AtomParticleLegendPanel( legendContent, panelOptions ) : new NuclearParticleLegendPanel( legendContent, panelOptions );
      var particlePropertiesPanel = new AlphaParticlePropertiesPanel( particlePropertiesContent, panelOptions );
      var atomPropertiesPanel = new AtomPropertiesPanel( atomPropertiesContent, panelOptions );

      return [
        legendPanel,
        particlePropertiesPanel,
        atomPropertiesPanel
      ];
    };

    // when the color profile changes, create a new control panel
    // no need to unlink, screen view exists for life of sim
    var self = this;
    RSGlobals.link( 'projectorMode', function() {
      // dispose and remove the old control panel
      self.controlPanel.dispose();
      self.removeChild( self.controlPanel );

      // create the new control panel
      var panels = createPanels();
      self.controlPanel = self.createControlPanel( panels );
      self.addChild( self.controlPanel );
    } );

    // for the 'Atom' scene, the beam should be semi-transparent, the scale indicator
    // should be updated, and the control/legend panels need to change
    // no need to unlink, screen view exists for life of sim
    model.sceneProperty.link( function( scene ) {
      var beam = self.beamNode;
      var atomSceneVisible = scene === 'atom';

      // update visibility of scene specific scale info
      self.scaleInfoNode.visible = !atomSceneVisible;
      atomicScaleInfoNode.visible = atomSceneVisible;

      // recenter the gun beam and set new fill
      beam.centerX = self.gunNode.centerX;
      beam.fill = atomSceneVisible ? RSColors.atomBeamColor : RSColors.nucleusBeamColor;

      // dispose and remove the old control panel
      self.controlPanel.dispose();
      self.removeChild( self.controlPanel );

      // create the new control panel
      var panels = createPanels();
      self.controlPanel = self.createControlPanel( panels );
      self.addChild( self.controlPanel );

    } );

    // create radio buttons for the scene - new buttons must be created
    // every time the color profile changes
    var nucleusIcon = RutherfordNucleusNode.RutherfordNucleusIcon( 20, 20 );
    var createRadioButtons = function( atomIconImage ) {
      var buttonOptions = { scale: 0.18 };
      return new RadioButtonGroup( model.sceneProperty, [
        { value: 'nucleus', node: nucleusIcon },
        { value: 'atom', node: new Image( atomIconImage, buttonOptions ) }
      ], {
        orientation: 'vertical',
        spacing: 15,
        left: self.targetMaterialNode.left,
        top: self.spaceNode.top,
        baseColor: RSColors.panelColor,
        deselectedStroke: RSColors.panelBorderColor,
        selectedStroke: RSColors.radioButtonBorderColor,
        buttonContentYMargin: 8,
        selectedLineWidth: 2,
        deselectedLineWidth: 1.5,
        maxWidth: self.targetMaterialNode.width
      } );
    };

    // @private
    self.sceneRadioButtons = createRadioButtons( atomImage );
    self.addChild( self.sceneRadioButtons );

    // if the bacgrkound, panel or stroke colors change, draw a new button group
    // no need to unlink, screen view exists for life of sim
    RSGlobals.link( 'projectorMode', function() {
      // remove and dispose of the old button group
      self.removeChild( self.sceneRadioButtons );
      self.sceneRadioButtons.dispose();

      // get the correct image for the 'atom' scene icon
      var iconImage = RSGlobals.projectorMode ? atomProjectorImage : atomImage;

      // create the new radio button group
      var newButtonGroup = createRadioButtons( iconImage );
      self.sceneRadioButtons = newButtonGroup;
      self.addChild( newButtonGroup );
    } );

  }

  rutherfordScattering.register( 'RutherfordAtomScreenView', RutherfordAtomScreenView );

  /**
   * Create the node in which atoms and alpha particles are rendered.  Node contains both
   * scene representations, and visibility is controlled from this node.
   *
   * @param {RutherfordAtomModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Bounds2} canvasBounds
   * @returns {Node}
   * @protected
   */
  var createSpaceNode = function( model, showAlphaTraceProperty, modelViewTransform, canvasBounds ) {

    // create the single nucleus representation scene
    var nucleusSpaceNode = new NucleusSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );

    // create the multiple atom representation scene
    var atomSpaceNode = new AtomSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );

    if ( SHOW_ERROR_COUNT ) {
      // show the number of particles that were removed from the space in error
      var errorCountPattern = 'Error count: {0} - particle removed at line {1}';
      var errorText = new Text( '', {
        font: new PhetFont( 18 ),
        fill: 'red',
        leftBottom: atomSpaceNode.leftTop
      } );
      atomSpaceNode.addChild( errorText );

      var atomsRemoved = 0;
      model.atomSpace.particleRemovedFromAtomEmitter.addListener( function( particle, lineNumber ) {
        atomsRemoved += 1;
        errorText.text = StringUtils.format( errorCountPattern, atomsRemoved, lineNumber );
      } );
    }

    // update view on model step
    model.addStepListener( function( dt ) {
      nucleusSpaceNode.invalidatePaint();
      atomSpaceNode.invalidatePaint();
    } );

    // update which scene is visible and remove all particles
    // no need to unlink, screen view exists for life of sim
    model.sceneProperty.link( function( scene ) {
      var nucleusVisible = scene === 'nucleus';

      // set visibility of model space
      model.nucleusSpace.isVisible = nucleusVisible;
      model.atomSpace.isVisible = !nucleusVisible;

      // set node visibility
      nucleusSpaceNode.visible = nucleusVisible;
      atomSpaceNode.visible = !nucleusVisible;

      model.removeAllParticles();

    } );

    return new Node( {
      children: [ nucleusSpaceNode, atomSpaceNode ]
    } );
  };

  return inherit( RSBaseScreenView, RutherfordAtomScreenView, {} );

} );
