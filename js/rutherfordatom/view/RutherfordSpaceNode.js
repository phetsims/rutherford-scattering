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

    // @private - update proton count in atom node
    var protonCountListener = function( protonCount ) {
      console.log( 'protonCountListener' );
    };
    model.protonCountProperty.link( protonCountListener );

    // @private - update neutron count in atom node
    var neutronListener = function( neutron ) {
      console.log( 'neutronListener' );
    };
    model.neutronCountProperty.link( neutronListener );


    this.invalidatePaint();
  }

  rutherfordScattering.register( 'RutherfordSpaceNode', RutherfordSpaceNode );

  return inherit( ParticleSpaceNode, RutherfordSpaceNode, {

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
