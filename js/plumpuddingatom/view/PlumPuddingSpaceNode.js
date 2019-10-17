// Copyright 2016-2019, University of Colorado Boulder

/**
 * PlumPuddingSpaceNode is the space in which atoms and alpha particles are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  const PlumPuddingAtomNode = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingAtomNode' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  /**
   * @param {RSBaseModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view  transform
   * @param {Object} options - must provide {Bounds2} canvasBounds
   * @constructor
   */
  function PlumPuddingSpaceNode( model, showAlphaTraceProperty, modelViewTransform, options ) {

    assert && assert( options && options.hasOwnProperty( 'canvasBounds' ), 'No canvasBounds specified.' );

    options = merge( {
      particleTraceColor: new Color( 'grey' )
    }, options );

    ParticleSpaceNode.call( this, model.plumPuddingSpace, showAlphaTraceProperty, modelViewTransform, options );

    // plum pudding image - calc image scale and center positioning
    this.atomNode = new PlumPuddingAtomNode();
    const scale = Math.min( this.width, this.height ) /
                ( Math.max( this.atomNode.width, this.atomNode.height ) );
    const imageWidth = this.atomNode.width * scale;
    const imageHeight = this.atomNode.height * scale;
    const imageX = this.bounds.centerX - imageWidth / 2;
    const imageY = this.bounds.centerY - imageHeight / 2;
    this.atomNodeRect = { x: imageX, y: imageY, width: imageWidth, height: imageHeight };

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'PlumPuddingSpaceNode', PlumPuddingSpaceNode );

  return inherit( ParticleSpaceNode, PlumPuddingSpaceNode, {

    /**
     * Draws the background image
     *
     * @param {CanvasRenderingContext2D} context
     * @override
     * @protected
     */
    paintSpace: function( context ) {
      // Slight chance the image used isn't available. In that case, return & try again on next frame
      if ( this.atomNode.image === null ) {
        return;
      }

      context.drawImage( this.atomNode.image, this.atomNodeRect.x, this.atomNodeRect.y,
        this.atomNodeRect.width, this.atomNodeRect.height );
    }

  } );

} );
