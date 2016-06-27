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
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var RutherfordNucleusNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordNucleusNode' );
  var Image = require( 'SCENERY/nodes/Image' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ScaleInfoNode = require( 'RUTHERFORD_SCATTERING/common/view/ScaleInfoNode' );

  // constants
  var ATOM_BEAM_FILL = 'rgba(143,143,143,0.4)';
  var NUCLEUS_BEAM_FILL = 'rgba(143,143,143,1)';

  // strings
  var pattern0NuclearScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0nuclearScale' );
  var pattern0AtomicScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0atomicScale' );

  // images
  var atomImage = require( 'image!RUTHERFORD_SCATTERING/Atom.png' );

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

    // add the control panels for this screen view
    this.atomParticleLegend = new AtomParticleLegendPanel( { resize: false } );
    var atomPropertiesPanel = new AtomPropertiesPanel( model.userInteractionProperty, model.protonCountProperty,
      model.neutronCountProperty, { resize: false } );

    // for the 'Atom' scene, the beam should be wider and semi-transparent, the scale indicator
    // should be updated, and the control/legend panels need to change
    var self = this;
    model.sceneProperty.link( function( scene ) {
      var legendPanel;
      var beam = self.beamNode;
      var atomSceneVisible = scene === 'atom';

      if ( atomSceneVisible ) {
        beam.setRect( 0, 0, RSConstants.BEAM_SIZE.width * 4, RSConstants.BEAM_SIZE.height );
        beam.fill = ATOM_BEAM_FILL;
        legendPanel = self.atomParticleLegend;
      }
      else {
        beam.setRect( 0, 0, RSConstants.BEAM_SIZE.width, RSConstants.BEAM_SIZE.height );
        beam.fill = NUCLEUS_BEAM_FILL;
        legendPanel = self.nuclearParticleLegend;
      }

      var panels = [
        legendPanel,
        self.alphaParticlePropertiesPanel,
        atomPropertiesPanel
      ];

      self.controlPanel.updatePanels( panels );

      self.scaleInfoNode.visible = !atomSceneVisible;
      atomicScaleInfoNode.visible = atomSceneVisible;

      beam.centerX = self.gunNode.centerX;
    } );

    // add scene control
    var buttonOptions = { scale: 0.18 };
    var sceneRadioButtons = new RadioButtonGroup( model.sceneProperty, [
      { value: 'nucleus', node: RutherfordNucleusNode.RutherfordNucleusIcon( 20, 20 ) },
      { value: 'atom', node: new Image( atomImage, buttonOptions ) }
    ], {
      orientation: 'vertical',
      spacing: 15,
      left: this.targetMaterialNode.left,
      top: this.spaceNode.top,
      baseColor: RSConstants.PANEL_COLOR,
      deselectedStroke: RSConstants.PANEL_STROKE,
      selectedStroke: RSConstants.PANEL_TITLE_COLOR,
      buttonContentYMargin: 8,
      selectedLineWidth: 2,
      deselectedLineWidth: 1.5,
      maxWidth: this.targetMaterialNode.width
    } );
    this.addChild( sceneRadioButtons );
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

    // update view on model step
    model.addStepListener( function( dt ) {
      nucleusSpaceNode.invalidatePaint();
      atomSpaceNode.invalidatePaint();
    } );

    // update which scene is visible and remove all particles
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
