// Copyright 2002-2016, University of Colorado Boulder

/**
 * ParticleSpaceNode is the space in which atoms and alpha particels are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  // constants
  var SPACE_BORDER_WIDTH = 2;
  var SPACE_BORDER_COLOR = 'grey';
  var PARTICLE_TRACE_WIDTH = 1.5;
  var PARTICLE_TRACE_COLOR = 'grey';

  /**
   * @param {AtomModel} model
   * @param {showAlphaTraceProperty} showTraceProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} options - must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function ParticleSpaceNode( model, showTraceProperty, modelViewTransform, options ) {

    assert && assert( ( options.hasOwnProperty( 'canvasBounds' ) ), 'No canvasBounds specified.' );

    options = _.extend( {
    }, options );

    CanvasNode.call( this, options );

    // @private
    var self = this;

    // @private
    this.model = model;

    // @private - model to view coordinate transform
    this.modelViewTransform = modelViewTransform;

    // @private
    this.showTraceProperty = showTraceProperty;

    // @private - the area to be used as the 'viewport', border not included
    this.clipRect = {
      x: this.canvasBounds.getX() + SPACE_BORDER_WIDTH / 2,
      y: this.canvasBounds.getY() + SPACE_BORDER_WIDTH / 2,
      width: this.canvasBounds.getWidth() - SPACE_BORDER_WIDTH,
      height: this.canvasBounds.getHeight() - SPACE_BORDER_WIDTH
    };

    // create a single alpha particle image to use for rendering all particles
    var alphaParticle = ParticleNodeFactory.alpha();
    alphaParticle.toImage( function( image, x, y ) {
      self.particleImage = image;
      self.particleImageHalfWidth = self.particleImage.width / 2;
      self.particleImageHalfHeight = self.particleImage.height / 2;
    } );

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'ParticleSpaceNode', ParticleSpaceNode );

  return inherit( CanvasNode, ParticleSpaceNode, {

    /**
     * A stub funtion to be implemented by derived objects (if needed)
     * @param {CanvasRenderingContext2D} context
     * @protected
     */
    paintSpace: function( context ) {
    },

    /**
     * @param {CanvasRenderingContext2D} context
     * @private
     */
    paintCanvas: function( context ) {

      var self = this;

      var bounds = this.canvasBounds;
      var renderTrace = self.showTraceProperty.value;

      // clear
      context.clearRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());

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

      // render derivied space
      this.paintSpace( context );

      // render all traces as one path for performance
      if( renderTrace ) {
        context.beginPath();
        context.lineWidth = PARTICLE_TRACE_WIDTH;
        context.strokeStyle = PARTICLE_TRACE_COLOR;
      }

      // render all alpha particles/traces
      this.model.particles.forEach( function( particle ) {

        // render the traces (if enabled)
        if( renderTrace ) {

          // render trace segments
          for (var i = 1; i < particle.positions.length; i++) {
            var segmentStartViewPosition = self.modelViewTransform.modelToViewPosition( particle.positions[i-1] );
            context.moveTo( segmentStartViewPosition.x, segmentStartViewPosition.y );
            var segmentEndViewPosition = self.modelViewTransform.modelToViewPosition( particle.positions[i] );
            context.lineTo( segmentEndViewPosition.x, segmentEndViewPosition.y );
          }
        }

        // render particle
        var particleViewPosition = self.modelViewTransform.modelToViewPosition( particle.position );
        context.drawImage( self.particleImage,
          particleViewPosition.x - self.particleImageHalfWidth,
          particleViewPosition.y - self.particleImageHalfHeight );
      } );

      if( renderTrace ) {
        context.stroke();
      }
    }

  } ); // inherit

} ); // define
