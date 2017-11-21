// Copyright 2016-2017, University of Colorado Boulder

/**
 * Builds the main Plum Pudding sim screen
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var AlphaParticlePropertiesPanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePropertiesPanel' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NuclearParticleLegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/NuclearParticleLegendPanel' );
  var PlumPuddingSpaceNode = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingSpaceNode' );
  var RSBaseScreenView = require( 'RUTHERFORD_SCATTERING/common/view/RSBaseScreenView' );
  var RSGlobals = require( 'RUTHERFORD_SCATTERING/common/RSGlobals' );
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
    var self = this;

    // whenever the color profile changes, redraw the control panel
    // this screen view exists for life of sim, no need to unlink
    RSGlobals.projectorModeProperty.link( function() {
      // dispose and remove the old control panel
      self.removeChild( self.controlPanel );
      self.controlPanel.dispose();

      // create the new control panel
      var particlePanelContent = AlphaParticlePropertiesPanel.createPanelContent( model.userInteractionProperty, model.alphaParticleEnergyProperty, self.showAlphaTraceProperty, { resize: false } );
      var legendPanelContent = NuclearParticleLegendPanel.createPanelContent( {
        resize: false,
        includeElectron: true,
        includePlumPudding: true
      } );

      var particlePropertiesPanel = new AlphaParticlePropertiesPanel( particlePanelContent, { resize: false } );
      var legendPanel = new NuclearParticleLegendPanel( legendPanelContent, { resize: false } );

      var panels = [
        legendPanel,
        particlePropertiesPanel
      ];
      self.controlPanel = self.createControlPanel( panels );
      self.addChild( self.controlPanel );

      // a11y - update accessible order when we recreate the control panel
      var prependItems = [ self.gunNode, self.controlPanel ];
      self.accessibleOrder = prependItems.concat( self.accessibleOrder );
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
