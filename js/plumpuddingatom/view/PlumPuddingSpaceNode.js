// Copyright 2016-2021, University of Colorado Boulder

/**
 * PlumPuddingSpaceNode is the space in which atoms and alpha particles are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import merge from '../../../../phet-core/js/merge.js';
import required from '../../../../phet-core/js/required.js';
import { Color } from '../../../../scenery/js/imports.js';
import ParticleSpaceNode from '../../common/view/ParticleSpaceNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import PlumPuddingAtomNode from './PlumPuddingAtomNode.js';

class PlumPuddingSpaceNode extends ParticleSpaceNode {

  /**
   * @param {RSBaseModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view  transform
   * @param {Object} config - must provide {Bounds2} canvasBounds
   */
  constructor( model, showAlphaTraceProperty, modelViewTransform, config ) {
    config = merge( {
      canvasBounds: required( config.canvasBounds ),
      particleTraceColor: new Color( 'grey' )
    }, config );

    super( model.plumPuddingSpace, showAlphaTraceProperty, modelViewTransform, config );

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


  /**
   * Draws the background image
   *
   * @param {CanvasRenderingContext2D} context
   * @override
   * @protected
   */
  paintSpace( context ) {
    // Slight chance the image used isn't available. In that case, return & try again on next frame
    if ( this.atomNode.image === null ) {
      return;
    }

    context.drawImage( this.atomNode.image, this.atomNodeRect.x, this.atomNodeRect.y,
      this.atomNodeRect.width, this.atomNodeRect.height );
  }
}

rutherfordScattering.register( 'PlumPuddingSpaceNode', PlumPuddingSpaceNode );

export default PlumPuddingSpaceNode;