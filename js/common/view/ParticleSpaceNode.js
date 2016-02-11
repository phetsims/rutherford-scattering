// Copyright 2016, University of Colorado Boulder

/**
 * SpaceNode is the space in which atoms and alpha particels are rendered.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ElectronNode = require( 'RUTHERFORD_SCATTERING/common/view/ElectronNode' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  /**
   * @param {AtomModel} model
   * @param { } [options], must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function SpaceNode( model, options ) {

    assert && assert( ( options.hasOwnProperty( 'canvasBounds' ) ), 'No canvas bound specified.' );

    CanvasNode.call( this, options );

    var electron = new ElectronNode();
    electron.translate( this.centerX, this.centerY );

    this.addChild( electron );
    //this.removeChild( electron ); // Smitty: remove particles from space


    this.invalidatePaint();
  }

  rutherfordScattering.register( 'SpaceNode', SpaceNode );

  return inherit( CanvasNode, SpaceNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @private
     */
    paintCanvas: function( context ) {

        var bounds = this.canvasBounds;

        // clear
        context.fillStyle = 'black';
        context.fillRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());

        // render atom/particles

        // border
        context.lineWidth = 2;
        context.strokeStyle = 'grey';
        context.strokeRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());
    },

    // @public
    step: function( dt ) {
      this.invalidatePaint();
    }

  } );
} );
