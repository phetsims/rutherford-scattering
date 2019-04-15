// Copyright 2016-2017, University of Colorado Boulder

/**
 * Factory for creating particle nodes.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var ArrowNode = require( 'SCENERY_PHET/ArrowNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Line = require( 'SCENERY/nodes/Line' );
  var Node = require( 'SCENERY/nodes/Node' );
  var RadialGradient = require( 'SCENERY/util/RadialGradient' );
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // constants
  var SPECULAR_HIGHLITE_COLOR = 'rgb(200,200,200)';
  var ELECTRON_COLOR = 'rgb(135,135,205)';
  var PROTON_COLOR = 'rgb(255,69,0)';
  var NEUTRON_COLOR = 'rgb(192,192,192)';
  var PARTICLE_COLOR = 'rgb(255,0,255)';
  var ENERGY_LEVEL_COLOR = 'rgb(128,128,128)';
  var ELECTRON_RADIUS = 2.5;
  var PROTON_RADIUS = 4;
  var NEUTRON_RADIUS = 4;
  var PARTICLE_RADIUS = 2;
  var NUCLEUS_RADIUS = 2;
  var ENERGY_LEVEL_LINE_LENGTH = 5;

  // images
  var plumPuddingImage = require( 'image!RUTHERFORD_SCATTERING/plumPuddingIcon.png' );

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
     * Draw a proton with canvas using the provided context
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {CanvasRenderingContext2D} context
     */
    drawProtonWithCanvas: function( x, y, context) {
      drawParticleWithCanvas( x, y, PROTON_RADIUS, PROTON_COLOR, context );
    },

    /**
     * Draw a neutron with canvas using the provided context
     *
     * @param  {number} x
     * @param  {number} y
     * @param  {CanvasRenderingContext2D} context
     */
    drawNeutronWithCanvas: function( x, y, context ) {
      drawParticleWithCanvas( x, y, NEUTRON_RADIUS, NEUTRON_COLOR, context );
    },

    /**
     * Creates a nucleus node, represented by a small circle.
     * @returns {Node}
     * @public
     */
    createNucleus: function() {
      return new Node( {
        children: [
          new Circle( NUCLEUS_RADIUS, { fill: RSColorProfile.nucleusColorProperty } )
        ]
      } );
    },

    /**
     * Create an icon for the legend describing the energy level of an electron
     * @returns {Node} [description]
     */
    createEnergyLevel: function() {
      return new Node( {
        children: [
          new Line( 0, 0, ENERGY_LEVEL_LINE_LENGTH, 0, { stroke: ENERGY_LEVEL_COLOR } ),
          new Line( 2 * ENERGY_LEVEL_LINE_LENGTH, 0, 3 * ENERGY_LEVEL_LINE_LENGTH, 0, { stroke: ENERGY_LEVEL_COLOR } ),
          new Line( 4 * ENERGY_LEVEL_LINE_LENGTH, 0, 5 * ENERGY_LEVEL_LINE_LENGTH, 0, {stroke: ENERGY_LEVEL_COLOR } )
        ]
      } );
    },

    /**
     * Create an icon for the legend describing the particle trace, represented as an arrow
     * @returns {Node}
     */
    createParticleTrace: function() {
      return new Node( {
        children: [
          new ArrowNode( 0, 0, 20, 0, {
            fill: PARTICLE_COLOR,
            tailWidth: 2,
            headHeight: 10
          } )
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
     * @returns {Node}
     * @public
     */
    createParticleAlpha: function() {
      return new Node( {
        children: [
          new Circle( PARTICLE_RADIUS, { fill: PARTICLE_COLOR } )
        ]
      } );
    },

    /**
     * Creates a plum pudding image.
     * @returns {Node}
     * @public
     */
    createPlumPuddingIcon: function() {
      return new Node( {
        children: [
          new Image( plumPuddingImage, { scale: 0.06 } )
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

  inherit( Circle, ParticleNode );

  /**
   * Draw a particle on a canvas using the provided context.  The particle is at location (x,y) in the
   * coordinate frames of the canvas.
   *
   * @param  {number} x
   * @param  {number} y
   * @param  {number} radius
   * @param  {string} color
   * @param  {CanvasRenderingContext2D} context
   * @private
   */
  var drawParticleWithCanvas = function( x, y, radius, color, context ) {
    // draw the circle
    context.beginPath();
    context.arc( x, y, radius, 0, 2 * Math.PI, false);

    // create the radial gradient from the center of the arc
    var gradient = context.createRadialGradient( x + radius * 0.1, y + radius * 0.7, 0.2, x + -radius * 0.2, y + -radius * 0.3, radius * 2 );
    gradient.addColorStop( 0, SPECULAR_HIGHLITE_COLOR );
    gradient.addColorStop( 0.33, color );
    gradient.addColorStop( 1, 'black' );
    context.fillStyle = gradient;

    // fill and close so that the context can be used to draw more particles
    context.fill();
    context.closePath();
  };

  return ParticleNodeFactory;
} );
