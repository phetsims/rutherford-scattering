// Copyright 2016-2022, University of Colorado Boulder

/**
 * Space in which atoms and alpha particles are rendered.  In this representation, there are several
 * atoms in the space and the alpha particles are small particles, most of which travel through the
 * atoms undeflected.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import merge from '../../../../phet-core/js/merge.js';
import required from '../../../../phet-core/js/required.js';
import { Path } from '../../../../scenery/js/imports.js';
import RSQueryParameters from '../../common/RSQueryParameters.js';
import ParticleSpaceNode from '../../common/view/ParticleSpaceNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import AtomCollectionNode from './AtomCollectionNode.js';

// constants
const observationWindowString = RutherfordScatteringStrings.a11y.observationWindow;
const atomSpaceDescriptionString = RutherfordScatteringStrings.a11y.atomSpaceDescription;

class AtomSpaceNode extends ParticleSpaceNode {

  /**
   * @param {RSBaseModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view transform
   * @param {Object} config - must provide {Bounds2} canvasBounds
   */
  constructor( model, showAlphaTraceProperty, modelViewTransform, config ) {
    config = merge( {

      // {Bounds2}
      canvasBounds: required( config.canvasBounds ),
      particleStyle: 'particle',

      // pdom
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: observationWindowString,
      descriptionContent: atomSpaceDescriptionString,
      appendDescription: true
    }, config );

    super( model.atomSpace, showAlphaTraceProperty, modelViewTransform, config );

    // @private - generates an image for the collection of atoms
    this.atomsNode = new AtomCollectionNode( model.atomSpace, modelViewTransform );

    if ( RSQueryParameters.showDebugShapes ) {
      model.atomSpace.particleTransitionedEmitter.addListener( particle => {
        // a particle has been transitioned to a new atom - show the bounding box of the particle
        this.addChild( new Path( modelViewTransform.modelToViewShape( particle.preparedBoundingBox ), {
          stroke: 'rgb(114,183,188)'
        } ) );
      } );
    }
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @override
   * @protected
   */
  paintSpace( context ) {

    // Slight chance the image used isn't available. In that case, return & try again on next frame
    if ( !this.atomsNode.image ) {
      return;
    }

    const x = this.centerX - this.atomsNode.image.width / 2;
    const y = this.centerY - this.atomsNode.image.height / 2;
    context.drawImage( this.atomsNode.image, x, y, this.atomsNode.image.width, this.atomsNode.image.height );
  }
}

rutherfordScattering.register( 'AtomSpaceNode', AtomSpaceNode );

export default AtomSpaceNode;