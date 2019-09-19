// Copyright 2016-2019, University of Colorado Boulder

/**
 * Builds the main Plum Pudding sim screen
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  const AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  const inherit = require( 'PHET_CORE/inherit' );
  const NuclearParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/NuclearParticleLegendPanel' );
  const ParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/ParticleLegendPanel' );
  const PlumPuddingSpaceNode = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingSpaceNode' );
  const RSBaseScreenView = require( 'RUTHERFORD_SCATTERING/common/view/RSBaseScreenView' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // strings
  const pattern0AtomicScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0atomicScale' );

  /**
   * @param {PlumPuddingAtomModel} model
   * @constructor
   */
  function PlumPuddingAtomScreenView( model ) {

    const scaleString = StringUtils.format( pattern0AtomicScaleString, '3.0 x 10<sup>-10</sup>' );

    RSBaseScreenView.call( this, model, scaleString, createSpaceNode, {
      includePlumPuddingLegend: true
    } );

    // create the new control panel
    const propertiesPanelContent = AlphaParticlePropertiesPanel.createPanelContent( model.userInteractionProperty,
      model.alphaParticleEnergyProperty, this.showAlphaTraceProperty, { resize: false } );
    const legendPanelContent = NuclearParticleLegendPanel.createPanelContent( {
      resize: false,
      includeElectron: true,
      includePlumPudding: true
    } );

    // handle alignment for the panels, should have exactly the same width, but the legend content should be aligned
    // to the left
    const contentAlignGroup = new AlignGroup( { matchVertical: false } );
    const particleContentBox = contentAlignGroup.createBox( propertiesPanelContent );
    const legendContentBox = contentAlignGroup.createBox( legendPanelContent, { xAlign: ParticleLegendPanel.LEGEND_CONTENT_ALIGN } );

    const particlePropertiesPanel = new AlphaParticlePropertiesPanel( particleContentBox, { resize: false } );
    const legendPanel = new NuclearParticleLegendPanel( legendContentBox, { resize: false } );

    const panels = [
      legendPanel,
      particlePropertiesPanel
    ];
    const controlPanel = this.createControlPanel( panels );
    this.addChild( controlPanel );

    this.playAreaNode.accessibleOrder = [ this.gunNode ];
    if ( controlPanel ) {
      const newOrder = _.union( [ controlPanel ], this.controlAreaNode.accessibleOrder );
      this.controlAreaNode.setAccessibleOrder( newOrder );
    }
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
    const plumPuddingSpaceNode = new PlumPuddingSpaceNode( model, showAlphaTraceProperty, modelViewTransform, {
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
