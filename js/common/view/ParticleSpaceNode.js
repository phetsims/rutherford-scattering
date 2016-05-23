// Copyright 2002-2016, University of Colorado Boulder

/**
 * The space in which atoms and alpha particles are rendered.  The particles can be represented two 
 * ways, 'nucleus' and 'particle'.  When represented by a nucleus, the particle is shown as an image of
 * two protons and two neutrons.  When represented as a particle, it is represented as a small magenta
 * circle.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var Util = require( 'DOT/Util' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );

  // constants
  var SPACE_BORDER_WIDTH = 2;
  var SPACE_BORDER_COLOR = 'grey';
  var PARTICLE_TRACE_WIDTH = 1.5;
  var NUCLEUS_TRACE_COLOR = 'grey';
  var FADEOUT_SEGMENTS = 75;
  var PARTICLE_TRACE_COLOR = 'rgba(255,0,255,{0})'; // trace color fades out by number, inserted by StringUtils

  /**
   * @param {AlphaParticle[]} particles
   * @param {Property} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view  transform
   * @param {Object} options - must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function ParticleSpaceNode( atoms, showAlphaTraceProperty, modelViewTransform, options ) {

    assert && assert( options && options.hasOwnProperty( 'canvasBounds' ), 'No canvasBounds specified.' );

    options = _.extend( {
      particleStyle: 'nucleus' // 'nucleus'|'particle'
    }, options );
    this.particleStyle = options.particleStyle;

    CanvasNode.call( this, options );

    var self = this;

    // @private
    this.atoms = atoms;

    // @private
    this.alphaParticleImage = null;

    // @private - model to view coordinate transform
    this.modelViewTransform = modelViewTransform;

    // @private
    this.showAlphaTraceProperty = showAlphaTraceProperty;

    // @private - the area to be used as the 'viewport', border not included
    this.clipRect = {
      x: this.canvasBounds.getX() + SPACE_BORDER_WIDTH / 2,
      y: this.canvasBounds.getY() + SPACE_BORDER_WIDTH / 2,
      width: this.canvasBounds.getWidth() - SPACE_BORDER_WIDTH,
      height: this.canvasBounds.getHeight() - SPACE_BORDER_WIDTH
    };

    // create a single alpha particle image to use for rendering all particles - asynchronous
    var alphaParticle;
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

      var self = this;

      var bounds = this.canvasBounds;
      var renderTrace = self.showAlphaTraceProperty.value;

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
      context.rect( this.clipRect.x, this.clipRect.y, this.clipRect.width, this.clipRect.height );
      context.stroke();
      context.clip();

      // render derived space
      this.paintSpace( context );

      // Slight chance the image used isn't loaded. In that case, return & try again on next frame
      if ( self.alphaParticleImage === null ) {
        return;
      }

      // if style is 'nucleus' we can get away with rendering with one path for performance
      if ( renderTrace ) {
        if ( this.particleStyle === 'nucleus' ) {
          context.beginPath();
          context.lineWidth = PARTICLE_TRACE_WIDTH;
          context.strokeStyle = NUCLEUS_TRACE_COLOR;  
        }
      }

      // render all alpha particles & corresponding traces
      this.atoms.forEach( function( atom ) {
        atom.particles.forEach( function( particle ) {

          // render the traces (if enabled)
          if ( renderTrace ) {

            // add trace segments
            for ( var i = 1; i < particle.positions.length; i++ ) {
              if ( self.particleStyle === 'particle' ) {
                // if the style is of a 'particle', each segment needs a new path
                // to create the gradient effect
                context.beginPath();
              }

              var segmentStartViewPosition = self.modelViewTransform.modelToViewPosition( particle.positions[ i - 1 ] );
              context.moveTo( segmentStartViewPosition.x, segmentStartViewPosition.y );
              var segmentEndViewPosition = self.modelViewTransform.modelToViewPosition( particle.positions[ i ] );
              context.lineTo( segmentEndViewPosition.x, segmentEndViewPosition.y );

              if ( self.particleStyle === 'particle' ) {

                // only the last FADEOUT_SEGMENTS should be visible, map i to the opacity
                var length = particle.positions.length;
                var alpha = Util.linear( length - FADEOUT_SEGMENTS, length, 0, 0.5, i );
                var strokeStyle = StringUtils.format( PARTICLE_TRACE_COLOR, alpha );
                context.strokeStyle = strokeStyle;
                context.stroke();
                context.closePath();
              }
            }
          }

          // render particle
          var particleViewPosition = self.modelViewTransform.modelToViewPosition( particle.position );
          context.drawImage( self.alphaParticleImage,
            particleViewPosition.x - self.particleImageHalfWidth,
            particleViewPosition.y - self.particleImageHalfHeight );
        } );

      } );

      // render traces if 
      if ( renderTrace ) {
        if ( this.particleStyle === 'nucleus' ) {
          context.stroke();
        }
      }
    }

  } ); // inherit

} ); // define
