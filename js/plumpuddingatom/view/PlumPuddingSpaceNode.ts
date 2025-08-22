// Copyright 2016-2025, University of Colorado Boulder

/**
 * PlumPuddingSpaceNode is the space in which atoms and alpha particles are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import required from '../../../../phet-core/js/required.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import Color from '../../../../scenery/js/util/Color.js';
import ParticleSpaceNode, { ParticleSpaceNodeOptions } from '../../common/view/ParticleSpaceNode.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import PlumPuddingAtomModel from '../model/PlumPuddingAtomModel.js';
import PlumPuddingAtomNode from './PlumPuddingAtomNode.js';

type SelfOptions = EmptySelfOptions;

type PlumPuddingSpaceNodeOptions = SelfOptions & ParticleSpaceNodeOptions;

class PlumPuddingSpaceNode extends ParticleSpaceNode {

  private readonly atomNode: PlumPuddingAtomNode;
  private readonly atomNodeRect: { x: number; y: number; width: number; height: number };

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
      canvasBounds: required( providedOptions.canvasBounds ),
      particleTraceColor: new Color( 'grey' )
    }, providedOptions );

    super( model.plumPuddingSpace, showAlphaTraceProperty, modelViewTransform, options );

    // plum pudding image - calc image scale and center positioning
    this.atomNode = new PlumPuddingAtomNode();
    const scale = Math.min( this.width, this.height ) /
                  ( Math.max( this.atomNode.width, this.atomNode.height ) );
    const imageWidth = this.atomNode.width * scale;
    const imageHeight = this.atomNode.height * scale;
    const imageX = this.bounds.centerX - imageWidth / 2;
    const imageY = this.bounds.centerY - imageHeight / 2;

    // TODO: Should this be a proper Rect or something? https://github.com/phetsims/rutherford-scattering/issues/181
    this.atomNodeRect = { x: imageX, y: imageY, width: imageWidth, height: imageHeight };

    this.invalidatePaint();
  }


  /**
   * Draws the background image
   */
  protected override paintSpace( context: CanvasRenderingContext2D ): void {
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