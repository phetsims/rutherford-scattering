// Copyright 2002-2016, University of Colorado Boulder

/**
 * Factory for creating particle images.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );

  // constants
  var ELECTRON_COLOR = 'rgb(96,96,255)';
  var PROTON_COLOR = 'rgb(255,69,0)';
  var NEUTRON_COLOR = 'rgb(192,192,192)';

  var ELECTRON_RADIUS = 3;
  var PROTON_RADIUS = 4;
  var NEUTRON_RADIUS = 4;

  /**
    * Factory methods to generate nodes for specific particle types
    * @returns {Node}
    * @public
    */
  var ParticleNodeFactory = {

    // Electron
    electron: function() {
      return new Node( {
        children: [
          new ParticleNode( ELECTRON_RADIUS, ELECTRON_COLOR )
        ]
      } );
    },

    // Proton
    proton: function() {
      return new Node( {
        children: [
          new ParticleNode( PROTON_RADIUS, PROTON_COLOR )
        ]
      } );
    },

    // Neutron
    neutron: function() {
      return new Node( {
        children: [
          new ParticleNode( NEUTRON_RADIUS, NEUTRON_COLOR )
        ]
      } );
    },

    // Alpha
    alpha: function() {
      return new Node( {
        children: [
          new ParticleNode( NEUTRON_RADIUS, NEUTRON_COLOR, { x: NEUTRON_RADIUS-1, y: -NEUTRON_RADIUS } ),
          new ParticleNode( NEUTRON_RADIUS, NEUTRON_COLOR, { x: -NEUTRON_RADIUS+1, y: NEUTRON_RADIUS } ),
          new ParticleNode( PROTON_RADIUS, PROTON_COLOR, { x: -PROTON_RADIUS+1, y: -PROTON_RADIUS+1 } ),
          new ParticleNode( PROTON_RADIUS, PROTON_COLOR, { x: PROTON_RADIUS-1, y: PROTON_RADIUS-1 } )
        ]
      } );
    }

  };

  rutherfordScattering.register( 'ParticleNodeFactory', ParticleNodeFactory );

  /**
   * @param {number} radius
   * @param {Color|String} color
   * @param {Object} [options]
   * @constructor
   * @private
   */
  function ParticleNode( radius, color, options ) {
    var gradient = new RadialGradient( radius * 0.1, radius * 0.7, 0.2, -radius * 0.2, -radius * 0.3, radius * 2 )
      .addColorStop( 0, 'white' )
      .addColorStop( 0.33, color )
      .addColorStop( 1, 'black' );
    Circle.call( this, radius, _.extend( { fill: gradient }, options ) );
  }

  rutherfordScattering.register( 'ParticleNodeFactory.ParticleNode', ParticleNode );

  inherit( Circle, ParticleNode );

  return ParticleNodeFactory;
} );
