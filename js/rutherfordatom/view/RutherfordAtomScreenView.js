// Copyright 2016-2018, University of Colorado Boulder

/**
 * View for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (Pixelzoom)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var AtomParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomParticleLegendPanel' );
  var AtomPropertiesPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomPropertiesPanel' );
  var AtomSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomSpaceNode' );
  var ControlPanelNode = require( 'SCENERY_PHET/accessibility/nodes/ControlPanelNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NuclearParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/NuclearParticleLegendPanel' );
  var NucleusSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/NucleusSpaceNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var RSA11yStrings = require( 'RUTHERFORD_SCATTERING/common/RSA11yStrings' );
  var RSBaseScreenView = require( 'RUTHERFORD_SCATTERING/common/view/RSBaseScreenView' );
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RSGlobals = require( 'RUTHERFORD_SCATTERING/common/RSGlobals' );
  var RSQueryParameters = require( 'RUTHERFORD_SCATTERING/common/RSQueryParameters' );
  var RutherfordNucleusNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordNucleusNode' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var pattern0AtomicScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0atomicScale' );
  var pattern0NuclearScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0nuclearScale' );

  // a11yStrings
  var switchScaleString = RSA11yStrings.switchScale.value;
  var switchScaleDescriptionString = RSA11yStrings.switchScaleDescription.value;
  var nuclearScaleViewString = RSA11yStrings.nuclearScaleView.value;
  var atomicScaleViewString = RSA11yStrings.atomicScaleView.value;

  // images
  var atomImage = require( 'image!RUTHERFORD_SCATTERING/Atom.png' );
  var atomProjectorImage = require( 'image!RUTHERFORD_SCATTERING/AtomProjector.png' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomScreenView( model ) {

    var nucleusScaleString = StringUtils.format( pattern0NuclearScaleString, '1.5 x 10<sup>-13</sup>' );
    var atomicScaleString = StringUtils.format( pattern0AtomicScaleString, '6.0 x 10<sup>-10</sup>' );

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

      var particlePropertiesContent = AlphaParticlePropertiesPanel.createPanelContent( model.energyInteractionProperty, model.alphaParticleEnergyProperty, self.showAlphaTraceProperty, { resize: false } );
      var atomPropertiesContent = AtomPropertiesPanel.createPanelContent( model.interactionPropertyGroup, model.protonInteractionProperty, model.neutronInteractionProperty, model.protonCountProperty, model.neutronCountProperty, { resize: false } );

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

    // when various panels are added/removed due to changing color profile or scene, reset the accessible order
    var self = this;
    var restoreAccessibleOrder = function() {
      self.accessibleOrder = [ self.sceneSummaryNode, self.playAreaNode, self.gunNode, self.controlPanel, self.sceneRadioButtons ].filter( function( node ) {
        return !!node;
      } );
    };

    // when the color profile changes, create a new control panel
    // no need to unlink, screen view exists for life of sim
    RSGlobals.projectorModeProperty.link( function() {

      // remove and dispose the old control panel
      self.removeChild( self.controlPanel );
      self.controlPanel.dispose();

      // create the new control panel
      var panels = createPanels();
      self.controlPanel = self.createControlPanel( panels );
      self.addChild( self.controlPanel );

      restoreAccessibleOrder();
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
      beam.fill = atomSceneVisible ? RSColorProfile.atomBeamColorProperty : RSColorProfile.nucleusBeamColorProperty;

      // dispose and remove the old control panel
      self.removeChild( self.controlPanel );
      self.controlPanel.dispose();

      // create the new control panel
      var panels = createPanels();
      self.controlPanel = self.createControlPanel( panels );
      self.addChild( self.controlPanel );

      restoreAccessibleOrder();
    } );

    // create radio buttons for the scene - new buttons must be created
    // every time the color profile changes
    var nucleusIcon = RutherfordNucleusNode.RutherfordNucleusIcon( 20, 20 );
    var createRadioButtons = function( atomIconImage ) {

      var container = new Node();
      container.addChild( new ControlPanelNode() ); // TODO: we shouldn't add this heading in this function

      var buttonOptions = { scale: 0.18 };

      return container.addChild( new RadioButtonGroup( model.sceneProperty, [
        { value: 'atom', node: new Image( atomIconImage, buttonOptions ), labelContent: atomicScaleViewString },
        { value: 'nucleus', node: nucleusIcon, labelContent: nuclearScaleViewString }
      ], {
        orientation: 'vertical',
        spacing: 15,
        left: self.targetMaterialNode.left,
        top: self.spaceNode.top,
        baseColor: RSColorProfile.panelColorProperty.value, // TODO: update this when requested
        deselectedStroke: RSColorProfile.panelBorderColorProperty.value, // TODO: update this when requested
        selectedStroke: RSColorProfile.radioButtonBorderColorProperty, // TODO: update this when requested
        buttonContentYMargin: 8,
        selectedLineWidth: 2,
        deselectedLineWidth: 1.5,
        maxWidth: self.targetMaterialNode.width,

        tagName: 'div',
        descriptionContent: switchScaleDescriptionString,
        labelTagName: 'h3',
        labelContent: switchScaleString,
        appendDescription: true
      } ) );
    };

    // @private
    self.sceneRadioButtons = createRadioButtons( atomImage );
    self.addChild( self.sceneRadioButtons );

    // if the bacgrkound, panel or stroke colors change, draw a new button group
    // no need to unlink, screen view exists for life of sim
    RSGlobals.projectorModeProperty.link( function() {

      // remove and dispose of the old button group
      self.removeChild( self.sceneRadioButtons );
      self.sceneRadioButtons.dispose();

      // get the correct image for the 'atom' scene icon
      var iconImage = RSGlobals.projectorModeProperty.get() ? atomProjectorImage : atomImage;

      // create the new radio button group
      var newButtonGroup = createRadioButtons( iconImage );
      self.sceneRadioButtons = newButtonGroup;
      self.addChild( newButtonGroup );

      // add laser, all control panels, and scene buttons to accessibleOrder, must be set after
      // creating new radio buttons
      restoreAccessibleOrder();
    } );

    restoreAccessibleOrder();
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

    if ( RSQueryParameters.showErrorCount ) {
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
