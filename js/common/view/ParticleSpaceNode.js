// Copyright 2016-2022, University of Colorado Boulder

/**
 * The space in which atoms and alpha particles are rendered.  The particles can be represented two
 * ways, 'nucleus' and 'particle'.  When represented by a nucleus, the particle is shown as an image of
 * two protons and two neutrons.  When represented as a particle, it is represented as a small magenta
 * circle.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import required from '../../../../phet-core/js/required.js';
import StringUtils from '../../../../phetcommon/js/util/StringUtils.js';
import { CanvasNode, Color } from '../../../../scenery/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSColors from '../RSColors.js';
import RSConstants from '../RSConstants.js';
import ParticleNodeFactory from './ParticleNodeFactory.js';

// constants
const SPACE_BORDER_WIDTH = 2;
const SPACE_BORDER_COLOR = 'grey';
const PARTICLE_TRACE_WIDTH = 1.5;
const FADEOUT_SEGMENTS = 80;

class ParticleSpaceNode extends CanvasNode {

  /**
   * @param {atomSpace} atomSpace - space containing atoms and particles
   * @param {Property} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view  transform
   * @param {Object} config - must contain a canvasBounds attribute of type Bounds2
   */
  constructor( atomSpace, showAlphaTraceProperty, modelViewTransform, config ) {
    config = merge( {

      // {Bounds2}
      canvasBounds: required( config.canvasBounds ),
      particleStyle: 'nucleus', // 'nucleus'|'particle'
      particleTraceColor: new Color( 255, 0, 255 )
    }, config );

    // the bounds should be eroded by 10 so it appears that particles glide into the space
    config.canvasBounds = config.canvasBounds.eroded( RSConstants.SPACE_BUFFER );

    super( config );

    this.particleStyle = config.particleStyle;
    this.particleTraceColor = config.particleTraceColor;

    // @private
    this.atomSpace = atomSpace;

    // @private
    this.alphaParticleImage = null;

    // @private - model to view coordinate transform
    this.modelViewTransform = modelViewTransform;

    // @private
    this.showAlphaTraceProperty = showAlphaTraceProperty;

    // @private
    this.particleTraceColorWithFade = `rgba(${config.particleTraceColor.r},${config.particleTraceColor.g},${config.particleTraceColor.b},{0})`;

    // @private - the area to be used as the 'viewport', border not included
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
   * @param {CanvasRenderingContext2D} context
   * @protected
   */
  paintSpace( context ) {
    assert && assert( false, 'subtype needs to implement' );
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @override
   * @private
   */
  paintCanvas( context ) {

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
   * @param  {Context2D} context
   * @param  {Atom|AtomSpace} particleContainer
   * @param  {boolean} renderTrace
   * @private
   */
  renderAlphaParticles( context, particleContainer, renderTrace ) {
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