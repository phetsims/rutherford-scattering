// Copyright 2002-2016, University of Colorado Boulder

/**
 * PlumPuddingSpaceNode is the space in which atoms and alpha particles are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  var PlumPuddingAtomNode = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingAtomNode' );

  // constants
  var ATOM_IMAGE_MARGIN = 75;

  /**
   * @param {RSBaseModel} model
   * @param {showAlphaTraceProperty} traceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view  transform
   * @param { } options, must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function PlumPuddingSpaceNode( model, traceProperty, modelViewTransform, options ) {

    assert && assert( ( options.hasOwnProperty( 'canvasBounds' ) ), 'No canvasBounds specified.' );

    options = _.extend( {
    }, options );

    ParticleSpaceNode.call( this, model, traceProperty, modelViewTransform, options );

    // plum pudding image - calc image scale and center positioning
    this.atomNode = new PlumPuddingAtomNode();
    var scale = Math.min( this.width, this.height )/
      ( Math.max( this.atomNode.width, this.atomNode.height ) + 2 * ATOM_IMAGE_MARGIN );
    var imageWidth = this.atomNode.width * scale;
    var imageHeight = this.atomNode.height * scale;
    var imageX = this.bounds.centerX - imageWidth / 2;
    var imageY = this.bounds.centerY - imageHeight / 2;
    this.atomNodeRect = { x: imageX, y: imageY, width: imageWidth, height: imageHeight };

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'PlumPuddingSpaceNode', PlumPuddingSpaceNode );

  return inherit( ParticleSpaceNode, PlumPuddingSpaceNode, {

    /**
     * Draws the background image
     *
     * @param {CanvasRenderingContext2D} context
     * @protected
     */
    paintSpace: function( context ) {
      // Slight chance the image used isn't available. In that case, return & try again on next frame
      if( this.atomNode.image === null ) {
        return;
      }

      context.drawImage( this.atomNode.image, this.atomNodeRect.x, this.atomNodeRect.y,
        this.atomNodeRect.width, this.atomNodeRect.height );
    }

  } );
} );
