// Copyright 2002-2016, University of Colorado Boulder

/**
 * PlumPuddingSpaceNode is the space in which atoms and alpha particles are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  var Image = require( 'SCENERY/nodes/Image' );

  // images
  var plumPuddingImage = require( 'image!RUTHERFORD_SCATTERING/plumPudding.png' );

  // constants
  var PLUM_PUDDING_IMAGE_MARGIN = 75;

  /**
   * @param {AtomModel} model
   * @param {showAlphaTraceProperty} traceProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param { } options, must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function PlumPuddingSpaceNode( model, traceProperty, modelViewTransform, options ) {

    assert && assert( ( options.hasOwnProperty( 'canvasBounds' ) ), 'No canvasBounds specified.' );

    options = _.extend( {
    }, options );

    ParticleSpaceNode.call( this, model, traceProperty, modelViewTransform, options );

    // add plum pudding image
    var plumPuddingImageNode = new Image( plumPuddingImage );

    // scale image to fill space & re-center - this is call order dependent
    var scale = Math.min( this.width, this.height )/
      ( Math.max( plumPuddingImageNode.width, plumPuddingImageNode.height ) + PLUM_PUDDING_IMAGE_MARGIN );
    plumPuddingImageNode.scale( scale, scale );
    plumPuddingImageNode.centerX = this.centerX;
    plumPuddingImageNode.centerY = this.centerY;
    this.viewportNode.addChild( plumPuddingImageNode );

    // FIXME: bake electron locations into image?

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'PlumPuddingSpaceNode', PlumPuddingSpaceNode );

  return inherit( ParticleSpaceNode, PlumPuddingSpaceNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @protected
    */
    paintSpace: function( context ) {

    },

    // @public
    step: function( dt ) {
      this.invalidatePaint();
    }

  } );
} );
