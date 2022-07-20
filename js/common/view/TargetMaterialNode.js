// Copyright 2016-2022, University of Colorado Boulder

/**
 * The material target which which the particle gun is directed towards.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Shape } from '../../../../kite/js/imports.js';
import { LinearGradient, Node, Path } from '../../../../scenery/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';

// constants
const BACK_DEPTH = 30;
const BACK_OFFSET = 0.10;
const BOX_SIZE = new Dimension2( 120, 120 );
const BACK_COLOR = '#8c7e29';
const FRONT_COLOR = '#d6cb86';

class TargetMaterialNode extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = options || {};

    // top face, in perspective
    const topNode = new Path( new Shape()
      .moveTo( BACK_OFFSET * BOX_SIZE.width, 0 )
      .lineTo( ( 1 - BACK_OFFSET ) * BOX_SIZE.width, 0 )
      .lineTo( BOX_SIZE.width, BACK_DEPTH )
      .lineTo( 0, BACK_DEPTH )
      .close(), {
      fill: new LinearGradient( 0, 0, 0, BACK_DEPTH ).addColorStop( 0, BACK_COLOR ).addColorStop( 1, FRONT_COLOR ),
      stroke: 'black',
      lineWidth: 1
    } );

    assert && assert( !options.children, 'additional children not supported' );
    options.children = [ topNode ];

    super( options );
  }
}

rutherfordScattering.register( 'TargetMaterialNode', TargetMaterialNode );

export default TargetMaterialNode;