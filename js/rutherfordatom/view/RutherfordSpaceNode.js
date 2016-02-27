// Copyright 2002-2016, University of Colorado Boulder

/**
 * RutherfordSpaceNode is the space in which atoms and alpha particles are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  var RutherfordAtomNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordAtomNode' );


  /**
   * @param {AtomModel} model
   * @param {showAlphaTraceProperty} traceProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param { } options, must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function RutherfordSpaceNode( model, traceProperty, modelViewTransform, options ) {

    assert && assert( ( options.hasOwnProperty( 'canvasBounds' ) ), 'No canvasBounds specified.' );

    options = _.extend( {
    }, options );

    ParticleSpaceNode.call( this, model, traceProperty, modelViewTransform, options );

    // @private - atom image generator
    this.atomNode = new RutherfordAtomNode( model );

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'RutherfordSpaceNode', RutherfordSpaceNode );

  return inherit( ParticleSpaceNode, RutherfordSpaceNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @protected
     */
    paintSpace: function( context ) {
      if( this.atomNode.image === null ) {
        return;
      }

      var x = this.centerX - this.atomNode.image.width / 2;
      var y = this.centerY - this.atomNode.image.height / 2;
      context.drawImage( this.atomNode.image, x, y, this.atomNode.image.width, this.atomNode.image.height );
    }

  } ); // inherit

} ); // define
