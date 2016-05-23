// Copyright 2002-2016, University of Colorado Boulder

/**
 * Factory for creating particle nodes.
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
  var SPECULAR_HIGHLITE_COLOR = 'rgb(200,200,200)';
  var ELECTRON_COLOR = 'rgb(135,135,205)';
  var PROTON_COLOR = 'rgb(255,69,0)';
  var NEUTRON_COLOR = 'rgb(192,192,192)';
  var PARTICLE_COLOR = 'rgb(255,0,255)';
  var ELECTRON_RADIUS = 2.5;
  var PROTON_RADIUS = 4;
  var NEUTRON_RADIUS = 4;
  var PARTICLE_RADIUS = 2;

  var ParticleNodeFactory = {

    /**
     * Creates an electron node.
     * @returns {Node}
     * @public
     */
    createElectron: function() {
      return new Node( {
        children: [
          new ParticleNode( ELECTRON_RADIUS, ELECTRON_COLOR )
        ]
      } );
    },

    /**
     * Creates a proton node.
     * @returns {Node}
     * @public
     */
    createProton: function() {
      return new Node( {
        children: [
          new ParticleNode( PROTON_RADIUS, PROTON_COLOR )
        ]
      } );
    },

    /**
     * Creates a neutron node.
     * @returns {Node}
     * @public
     */
    createNeutron: function() {
      return new Node( {
        children: [
          new ParticleNode( NEUTRON_RADIUS, NEUTRON_COLOR )
        ]
      } );
    },

    /**
     * Creates an alpha particle node, represented by two protons and two neutrons.
     * @returns {Node}
     * @public
     */
    createNucleusAlpha: function() {
      return new Node( {
        children: [
          new ParticleNode( NEUTRON_RADIUS, NEUTRON_COLOR, { x: NEUTRON_RADIUS - 1, y: -NEUTRON_RADIUS } ),
          new ParticleNode( NEUTRON_RADIUS, NEUTRON_COLOR, { x: -NEUTRON_RADIUS + 1, y: NEUTRON_RADIUS } ),
          new ParticleNode( PROTON_RADIUS, PROTON_COLOR, { x: -PROTON_RADIUS + 1, y: -PROTON_RADIUS + 1 } ),
          new ParticleNode( PROTON_RADIUS, PROTON_COLOR, { x: PROTON_RADIUS - 1, y: PROTON_RADIUS - 1 } )
        ]
      } );
    },

    /**
     * Creates an alpha particle node, represented by a small circle.
     * @return {Node} 
     * @public
     */
    createParticleAlpha: function() {
      return new Node( {
        children: [
          new Circle( PARTICLE_RADIUS, { fill: PARTICLE_COLOR } )
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
    options = options || {};
    assert && assert( !options.fill );

    options.fill = new RadialGradient( radius * 0.1, radius * 0.7, 0.2, -radius * 0.2, -radius * 0.3, radius * 2 )
      .addColorStop( 0, SPECULAR_HIGHLITE_COLOR )
      .addColorStop( 0.33, color )
      .addColorStop( 1, 'black' );
    Circle.call( this, radius, options );
  }

  rutherfordScattering.register( 'ParticleNodeFactory.ParticleNode', ParticleNode );

  inherit( Circle, ParticleNode );

  return ParticleNodeFactory;
} );
