// Copyright 2002-2016, University of Colorado Boulder

/**
 * Visual representation of a alpha particle - protons & neutrons.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  /**
   * @param {AlphaParticleModel} model
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} [options]
   * @constructor
   */
  function AlphaParticleNode( model, modelViewTransform, options ) {

    var thisNode = this;

    options = _.extend( {
      mainColor: 'red',
      diameter: 14.25
    }, options );

    ShadedSphereNode.call( this, options.diameter, options );

    // particle location
    model.positionProperty.link( function( position ) {
      thisNode.translation = modelViewTransform.modelToViewPosition( position );
    } );
  }

  rutherfordScattering.register( 'AlphaParticleNode', AlphaParticleNode );

  return inherit( ShadedSphereNode, AlphaParticleNode, {

  } );
} );
