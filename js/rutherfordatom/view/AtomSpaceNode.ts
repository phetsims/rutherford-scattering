// Copyright 2016-2025, University of Colorado Boulder

/**
 * Space in which atoms and alpha particles are rendered.  In this representation, there are several
 * atoms in the space and the alpha particles are small particles, most of which travel through the
 * atoms undeflected.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import required from '../../../../phet-core/js/required.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Path from '../../../../scenery/js/nodes/Path.js';
import RSQueryParameters from '../../common/RSQueryParameters.js';
import ParticleSpaceNode, { ParticleSpaceNodeOptions } from '../../common/view/ParticleSpaceNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringFluent from '../../RutherfordScatteringFluent.js';
import RutherfordAtomModel from '../model/RutherfordAtomModel.js';
import AtomCollectionNode from './AtomCollectionNode.js';

// constants
const observationWindowStringProperty = RutherfordScatteringFluent.a11y.observationWindowStringProperty;
const atomSpaceDescriptionStringProperty = RutherfordScatteringFluent.a11y.atomSpaceDescriptionStringProperty;

type SelfOptions = EmptySelfOptions;

type AtomSpaceNodeOptions = SelfOptions & ParticleSpaceNodeOptions;

class AtomSpaceNode extends ParticleSpaceNode {

  private readonly atomsNode: AtomCollectionNode;

  public constructor(
    model: RutherfordAtomModel,
    showAlphaTraceProperty: Property<boolean>,
    modelViewTransform: ModelViewTransform2,
    providedOptions: AtomSpaceNodeOptions
  ) {
    const options = optionize<AtomSpaceNodeOptions, SelfOptions, ParticleSpaceNodeOptions>()( {

      // {Bounds2}
      canvasBounds: required( providedOptions.canvasBounds ),
      particleStyle: 'particle',

      // pdom
      accessibleHeading: observationWindowStringProperty,
      descriptionContent: atomSpaceDescriptionStringProperty,
      appendDescription: true
    }, providedOptions );

    super( model.atomSpace, showAlphaTraceProperty, modelViewTransform, options );

    // generates an image for the collection of atoms
    this.atomsNode = new AtomCollectionNode( model.atomSpace, modelViewTransform );

    if ( RSQueryParameters.showDebugShapes ) {
      model.atomSpace.particleTransitionedEmitter.addListener( particle => {
        // a particle has been transitioned to a new atom - show the bounding box of the particle
        this.addChild( new Path( modelViewTransform.modelToViewShape( particle.preparedBoundingBox! ), {
          stroke: 'rgb(114,183,188)'
        } ) );
      } );
    }
  }

  protected override paintSpace( context: CanvasRenderingContext2D ): void {

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