// Copyright 2016-2020, University of Colorado Boulder

/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Rectangle from '../../../../scenery/js/nodes/Rectangle.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSConstants from '../RSConstants.js';

/**
 * @param {Property.<boolean>} visibleProperty - is the beam visible?
 * @param {Object} [options]
 * @constructor
 */
function BeamNode( visibleProperty, options ) {

  options = merge( {
    fill: '#8f8f8f'
  }, options );

  Rectangle.call( this, 0, 0, RSConstants.BEAM_SIZE.width, RSConstants.BEAM_SIZE.height, options );

  // no need to unlink, this instance exists for the lifetime of the sim
  visibleProperty.linkAttribute( this, 'visible' );
}

rutherfordScattering.register( 'BeamNode', BeamNode );

inherit( Rectangle, BeamNode );
export default BeamNode;