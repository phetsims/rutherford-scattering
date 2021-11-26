// Copyright 2016-2021, University of Colorado Boulder

/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import merge from '../../../../phet-core/js/merge.js';
import { Rectangle } from '../../../../scenery/js/imports.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSConstants from '../RSConstants.js';

class BeamNode extends Rectangle {

  /**
   * @param {Property.<boolean>} visibleProperty - is the beam visible?
   * @param {Object} [options]
   */
  constructor( visibleProperty, options ) {

    options = merge( {
      fill: '#8f8f8f'
    }, options );

    super( 0, 0, RSConstants.BEAM_SIZE.width, RSConstants.BEAM_SIZE.height, options );

    // no need to unlink, this instance exists for the lifetime of the sim
    visibleProperty.linkAttribute( this, 'visible' );
  }
}

rutherfordScattering.register( 'BeamNode', BeamNode );

export default BeamNode;