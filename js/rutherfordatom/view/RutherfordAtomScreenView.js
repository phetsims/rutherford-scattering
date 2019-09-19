// Copyright 2016-2019, University of Colorado Boulder

/**
 * View for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( require => {
  'use strict';

  // modules
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  const AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  const AtomParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomParticleLegendPanel' );
  const AtomPropertiesPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomPropertiesPanel' );
  const AtomSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomSpaceNode' );
  const ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const NuclearParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/NuclearParticleLegendPanel' );
  const NucleusSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/NucleusSpaceNode' );
  const ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  const PhetFont = require( 'SCENERY_PHET/PhetFont' );
  const RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  const RSA11yStrings = require( 'RUTHERFORD_SCATTERING/common/RSA11yStrings' );
  const RSBaseScreenView = require( 'RUTHERFORD_SCATTERING/common/view/RSBaseScreenView' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const RSQueryParameters = require( 'RUTHERFORD_SCATTERING/common/RSQueryParameters' );
  const RutherfordNucleusNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordNucleusNode' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );

  // strings
  const pattern0AtomicScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0atomicScale' );
  const pattern0NuclearScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0nuclearScale' );

  // a11yStrings
  const switchScaleString = RSA11yStrings.switchScale.value;
  const switchScaleDescriptionString = RSA11yStrings.switchScaleDescription.value;
  const nuclearScaleViewString = RSA11yStrings.nuclearScaleView.value;
  const atomicScaleViewString = RSA11yStrings.atomicScaleView.value;

  // images
  const atomImage = require( 'image!RUTHERFORD_SCATTERING/Atom.png' );
  const atomProjectorImage = require( 'image!RUTHERFORD_SCATTERING/AtomProjector.png' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomScreenView( model ) {

    const nucleusScaleString = StringUtils.format( pattern0NuclearScaleString, '1.5 x 10<sup>-13</sup>' );
    const atomicScaleString = StringUtils.format( pattern0AtomicScaleString, '6.0 x 10<sup>-10</sup>' );

    RSBaseScreenView.call( this, model, nucleusScaleString, createSpaceNode, {
      includeElectronLegend: false
    } );

    // scale info for the 'atom' scene, only visible when atom scene is selected
    const atomicScaleInfoNode = new ScaleInfoNode( atomicScaleString, this.spaceNode.getWidth(), {
      center: this.scaleInfoNode.center
    } );
    this.addChild( atomicScaleInfoNode );

    // create the panels of the control panel on the right
    const createPanels = function() {

      let legendContent;
      const atomSceneVisible = model.sceneProperty.value === 'atom';

      // create content for the control panels
      const atomLegendContent = AtomParticleLegendPanel.createPanelContent( { resize: false } );
      const nuclearLegendContent = NuclearParticleLegendPanel.createPanelContent( {
        resize: false,
        includeElectron: false,
        includePlumPudding: false
      } );
      const particlePropertiesContent = AlphaParticlePropertiesPanel.createPanelContent( model.energyInteractionProperty, model.alphaParticleEnergyProperty, self.showAlphaTraceProperty, { resize: false } );
      const atomPropertiesContent = AtomPropertiesPanel.createPanelContent( model, { resize: false } );

      // make sure that content for all panels are aligned and the legend content is aligned to the left
      // this content does not include title
      const contentAlignGroup = new AlignGroup( { matchVertical: false } );
      const atomContentBox = contentAlignGroup.createBox( atomLegendContent, { xAlign: ParticleLegendPanel.LEGEND_CONTENT_ALIGN } );
      const nuclearContentBox = contentAlignGroup.createBox( nuclearLegendContent, { xAlign: ParticleLegendPanel.LEGEND_CONTENT_ALIGN } );
      const particlePropertiesContentBox = contentAlignGroup.createBox( particlePropertiesContent );
      const atromPropertiesContentBox = contentAlignGroup.createBox( atomPropertiesContent );

      // create content for the legend panels
      if ( atomSceneVisible ) {
        legendContent = atomContentBox;
      }
      else {
        legendContent = nuclearContentBox;
      }

      // create the panels
      const panelOptions = { resize: false };
      const legendPanel = atomSceneVisible ? new AtomParticleLegendPanel( legendContent, panelOptions ) : new NuclearParticleLegendPanel( legendContent, panelOptions );
      const particlePropertiesPanel = new AlphaParticlePropertiesPanel( particlePropertiesContentBox, panelOptions );
      const atomPropertiesPanel = new AtomPropertiesPanel( atromPropertiesContentBox, panelOptions );

      return [
        legendPanel,
        particlePropertiesPanel,
        atomPropertiesPanel
      ];
    };

    // when various panels are added/removed due to changing color profile or scene, reset the accessible order
    var self = this;
    const restoreAccessibleOrder = function() {
      self.playAreaNode.accessibleOrder = [
        self.gunNode
      ];
      self.controlAreaNode.accessibleOrder = _.uniq( self.controlAreaNode.accessibleOrder.concat( [
        self.controlPanel,
        self.sceneRadioButtonGroup
      ].filter( _.identity ) ) );
    };

    // {Node} control panel is created below by sceneProperty listener, to correspond to scene
    let controlPanel = null;

    // for the 'Atom' scene, the beam should be semi-transparent, the scale indicator
    // should be updated, and the control/legend panels need to change
    // no need to unlink, screen view exists for life of sim
    model.sceneProperty.link( function( scene ) {
      const beam = self.beamNode;
      const atomSceneVisible = scene === 'atom';

      // update visibility of scene specific scale info
      self.scaleInfoNode.visible = !atomSceneVisible;
      atomicScaleInfoNode.visible = atomSceneVisible;

      // recenter the gun beam and set new fill
      beam.centerX = self.gunNode.centerX;
      beam.fill = atomSceneVisible ? RSColorProfile.atomBeamColorProperty : RSColorProfile.nucleusBeamColorProperty;

      // dispose and remove the old control panel
      if ( controlPanel ) {
        self.removeChild( controlPanel );
        controlPanel.dispose();
      }

      // create the new control panel
      const panels = createPanels();
      controlPanel = self.createControlPanel( panels );
      self.addChild( controlPanel );

      restoreAccessibleOrder();
    } );

    // create radio buttons for the scene - new buttons must be created
    // every time the color profile changes
    const nucleusIcon = RutherfordNucleusNode.RutherfordNucleusIcon( 20, 20 );
    const buttonOptions = { scale: 0.18 };

    /**
     * Create the RadioButonGroup that will act as the scene selection control in this sim.
     *
     * @param {Image} atomIconImage - the icon for the atomic scene, changes with color profile
     * @returns {RadioButtonGroup} - returns a RadioButtonGroup that must be disposed when profile changes
     */
    const createRadioButtons = function( atomIconImage ) {
      return new RadioButtonGroup( model.sceneProperty, [
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
      } );
    };

    // @private
    self.sceneRadioButtonGroup = createRadioButtons( atomImage );
    this.controlAreaNode.addChild( self.sceneRadioButtonGroup );

    // if the bacgrkound, panel or stroke colors change, draw a new button group
    // no need to unlink, screen view exists for life of sim
    RSColorProfile.profileNameProperty.link( function( profileName ) {

      // remove and dispose of the old button group
      self.controlAreaNode.removeChild( self.sceneRadioButtonGroup );
      self.sceneRadioButtonGroup.dispose();

      // get the correct image for the 'atom' scene icon
      const iconImage = ( profileName === ColorProfile.PROJECTOR_COLOR_PROFILE_NAME ) ? atomProjectorImage : atomImage;

      // create the new radio button group
      const newButtonGroup = createRadioButtons( iconImage );
      self.sceneRadioButtonGroup = newButtonGroup;
      self.controlAreaNode.addChild( newButtonGroup );

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
    const nucleusSpaceNode = new NucleusSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );

    // create the multiple atom representation scene
    const atomSpaceNode = new AtomSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );

    if ( RSQueryParameters.showErrorCount ) {
      // show the number of particles that were removed from the space in error
      const errorCountPattern = 'Error count: {{numRemoved}}';
      const errorText = new Text( '', {
        font: new PhetFont( 18 ),
        fill: 'red',
        leftBottom: atomSpaceNode.leftTop
      } );
      atomSpaceNode.addChild( errorText );

      let atomsRemoved = 0;
      model.atomSpace.particleRemovedFromAtomEmitter.addListener( function( particle ) {
        atomsRemoved += 1;
        errorText.text = StringUtils.fillIn( errorCountPattern, {
          numRemoved: atomsRemoved
        } );
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
      const nucleusVisible = scene === 'nucleus';

      // set visibility of model space
      model.nucleusSpace.isVisible = nucleusVisible;
      model.atomSpace.isVisible = !nucleusVisible;

      // set node visibility
      nucleusSpaceNode.visible = nucleusVisible;
      atomSpaceNode.visible = !nucleusVisible;

      model.removeAllParticles();
    } );

    return new Node( {
      children: [nucleusSpaceNode, atomSpaceNode]
    } );
  };

  return inherit( RSBaseScreenView, RutherfordAtomScreenView, {} );

} );
