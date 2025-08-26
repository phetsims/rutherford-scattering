// Copyright 2016-2025, University of Colorado Boulder

/**
 * Indicates the portion of the target material that is shown in the exploded view.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import Shape from '../../../../kite/js/Shape.js';
import { combineOptions } from '../../../../phet-core/js/optionize.js';
import Path, { PathOptions } from '../../../../scenery/js/nodes/Path.js';
import rutherfordScattering from '../../rutherfordScattering.js';

// constants
const BACK_DEPTH = 4;
const BACK_OFFSET = 0.10;
const BOX_SIZE = new Dimension2( 10, 10 );

class TinyBox extends Path {

  public constructor( providedOptions?: PathOptions ) {

    const options = combineOptions<PathOptions>( {
      fill: 'black',
      stroke: 'white',
      lineWidth: 1
    }, providedOptions );

    super( new Shape()
      .moveTo( BACK_OFFSET * BOX_SIZE.width, 0 )
      .lineTo( ( 1 - BACK_OFFSET ) * BOX_SIZE.width, 0 )
      .lineTo( BOX_SIZE.width, BACK_DEPTH )
      .lineTo( 0, BACK_DEPTH )
      .close(), options );
  }
}

rutherfordScattering.register( 'TinyBox', TinyBox );

export default TinyBox;