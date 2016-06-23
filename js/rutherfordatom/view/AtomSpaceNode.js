// Copyright 2002-2016, University of Colorado Boulder

/**
 * Space in which atoms and alpha particles are rendered.  In this representation, there are several
 * atoms in the space and the alpha particles are small particles, most of which travel through the
 * atoms undeflected.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  var AtomCollectionNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomCollectionNode' );
  var RSQueryParameters = require( 'RUTHERFORD_SCATTERING/common/RSQueryParameters' );
  var Path = require( 'SCENERY/nodes/Path' );

  // constants
  var DEBUG_SHAPES = RSQueryParameters.SHOW_DEBUG_SHAPES;

  /**
   * @param {RSBaseModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view transform
   * @param {Object} options - must provide {Bounds2} canvasBounds
   * @constructor
   */
  function AtomSpaceNode( model, showAlphaTraceProperty, modelViewTransform, options ) {
    
    assert && assert( options && options.hasOwnProperty( 'canvasBounds' ), 'No canvasBounds specified.' );

    options = _.extend( {
      particleStyle: 'particle'
    }, options );

    // @private - generates an image for the collection of atoms
    this.atomsNode = new AtomCollectionNode( model.atomSpace, modelViewTransform );

    ParticleSpaceNode.call( this, model.atomSpace, showAlphaTraceProperty, modelViewTransform, options );
    var self = this;

    if ( DEBUG_SHAPES ) {
      model.atomSpace.particleTransitionedEmitter.addListener( function( particle ) {
        // a particle has been transitioned to a new atom - show the bounding box of the particle
        self.addChild( new Path( modelViewTransform.modelToViewShape( particle.preparedBoundingBox ), { 
          stroke: 'rgb(114,183,188)'
        } ) );
      } );      
    }

  }

  rutherfordScattering.register( 'AtomSpaceNode', AtomSpaceNode );

  return inherit( ParticleSpaceNode, AtomSpaceNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @override
     * @protected
     */
    paintSpace: function( context ) {

      // Slight chance the image used isn't available. In that case, return & try again on next frame
      if ( !this.atomsNode.image ) {
        return;
      }

      var x = this.centerX - this.atomsNode.image.width / 2;
      var y = this.centerY - this.atomsNode.image.height / 2;
      context.drawImage( this.atomsNode.image, x, y, this.atomsNode.image.width, this.atomsNode.image.height );
    }

  } ); // inherit

} ); // define
