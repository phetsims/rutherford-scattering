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
  var Node = require( 'SCENERY/nodes/Node' );
  var Shape = require( 'KITE/Shape' );

  // constants
  var SPACE_BORDER_WIDTH = 2;

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
    var thisNode = this;

    // @private - active/visible particles/traces
    this.particleNodes = { };

    // @protected - visible area
    this.viewportNode = new Node();
    this.viewportNode.clipArea = Shape.rect(
      this.canvasBounds.getX() + SPACE_BORDER_WIDTH/2,
      this.canvasBounds.getY() + SPACE_BORDER_WIDTH/2,
      this.canvasBounds.getWidth() - SPACE_BORDER_WIDTH,
      this.canvasBounds.getHeight() - SPACE_BORDER_WIDTH);
    this.addChild( this.viewportNode );

    // register callbacks for particle addition
    model.registerAddParticleCallback( function( alphaParticle ) {

      // add new alpha particle
      var particleNode = new AlphaParticleNode( alphaParticle, showTraceProperty, modelViewTransform );
      thisNode.viewportNode.addChild( particleNode );

      // Save particle node
      thisNode.particleNodes[alphaParticle.id] = particleNode;
    } );

    // register callbacks for particle removal
    model.registerRemoveParticleCallback( function( alphaParticle ) {

      // remove alpha particle
      var particleNode = thisNode.particleNodes[alphaParticle.id];
      thisNode.viewportNode.removeChild( particleNode );
      delete thisNode.particleNodes[alphaParticle.id];
      particleNode.dispose();
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
        context.clearRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());

        // render derivied space
        this.paintSpace();

        // FIXME: render particles/traces here if performance problems
        // May have to rethink this.particleNodes additions/removals
        // i.e. context.drawImage( ... )

        // border
        context.lineWidth = SPACE_BORDER_WIDTH;
        context.strokeStyle = 'grey';
        context.strokeRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());
    }

  } ); // inherit

} ); // define
