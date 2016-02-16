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
  var AlphaParticleNode = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticleNode' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  /**
   * @param {AtomModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} options - must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function ParticleSpaceNode( model, modelViewTransform, options ) {

    options = _.extend( {
    }, options );

    assert && assert( ( options.hasOwnProperty( 'canvasBounds' ) ), 'No canvas bound specified.' );

    CanvasNode.call( this, options );

    // register callbacks for particle additions/removals
    var thisNode = this;
    model.registerParticleCallback( function( alphaParticle ) {
      console.log( 'particleCallback' );

      // add new alpha particle
      var particle = new AlphaParticleNode( alphaParticle, modelViewTransform );
      particle.translate( alphaParticle.position.x, alphaParticle.position.y );

      thisNode.addChild( particle );
    } );

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'ParticleSpaceNode', ParticleSpaceNode );

  return inherit( CanvasNode, ParticleSpaceNode, {

    // @public
    step: function( dt ) {
      this.invalidatePaint();
    },

    /**
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

        var bounds = this.canvasBounds;

        // clear
        context.fillStyle = 'black';
        context.fillRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());

        // render derivied space
        this.paintSpace();

        // render atom/particles

        // border
        context.lineWidth = 2;
        context.strokeStyle = 'grey';
        context.strokeRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());
    }

  } ); // inherit

} ); // define
