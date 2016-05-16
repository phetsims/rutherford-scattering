// Copyright 2002-2016, University of Colorado Boulder

/**
 * NucleusSpaceNode is the space in which atoms and alpha particles are rendered.  In this
 * representation, the space has a single nucleus and 
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  var RutherfordNucleusNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordNucleusNode' );

  /**
   * @param {RSBaseModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view transform
   * @param {Object} options - must provide {Bounds2} canvasBounds
   * @constructor
   */
  function NucleusSpaceNode( model, showAlphaTraceProperty, modelViewTransform, options ) {

    assert && assert( options && options.hasOwnProperty( 'canvasBounds' ), 'No canvasBounds specified.' );

    ParticleSpaceNode.call( this, model.particles, showAlphaTraceProperty, modelViewTransform, options );

    // @private - atom image generator
    this.atomNode = new RutherfordNucleusNode( model.userInteractionProperty, model.protonCountProperty,
      model.neutronCountProperty );

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'NucleusSpaceNode', NucleusSpaceNode );

  return inherit( ParticleSpaceNode, NucleusSpaceNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @override
     * @protected
     */
    paintSpace: function( context ) {

      // Slight chance the image used isn't available. In that case, return & try again on next frame
      if ( this.atomNode.image === null ) {
        return;
      }

      var x = this.centerX - this.atomNode.image.width / 2;
      var y = this.centerY - this.atomNode.image.height / 2;
      context.drawImage( this.atomNode.image, x, y, this.atomNode.image.width, this.atomNode.image.height );
    }

  } ); // inherit

} ); // define
