// Copyright 2016-2022, University of Colorado Boulder

/**
 * Factory for creating particle nodes.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import platform from '../../../../phet-core/js/platform.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import { Circle, Image, Line, Node, RadialGradient } from '../../../../scenery/js/imports.js';
import plumPuddingIcon_png from '../../../images/plumPuddingIcon_png.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSColors from '../RSColors.js';

// constants
const SPECULAR_HIGHLITE_COLOR = 'rgb(200,200,200)';
const ELECTRON_COLOR = 'rgb(135,135,205)';
const PROTON_COLOR = 'rgb(255,69,0)';
const NEUTRON_COLOR = 'rgb(192,192,192)';
const PARTICLE_COLOR = 'rgb(255,0,255)';
const ENERGY_LEVEL_COLOR = 'rgb(128,128,128)';
const ELECTRON_RADIUS = 2.5;
const PROTON_RADIUS = 4;
const NEUTRON_RADIUS = 4;
const PARTICLE_RADIUS = 2;
const NUCLEUS_RADIUS = 2;
const ENERGY_LEVEL_LINE_LENGTH = 5;


const ParticleNodeFactory = {

  /**
   * Creates an electron node.
   * @returns {Node}
   * @public
   */
  createElectron() {
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
  createProton() {
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
  createNeutron() {
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
  drawProtonWithCanvas( x, y, context ) {
    drawParticleWithCanvas( x, y, PROTON_RADIUS, PROTON_COLOR, context );
  },

  /**
   * Draw a neutron with canvas using the provided context
   *
   * @param  {number} x
   * @param  {number} y
   * @param  {CanvasRenderingContext2D} context
   */
  drawNeutronWithCanvas( x, y, context ) {
    drawParticleWithCanvas( x, y, NEUTRON_RADIUS, NEUTRON_COLOR, context );
  },

  /**
   * Creates a nucleus node, represented by a small circle.
   * @returns {Node}
   * @public
   */
  createNucleus() {
    return new Node( {
      children: [
        new Circle( NUCLEUS_RADIUS, { fill: RSColors.nucleusColorProperty } )
      ]
    } );
  },

  /**
   * Create an icon for the legend describing the energy level of an electron
   * @returns {Node} [description]
   */
  createEnergyLevel() {
    return new Node( {
      children: [
        new Line( 0, 0, ENERGY_LEVEL_LINE_LENGTH, 0, { stroke: ENERGY_LEVEL_COLOR } ),
        new Line( 2 * ENERGY_LEVEL_LINE_LENGTH, 0, 3 * ENERGY_LEVEL_LINE_LENGTH, 0, { stroke: ENERGY_LEVEL_COLOR } ),
        new Line( 4 * ENERGY_LEVEL_LINE_LENGTH, 0, 5 * ENERGY_LEVEL_LINE_LENGTH, 0, { stroke: ENERGY_LEVEL_COLOR } )
      ]
    } );
  },

  /**
   * Create an icon for the legend describing the particle trace, represented as an arrow
   * @returns {Node}
   */
  createParticleTrace() {
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
  createNucleusAlpha() {
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
  createParticleAlpha() {
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
  createPlumPuddingIcon() {
    return new Node( {
      children: [
        new Image( plumPuddingIcon_png, { scale: 0.06 } )
      ]
    } );
  }

};

rutherfordScattering.register( 'ParticleNodeFactory', ParticleNodeFactory );

class ParticleNode extends Circle {

  /**
   * @param {number} radius
   * @param {Color|String} color
   * @param {Object} [options]
   * @private
   */
  constructor( radius, color, options ) {
    options = options || {};
    assert && assert( !options.fill );

    options.fill = new RadialGradient( radius * 0.1, radius * 0.7, 0.2, -radius * 0.2, -radius * 0.3, radius * 2 )
      .addColorStop( 0, SPECULAR_HIGHLITE_COLOR )
      .addColorStop( 0.33, color )
      .addColorStop( 1, 'black' );
    super( radius, options );
  }
}

/**
 * Draw a particle on a canvas using the provided context.  The particle is at position (x,y) in the
 * coordinate frames of the canvas.
 *
 * @param  {number} x
 * @param  {number} y
 * @param  {number} radius
 * @param  {string} color
 * @param  {CanvasRenderingContext2D} context
 */
const drawParticleWithCanvas = ( x, y, radius, color, context ) => {
  // draw the circle
  context.beginPath();
  context.arc( x, y, radius, 0, 2 * Math.PI, false );

  const useConcentric = !!platform.safari;
  const x0 = useConcentric ? x - 0.066 : x + radius * 0.1;
  const y0 = useConcentric ? y + 0.2 * radius : y + radius * 0.7;
  const x1 = useConcentric ? x - 0.066 : x + -radius * 0.2;
  const y1 = useConcentric ? y + 0.2 * radius : y + -radius * 0.3;

  // create the radial gradient from the center of the arc
  const gradient = context.createRadialGradient( x0, y0, 0.2, x1, y1, radius * 2 );
  gradient.addColorStop( 0, SPECULAR_HIGHLITE_COLOR );
  gradient.addColorStop( 0.33, color );
  gradient.addColorStop( 1, 'black' );
  context.fillStyle = gradient;

  // fill and close so that the context can be used to draw more particles
  context.fill();
  context.closePath();
};

export default ParticleNodeFactory;