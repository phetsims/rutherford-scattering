// Copyright 2016-2025, University of Colorado Boulder

/**
 * PlumPuddingSpaceNode is the space in which atoms and alpha particles are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import WithRequired from '../../../../phet-core/js/types/WithRequired.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import { rasterizeNode } from '../../../../scenery/js/util/rasterizeNode.js';
import ParticleSpaceNode, { ParticleSpaceNodeOptions } from '../../common/view/ParticleSpaceNode.js';
import RSColors from '../../common/RSColors.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import PlumPuddingAtomModel from '../model/PlumPuddingAtomModel.js';
import PlumPuddingAtomNode from './PlumPuddingAtomNode.js';

type SelfOptions = EmptySelfOptions;

type PlumPuddingSpaceNodeOptions = SelfOptions & WithRequired<ParticleSpaceNodeOptions, 'canvasBounds'>;

type ImageRect = { x: number; y: number; width: number; height: number };

class PlumPuddingSpaceNode extends ParticleSpaceNode {

  private readonly atomNode: PlumPuddingAtomNode;
  private readonly atomNodeRect: ImageRect;
  private readonly atomCanvas: HTMLImageElement | HTMLCanvasElement;

  /**
   * @param model
   * @param showAlphaTraceProperty
   * @param modelViewTransform - model to view  transform
   * @param providedOptions - must provide {Bounds2} canvasBounds
   */
  public constructor(
    model: PlumPuddingAtomModel,
    showAlphaTraceProperty: Property<boolean>,
    modelViewTransform: ModelViewTransform2,
    providedOptions: PlumPuddingSpaceNodeOptions
  ) {
    const options = optionize<PlumPuddingSpaceNodeOptions, SelfOptions, ParticleSpaceNodeOptions>()( {
      particleTraceColorProperty: RSColors.plumPuddingTraceColorProperty
    }, providedOptions );

    super( model.plumPuddingSpace, showAlphaTraceProperty, modelViewTransform, options );

    this.atomNode = new PlumPuddingAtomNode( this.bounds );

    // calculate center positioning of plum pudding Node
    const imageX = this.bounds.centerX - this.atomNode.width / 2;
    const imageY = this.bounds.centerY - this.atomNode.height / 2;
    this.atomNodeRect = { x: imageX, y: imageY, width: this.atomNode.width, height: this.atomNode.height };
    this.atomCanvas = rasterizeNode( this.atomNode, { useCanvas: true, wrap: false } ).image;

    this.invalidatePaint();
  }


  /**
   * Draws the background image (pudding blob with electrons).
   */
  protected override paintSpace( context: CanvasRenderingContext2D ): void {
    context.drawImage( this.atomCanvas, this.atomNodeRect.x, this.atomNodeRect.y,
      this.atomNodeRect.width, this.atomNodeRect.height );
  }
}

rutherfordScattering.register( 'PlumPuddingSpaceNode', PlumPuddingSpaceNode );

export default PlumPuddingSpaceNode;