// Copyright 2002-2016, University of Colorado Boulder

/**
 * Visual representation of a alpha particle - protons, neutrons and a trace (if enabled)
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Path = require( 'SCENERY/nodes/Path' );
  var Shape = require( 'KITE/Shape' );

  /**
   * @param {AlphaParticleModel} model
   * @param {showAlphaTraceProperty} showTraceProperty
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function AlphaParticleNode( model, showTraceProperty, modelViewTransform, options ) {

    var thisNode = this;

    options = _.extend( {
    }, options );

    Node.call( this, options );

    var initialViewPosition = modelViewTransform.modelToViewPosition( model.position );

    // @protected - particle representation - FIXME: replace with real rep
    this.particleNode = new ShadedSphereNode ( 14.25, { mainColor: 'red'} );
    this.addChild( this.particleNode );

    // @protected  - particle path shape
    this.traceShape = new Shape();
    this.traceShape.moveToPoint( initialViewPosition );

    //@protected - trace representation
    this.traceNode = new Path( this.traceShape, {
        stroke: 'orange',
        lineWidth: 1
      } );
    this.addChild( this.traceNode );

    // @private - update particle location
    var positionListener = function( position ) {

      // update particle position
      var viewPosition = modelViewTransform.modelToViewPosition( position );
      thisNode.particleNode.translation = viewPosition;

      // add new position to shape
      thisNode.traceShape.lineToPoint( viewPosition );
    };
    model.positionProperty.link( positionListener );

    // @private - update particle trace visibility
    var showTraceListener = function( visible ) {
      thisNode.traceNode.setVisible( visible );
    };
    showTraceProperty.link( showTraceListener );

    // @private
    this.disposeAlphaParticleNode = function() {
      model.positionProperty.unlink( positionListener );
      showTraceProperty.unlink( showTraceListener );
    };

  }

  rutherfordScattering.register( 'AlphaParticleNode', AlphaParticleNode );

  return inherit( Node, AlphaParticleNode, {

    // @public
    dispose: function() {
      this.disposeAlphaParticleNode();
    }

  } ); //inherit

} ); // define
