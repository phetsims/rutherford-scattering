// Copyright 2002-2016, University of Colorado Boulder

/**
 * Visual representation of a rutherford atom
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
  var Bounds2 = require( 'DOT/Bounds2' );

  // constants
  var OUTLINE_LINE_WIDTH = 1;
  var OUTLINE_STROKE_COLOR = 'orange';

  /**
   * @param {AtomModel} model
   * @param {Bounds2} spaceBounds - the bounds of the space which contains the atom
  * @param {Object} [options]
   * @constructor
   */
  function RutherfordAtomNode( model, spaceBounds, options ) {

    options = _.extend( {
    }, options );

    // FIXME: bounds to based on min radius of atom
    var bounds = new Bounds2( 0, 0, spaceBounds.getWidth() / 10, spaceBounds.getHeight() / 10 );

    CanvasNode.call( this, { canvasBounds: bounds } );

    this.model = model;

    // @private - update proton count in atom node
    var self = this;
    var protonCountListener = function( protonCount ) {
      self.toImage( function( image, x, y ) {
        self.image = image;
        self.invalidatePaint();
      } );
    };
    model.protonCountProperty.link( protonCountListener );

    // @private - update neutron count in atom node
    var neutronListener = function( neutronCount ) {
      self.toImage( function( image, x, y ) {
        self.image = image;
        self.invalidatePaint();
      } );
    };
    model.neutronCountProperty.link( neutronListener );

    // FIXME:
    // @private - update when user interaction occurs
    var userInteractionListener = function( userInteraction ) {
        self.toImage( function( image, x, y ) {
        self.image = image;
        self.invalidatePaint();
      } );
    };
    model.userInteractionProperty.link( userInteractionListener );

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'RutherfordAtomNode', RutherfordAtomNode );

  return inherit( CanvasNode, RutherfordAtomNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @private
     */
    paintCanvas: function( context ) {

      var bounds = this.canvasBounds;

      // clear
      context.clearRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());

      // outline rendering
      if ( this.model.userInteractionProperty.value ) {
        context.beginPath();
        context.lineWidth = OUTLINE_LINE_WIDTH;
        context.strokeStyle = OUTLINE_STROKE_COLOR;
        context.arc( bounds.centerX, bounds.centerY,
          Math.min( bounds.getWidth() / 2, bounds.getHeight() / 2 ), 0, 2*Math.PI );
        context.stroke();
      }
    }

  } ); // inherit

} ); // define
