// Copyright 2016-2025, University of Colorado Boulder

/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import merge from '../../../../phet-core/js/merge.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSConstants from '../RSConstants.js';

class BeamNode extends Rectangle {

  public constructor( visibleProperty: Property<boolean>, providedOptions?: RectangleOptions ) {

    // TODO https://github.com/phetsims/rutherford-scattering/issues/181 Optionize
    // eslint-disable-next-line phet/bad-typescript-text
    const options = merge( {
      fill: '#8f8f8f'
    }, providedOptions );

    super( 0, 0, RSConstants.BEAM_SIZE.width, RSConstants.BEAM_SIZE.height, options );

    // no need to unlink, this instance exists for the lifetime of the sim
    visibleProperty.linkAttribute( this, 'visible' );
  }
}

rutherfordScattering.register( 'BeamNode', BeamNode );

export default BeamNode;