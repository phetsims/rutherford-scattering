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
  var RutherfordAtomSpaceNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordAtomSpaceNode' );
  var AtomPropertiesPanel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomPropertiesPanel' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var RadioButtonGroup = require( 'SUN/buttons/RadioButtonGroup' );
  var Text = require( 'SCENERY/nodes/Text' );

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
   * Create the node in which atoms and alpha particles are rendered.
   * @param {RutherfordAtomModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Bounds2} canvasBounds
   * @returns {Node}
   */
  var createSpaceNode = function( model, showAlphaTraceProperty, modelViewTransform, canvasBounds ) {
    return new RutherfordAtomSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );
  };

  return inherit( RSBaseScreenView, RutherfordAtomScreenView, {} );

} );
