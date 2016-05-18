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
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Node = require( 'SCENERY/nodes/Node' );

  // strings
  var pattern0NuclearScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0nuclearScale' );
  var atomSceneString = require( 'string!RUTHERFORD_SCATTERING/atomScene' );
  var nucleusSceneString = require( 'string!RUTHERFORD_SCATTERING/nucleusScene' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomScreenView( model ) {

    var scaleString = StringUtils.format( pattern0NuclearScaleString, 150 );

    // create the atom properties control panel
    var atomPropertiesPanel = new AtomPropertiesPanel( model.userInteractionProperty, model.protonCountProperty,
      model.neutronCountProperty, { resize: false } );

    RSBaseScreenView.call( this, model, scaleString, createSpaceNode, {

      // add an additional control panel for atom properties
      additionalControlPanels: [ atomPropertiesPanel ]
    } );

    // add scene control
    var buttonTextOptions = { font: RSConstants.SCALE_TITLE_FONT, fill: RSConstants.NEUTRAL_FILL_COLOR };
    var sceneRadioButtons = new RadioButtonGroup( model.sceneProperty, [
      { value: 'nucleus', node: new Text( nucleusSceneString, buttonTextOptions ) },
      { value: 'atom', node: new Text( atomSceneString, buttonTextOptions ) }
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
