// Copyright 2016-2019, University of Colorado Boulder

/**
 * Builds the main Plum Pudding sim screen
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NuclearParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/NuclearParticleLegendPanel' );
  var ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  var PlumPuddingSpaceNode = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingSpaceNode' );
  var RSBaseScreenView = require( 'RUTHERFORD_SCATTERING/common/view/RSBaseScreenView' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  var pattern0AtomicScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0atomicScale' );

  /**
   * @param {PlumPuddingAtomModel} model
   * @constructor
   */
  function PlumPuddingAtomScreenView( model ) {

    var scaleString = StringUtils.format( pattern0AtomicScaleString, '3.0 x 10<sup>-10</sup>' );

    RSBaseScreenView.call( this, model, scaleString, createSpaceNode, {
      includePlumPuddingLegend: true
    } );

    // create the new control panel
    var propertiesPanelContent = AlphaParticlePropertiesPanel.createPanelContent( model.userInteractionProperty,
      model.alphaParticleEnergyProperty, this.showAlphaTraceProperty, { resize: false } );
    var legendPanelContent = NuclearParticleLegendPanel.createPanelContent( {
      resize: false,
      includeElectron: true,
      includePlumPudding: true
    } );

    // handle alignment for the panels, should have exactly the same width, but the legend content should be aligned
    // to the left
    var contentAlignGroup = new AlignGroup( { matchVertical: false } );
    var particleContentBox = contentAlignGroup.createBox( propertiesPanelContent );
    var legendContentBox = contentAlignGroup.createBox( legendPanelContent, { xAlign: ParticleLegendPanel.LEGEND_CONTENT_ALIGN } );

    var particlePropertiesPanel = new AlphaParticlePropertiesPanel( particleContentBox, { resize: false } );
    var legendPanel = new NuclearParticleLegendPanel( legendContentBox, { resize: false } );

    var panels = [
      legendPanel,
      particlePropertiesPanel
    ];
    const controlPanel = this.createControlPanel( panels );
    this.addChild( controlPanel );

    // a11y - update accessible order when we recreate the control panel
    this.accessibleOrder = [ this.screenSummaryNode, this.playAreaNode, this.gunNode, controlPanel ].filter( function( node ) {
      return !!node;
    } );
  }

  rutherfordScattering.register( 'PlumPuddingAtomScreenView', PlumPuddingAtomScreenView );

  /**
   * Create the node in which atoms and alpha particles are rendered.
   * @param {PlumPuddingAtomModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Bounds2} canvasBounds
   * @returns {Node}
   */
  var createSpaceNode = function( model, showAlphaTraceProperty, modelViewTransform, canvasBounds ) {
    var plumPuddingSpaceNode = new PlumPuddingSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
      canvasBounds: canvasBounds
    } );

    // redraw the space node on model step
    model.addStepListener( function( dt ) {
      plumPuddingSpaceNode.invalidatePaint();
    } );

    return plumPuddingSpaceNode;
  };

  return inherit( RSBaseScreenView, PlumPuddingAtomScreenView );

} );
