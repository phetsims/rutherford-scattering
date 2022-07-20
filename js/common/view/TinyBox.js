// Copyright 2016-2022, University of Colorado Boulder

/**
 * Indicates the portion of the target material that is shown in the exploded view.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import { Shape } from '../../../../kite/js/imports.js';
import merge from '../../../../phet-core/js/merge.js';
import { Node, Path } from '../../../../scenery/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';

// constants
const BACK_DEPTH = 4;
const BACK_OFFSET = 0.10;
const BOX_SIZE = new Dimension2( 10, 10 );

class TinyBox extends Node {

  /**
   * @param {Object} [options]
   */
  constructor( options ) {

    options = merge( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 1
    }, options );

    const topNode = new Path( new Shape()
      .moveTo( BACK_OFFSET * BOX_SIZE.width, 0 )
      .lineTo( ( 1 - BACK_OFFSET ) * BOX_SIZE.width, 0 )
      .lineTo( BOX_SIZE.width, BACK_DEPTH )
      .lineTo( 0, BACK_DEPTH )
      .close(), options );

    assert && assert( !options.children, 'additional children not supported' );
    options.children = [ topNode ];

    super( options );
  }
}

rutherfordScattering.register( 'TinyBox', TinyBox );

export default TinyBox;