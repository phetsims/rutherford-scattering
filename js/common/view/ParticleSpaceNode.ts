// Copyright 2016-2025, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

/**
 * The space in which atoms and alpha particles are rendered.  The particles can be represented two
 * ways, 'nucleus' and 'particle'.  When represented by a nucleus, the particle is shown as an image of
 * two protons and two neutrons.  When represented as a particle, it is represented as a small magenta
 * circle.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import optionize from '../../../../phet-core/js/optionize.js';
import required from '../../../../phet-core/js/required.js';
import { ParticleContainer } from '../../../../phetcommon/js/model/ParticleContainer.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import ModelViewTransform2 from '../../../../phetcommon/js/view/ModelViewTransform2.js';
import CanvasNode, { CanvasNodeOptions } from '../../../../scenery/js/nodes/CanvasNode.js';
import Color from '../../../../scenery/js/util/Color.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import AtomSpace from '../model/AtomSpace.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';
import ParticleNodeFactory from './ParticleNodeFactory.js';

type SelfOptions = {
  particleStyle?: string;
  particleTraceColor?: Color;
};

export type ParticleSpaceNodeOptions = SelfOptions & CanvasNodeOptions;

// constants
const SPACE_BORDER_WIDTH = 2;
const SPACE_BORDER_COLOR = 'grey';
const PARTICLE_TRACE_WIDTH = 1.5;
const FADEOUT_SEGMENTS = 80;

class ParticleSpaceNode extends CanvasNode {

  private readonly particleStyle: string;
  private readonly particleTraceColor: Color;
  private readonly atomSpace: AtomSpace;
  private alphaParticleImage: HTMLImageElement | null = null;
  private readonly modelViewTransform: ModelViewTransform2;
  private readonly showAlphaTraceProperty: Property<boolean>;
  private readonly particleTraceColorWithFade: string;
  private readonly clipRect: { x: number; y: number; width: number; height: number };
  private particleImageHalfWidth: number = 0;
  private particleImageHalfHeight: number = 0;

  /**
   * @param atomSpace - space containing atoms and particles
   * @param showAlphaTraceProperty
   * @param modelViewTransform - model to view  transform
   * @param providedOptions - must contain a canvasBounds attribute of type Bounds2
   */
  public constructor( atomSpace: AtomSpace, showAlphaTraceProperty: Property<boolean>, modelViewTransform: ModelViewTransform2, providedOptions: ParticleSpaceNodeOptions ) {
    const options = optionize<ParticleSpaceNodeOptions, SelfOptions, CanvasNodeOptions>()( {

      // {Bounds2}
      canvasBounds: required( providedOptions.canvasBounds ),
      particleStyle: 'nucleus', // 'nucleus'|'particle'
      particleTraceColor: new Color( 255, 0, 255 )
    }, providedOptions );

    // the bounds should be eroded by 10 so it appears that particles glide into the space
    options.canvasBounds = options.canvasBounds.eroded( RSConstants.SPACE_BUFFER );

    super( options );

    this.particleStyle = options.particleStyle;
    this.particleTraceColor = options.particleTraceColor;
    this.atomSpace = atomSpace;
    this.modelViewTransform = modelViewTransform;
    this.showAlphaTraceProperty = showAlphaTraceProperty;
    this.particleTraceColorWithFade = `rgba(${options.particleTraceColor.r},${options.particleTraceColor.g},${options.particleTraceColor.b},{0})`;
    
    this.clipRect = {
      x: this.canvasBounds.getX() + SPACE_BORDER_WIDTH / 2,
      y: this.canvasBounds.getY() + SPACE_BORDER_WIDTH / 2,
      width: this.canvasBounds.getWidth() - SPACE_BORDER_WIDTH,
      height: this.canvasBounds.getHeight() - SPACE_BORDER_WIDTH
    };

    // create a single alpha particle image to use for rendering all particles - asynchronous
    let alphaParticle;
    if ( this.particleStyle === 'nucleus' ) {
      alphaParticle = ParticleNodeFactory.createNucleusAlpha();
    }
    else if ( this.particleStyle === 'particle' ) {
      alphaParticle = ParticleNodeFactory.createParticleAlpha();
    }
    alphaParticle.toImage( ( image, x, y ) => {
      this.alphaParticleImage = image;
      this.particleImageHalfWidth = this.alphaParticleImage.width / 2;
      this.particleImageHalfHeight = this.alphaParticleImage.height / 2;
    } );

    this.invalidatePaint();
  }


  /**
   * A no/op function to be implemented by derived objects
   */
  protected paintSpace( context: CanvasRenderingContext2D ): void {
    assert && assert( false, 'subtype needs to implement' );
  }

  protected override paintCanvas( context: CanvasRenderingContext2D ): void {

    const bounds = this.canvasBounds;
    const renderTrace = this.showAlphaTraceProperty.value;

    // clear
    context.clearRect( bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight() );

    // border
    context.beginPath();
    context.lineWidth = SPACE_BORDER_WIDTH;
    context.strokeStyle = SPACE_BORDER_COLOR;
    context.rect( bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight() );
    context.stroke();

    // viewport clip
    context.beginPath();
    context.strokeStyle = 'transparent';
    context.fillStyle = RSColors.backgroundColorProperty.get().toCSS();
    context.rect( this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height );
    context.stroke();
    context.fill();
    context.clip();

    // render derived space
    this.paintSpace( context );

    // Slight chance the image used isn't loaded. In that case, return & try again on next frame
    if ( this.alphaParticleImage === null ) {
      return;
    }

    // render all alpha particles & corresponding traces in the space
    this.renderAlphaParticles( context, this.atomSpace, renderTrace );
  }

  /**
   * Render alpha particles that belong to a parent particleContainer
   */
  private renderAlphaParticles( context: CanvasRenderingContext2D, particleContainer: ParticleContainer<Atom|AtomSpace>, renderTrace: boolean ): void {
    if ( renderTrace ) {

      // if style is 'nucleus' we can get away with rendering with one path for performance
      if ( this.particleStyle === 'nucleus' ) {
        context.beginPath();
        context.lineWidth = PARTICLE_TRACE_WIDTH;
        context.strokeStyle = this.particleTraceColor.getCanvasStyle();
      }
    }

    particleContainer.particles.forEach( particle => {

      // render the traces (if enabled)
      if ( renderTrace ) {

        // add trace segments
        for ( let i = 1; i < particle.positions.length; i++ ) {
          if ( this.particleStyle === 'particle' ) {

            // if the style is of a 'particle', each segment needs a new path to create the gradient effect
            context.beginPath();
          }

          const segmentStartViewPosition = this.modelViewTransform.modelToViewPosition( particle.positions[ i - 1 ] );
          context.moveTo( segmentStartViewPosition.x, segmentStartViewPosition.y );
          const segmentEndViewPosition = this.modelViewTransform.modelToViewPosition( particle.positions[ i ] );
          context.lineTo( segmentEndViewPosition.x, segmentEndViewPosition.y );

          if ( this.particleStyle === 'particle' ) {

            // only the last FADEOUT_SEGMENTS should be visible, map i to the opacity
            const length = particle.positions.length;
            const alpha = Utils.linear( length - FADEOUT_SEGMENTS, length, 0, 0.5, i );
            const strokeStyle = StringUtils.format( this.particleTraceColorWithFade, alpha );
            context.strokeStyle = strokeStyle;
            context.stroke();
            context.closePath();
          }
        }
      }

      // render particle
      const particleViewPosition = this.modelViewTransform.modelToViewPosition( particle.positionProperty.get() );
      context.drawImage( this.alphaParticleImage,
        particleViewPosition.x - this.particleImageHalfWidth,
        particleViewPosition.y - this.particleImageHalfHeight );
    } );

    // render traces as single path in nucleus representation for performance
    if ( renderTrace ) {
      if ( this.particleStyle === 'nucleus' ) {
        context.stroke();
      }
    }
  }
}

rutherfordScattering.register( 'ParticleSpaceNode', ParticleSpaceNode );

export default ParticleSpaceNode;