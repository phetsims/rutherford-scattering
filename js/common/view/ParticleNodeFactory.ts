// Copyright 2016-2025, University of Colorado Boulder

/**
 * Factory for creating particle nodes.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import platform from '../../../../phet-core/js/platform.js';
import ArrowNode from '../../../../scenery-phet/js/ArrowNode.js';
import Circle, { CircleOptions } from '../../../../scenery/js/nodes/Circle.js';
import Image from '../../../../scenery/js/nodes/Image.js';
import Line from '../../../../scenery/js/nodes/Line.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Color from '../../../../scenery/js/util/Color.js';
import RadialGradient from '../../../../scenery/js/util/RadialGradient.js';
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
   */
  createElectron(): Node {
    return new ParticleNode( ELECTRON_RADIUS, ELECTRON_COLOR );
  },

  /**
   * Creates a proton node.
   */
  createProton(): Node {
    return new ParticleNode( PROTON_RADIUS, PROTON_COLOR );
  },

  /**
   * Creates a neutron node.
   */
  createNeutron(): Node {
    return new ParticleNode( NEUTRON_RADIUS, NEUTRON_COLOR );
  },

  /**
   * Draw a proton with canvas using the provided context
   */
  drawProtonWithCanvas( x: number, y: number, context: CanvasRenderingContext2D ): void {
    drawParticleWithCanvas( x, y, PROTON_RADIUS, PROTON_COLOR, context );
  },

  /**
   * Draw a neutron with canvas using the provided context
   */
  drawNeutronWithCanvas( x: number, y: number, context: CanvasRenderingContext2D ): void {
    drawParticleWithCanvas( x, y, NEUTRON_RADIUS, NEUTRON_COLOR, context );
  },

  /**
   * Creates a nucleus node, represented by a small circle.
   */
  createNucleus(): Node {
    return new Circle( NUCLEUS_RADIUS, { fill: RSColors.nucleusColorProperty } );
  },

  /**
   * Create an icon for the legend describing the energy level of an electron
   */
  createEnergyLevel(): Node {
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
   */
  createParticleTrace(): Node {
    return new ArrowNode( 0, 0, 20, 0, {
      fill: PARTICLE_COLOR,
      tailWidth: 2,
      headHeight: 10
    } );
  },

  /**
   * Creates an alpha particle node, represented by two protons and two neutrons.
   */
  createNucleusAlpha(): Node {
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
   */
  createParticleAlpha(): Node {
    return new Circle( PARTICLE_RADIUS, { fill: PARTICLE_COLOR } );
  },

  /**
   * Creates a plum pudding image.
   */
  createPlumPuddingIcon(): Node {
    return new Image( plumPuddingIcon_png, { scale: 0.06 } );
  }

};

rutherfordScattering.register( 'ParticleNodeFactory', ParticleNodeFactory );

type ParticleNodeSelfOptions = EmptySelfOptions;

type ParticleNodeOptions = ParticleNodeSelfOptions & CircleOptions;

class ParticleNode extends Circle {

  public constructor( radius: number, color: Color | string, providedOptions?: ParticleNodeOptions ) {
    const options = combineOptions<ParticleNodeOptions>( {
      fill: new RadialGradient( radius * 0.1, radius * 0.7, 0.2, -radius * 0.2, -radius * 0.3, radius * 2 )
        .addColorStop( 0, SPECULAR_HIGHLITE_COLOR )
        .addColorStop( 0.33, color )
        .addColorStop( 1, 'black' )
    }, providedOptions );
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
const drawParticleWithCanvas = (
  x: number,
  y: number,
  radius: number,
  color: string,
  context: CanvasRenderingContext2D ) => {
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