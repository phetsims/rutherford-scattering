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

  // strings
  var pattern0NuclearScaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.0nuclearScale' );

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
