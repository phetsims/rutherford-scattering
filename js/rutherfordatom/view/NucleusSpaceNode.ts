// Copyright 2016-2025, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

/**
 * NucleusSpaceNode is the space in which atoms and alpha particles are rendered.  In this
 * representation, the space has a single nucleus.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import required from '../../../../phet-core/js/required.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import RSBaseModel from '../../common/model/RSBaseModel.js';
import ParticleSpaceNode, { ParticleSpaceNodeOptions } from '../../common/view/ParticleSpaceNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';
import RutherfordNucleusNode from './RutherfordNucleusNode.js';

// constants
const observationWindowString = RutherfordScatteringStrings.a11y.observationWindow;
const nucleusSpaceDescriptionString = RutherfordScatteringStrings.a11y.nucleusSpaceDescription;

type SelfOptions = EmptySelfOptions;

type NucleusSpaceNodeOptions = SelfOptions & ParticleSpaceNodeOptions;

class NucleusSpaceNode extends ParticleSpaceNode {

  public constructor(
    model: RSBaseModel,
    showAlphaTraceProperty: Property<boolean>,
    modelViewTransform: ModelViewTransform2,
    providedOptions: NucleusSpaceNodeOptions
  ) {
    const options = optionize<NucleusSpaceNodeOptions, SelfOptions, ParticleSpaceNodeOptions>()( {

      // {Bounds2}
      canvasBounds: required( providedOptions.canvasBounds ),

      // pdom
      tagName: 'div',
      accessibleHeading: observationWindowString,
      descriptionContent: nucleusSpaceDescriptionString,
      appendDescription: true
    }, providedOptions );

    super( model.nucleusSpace, showAlphaTraceProperty, modelViewTransform, options );

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


  protected override paintSpace( context: CanvasRenderingContext2D ): void {

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