// Copyright 2016-2022, University of Colorado Boulder

/**
 * NucleusSpaceNode is the space in which atoms and alpha particles are rendered.  In this
 * representation, the space has a single nucleus.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import merge from '../../../../phet-core/js/merge.js';
import required from '../../../../phet-core/js/required.js';
import ParticleSpaceNode from '../../common/view/ParticleSpaceNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import RutherfordNucleusNode from './RutherfordNucleusNode.js';

// constants
const observationWindowString = RutherfordScatteringStrings.a11y.observationWindow;
const nucleusSpaceDescriptionString = RutherfordScatteringStrings.a11y.nucleusSpaceDescription;

class NucleusSpaceNode extends ParticleSpaceNode {

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

      // pdom
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: observationWindowString,
      descriptionContent: nucleusSpaceDescriptionString,
      appendDescription: true
    }, config );

    super( model.nucleusSpace, showAlphaTraceProperty, modelViewTransform, config );

    // @private - atom image generator
    this.atomNode = new RutherfordNucleusNode( model.userInteractionProperty, model.protonCountProperty,
      model.neutronCountProperty, model.nucleusSpace.rutherfordNucleus );

    this.invalidatePaint();

    // workaround for an issue where the asynchronous images for the RutherfordNuclues weren't getting
    // updated correctly - when marked as 'dirty', the atom node will be explicitly redrawn to ensure that
    // it looks correct in the space
    // does not need to be unlinked, space will exist for life of sim
    model.stepEmitter.addListener( dt => {
      if ( this.atomNode.isDirty ) {
        if ( dt ) {
          this.atomNode.timeSinceDirty += dt;
          this.atomNode.updateAtomImage();
          this.atomNode.invalidatePaint();
          if ( this.atomNode.timeSinceDirty > 1 ) {
            this.atomNode.isDirty = false;
          }
        }
      }
    } );
  }


  /**
   * @param {CanvasRenderingContext2D} context
   * @override
   * @protected
   */
  paintSpace( context ) {

    // Slight chance the image used isn't available. In that case, return & try again on next frame
    if ( this.atomNode.image === null ) {
      return;
    }

    const x = this.centerX - this.atomNode.image.width / 2;
    const y = this.centerY - this.atomNode.image.height / 2;
    context.drawImage( this.atomNode.image, x, y, this.atomNode.image.width, this.atomNode.image.height );
  }
}

rutherfordScattering.register( 'NucleusSpaceNode', NucleusSpaceNode );

export default NucleusSpaceNode;