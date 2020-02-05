// Copyright 2016-2019, University of Colorado Boulder

/**
 * The space in which atoms and alpha particles are rendered.  The particles can be represented two
 * ways, 'nucleus' and 'particle'.  When represented by a nucleus, the particle is shown as an image of
 * two protons and two neutrons.  When represented as a particle, it is represented as a small magenta
 * circle.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  const Color = require( 'SCENERY/util/Color' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Utils = require( 'DOT/Utils' );

  // constants
  const SPACE_BORDER_WIDTH = 2;
  const SPACE_BORDER_COLOR = 'grey';
  const PARTICLE_TRACE_WIDTH = 1.5;
  const FADEOUT_SEGMENTS = 80;

  // TODO: Should the options object be renamed to 'config' because it has a required field?
  /**
   * @param {atomSpace} atomSpace - space containing atoms and particles
   * @param {Property} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view  transform
   * @param {Object} [options] - must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function ParticleSpaceNode( atomSpace, showAlphaTraceProperty, modelViewTransform, options ) {

    assert && assert( options && options.hasOwnProperty( 'canvasBounds' ), 'No canvasBounds specified.' );

    // the bounds should be eroded by 10 so it appears that particles glide into the space
    options.canvasBounds = options.canvasBounds.eroded( RSConstants.SPACE_BUFFER );

    options = merge( {
      particleStyle: 'nucleus', // 'nucleus'|'particle'
      particleTraceColor: new Color(255,0,255)
    }, options );
    this.particleStyle = options.particleStyle;
    this.particleTraceColor = options.particleTraceColor;

    CanvasNode.call( this, options );

    const self = this;

    // @private
    this.atomSpace = atomSpace;

    // @private
    this.alphaParticleImage = null;

    // @private - model to view coordinate transform
    this.modelViewTransform = modelViewTransform;

    // @private
    this.showAlphaTraceProperty = showAlphaTraceProperty;

    // @private
    this.particleTraceColorWithFade = 'rgba(' + options.particleTraceColor.r + ',' + options.particleTraceColor.g + ',' + options.particleTraceColor.b + ',{0})';

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
    alphaParticle.toImage( function( image, x, y ) {
      self.alphaParticleImage = image;
      self.particleImageHalfWidth = self.alphaParticleImage.width / 2;
      self.particleImageHalfHeight = self.alphaParticleImage.height / 2;
    } );

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'ParticleSpaceNode', ParticleSpaceNode );

  return inherit( CanvasNode, ParticleSpaceNode, {

    /**
     * A no/op function to be implemented by derived objects
     * @param {CanvasRenderingContext2D} context
     * @protected
     */
    paintSpace: function( context ) {
      assert && assert( false, 'subtype needs to implement' );
    },

    /**
     * @param {CanvasRenderingContext2D} context
     * @override
     * @private
     */
    paintCanvas: function( context ) {

      const self = this;

      const bounds = this.canvasBounds;
      const renderTrace = self.showAlphaTraceProperty.value;

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
      context.fillStyle = RSColorProfile.backgroundColorProperty.get().toCSS();
      context.rect( this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height );
      context.stroke();
      context.fill();
      context.clip();

      // render derived space
      this.paintSpace( context );

      // Slight chance the image used isn't loaded. In that case, return & try again on next frame
      if ( self.alphaParticleImage === null ) {
        return;
      }

      // render all alpha particles & corresponding traces in the space
      self.renderAlphaParticles( context, this.atomSpace, renderTrace );
    },

    /**
     * Render alpha particles that belong to a parent particleContainer
     * @param  {Context2D} context
     * @param  {Atom|AtomSpace} particleContainer
     * @param  {boolean} renderTrace
     * @private
     */
    renderAlphaParticles: function( context, particleContainer, renderTrace ) {
      const self = this;

      if ( renderTrace ) {

        // if style is 'nucleus' we can get away with rendering with one path for performance
        if ( self.particleStyle === 'nucleus' ) {
          context.beginPath();
          context.lineWidth = PARTICLE_TRACE_WIDTH;
          context.strokeStyle = self.particleTraceColor.getCanvasStyle();
        }
      }

      particleContainer.particles.forEach( function( particle ) {

        // render the traces (if enabled)
        if ( renderTrace ) {

          // add trace segments
          for ( let i = 1; i < particle.positions.length; i++ ) {
            if ( self.particleStyle === 'particle' ) {

              // if the style is of a 'particle', each segment needs a new path to create the gradient effect
              context.beginPath();
            }

            const segmentStartViewPosition = self.modelViewTransform.modelToViewPosition( particle.positions[ i - 1 ] );
            context.moveTo( segmentStartViewPosition.x, segmentStartViewPosition.y );
            const segmentEndViewPosition = self.modelViewTransform.modelToViewPosition( particle.positions[ i ] );
            context.lineTo( segmentEndViewPosition.x, segmentEndViewPosition.y );

            if ( self.particleStyle === 'particle' ) {

              // only the last FADEOUT_SEGMENTS should be visible, map i to the opacity
              const length = particle.positions.length;
              const alpha = Utils.linear( length - FADEOUT_SEGMENTS, length, 0, 0.5, i );
              const strokeStyle = StringUtils.format( self.particleTraceColorWithFade, alpha );
              context.strokeStyle = strokeStyle;
              context.stroke();
              context.closePath();
            }
          }
        }

        // render particle
        const particleViewPosition = self.modelViewTransform.modelToViewPosition( particle.positionProperty.get() );
        context.drawImage( self.alphaParticleImage,
          particleViewPosition.x - self.particleImageHalfWidth,
          particleViewPosition.y - self.particleImageHalfHeight );
      } );

      // render traces as single path in nucleus representation for performance
      if ( renderTrace ) {
        if ( self.particleStyle === 'nucleus' ) {
          context.stroke();
        }
      }
    }
  } ); // inherit
} ); // define
