// Copyright 2016-2025, University of Colorado Boulder

/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import optionize, { type EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import Rectangle, { RectangleOptions } from '../../../../scenery/js/nodes/Rectangle.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSConstants from '../RSConstants.js';

type SelfOptions = EmptySelfOptions;

type BeamNodeOptions = SelfOptions & RectangleOptions;

class BeamNode extends Rectangle {

  public constructor( visibleProperty: Property<boolean>, providedOptions?: BeamNodeOptions ) {

    const options = optionize<BeamNodeOptions, SelfOptions, RectangleOptions>()( {
      fill: '#8f8f8f'
    }, providedOptions );

    super( 0, 0, RSConstants.BEAM_SIZE.width, RSConstants.BEAM_SIZE.height, options );

    // no need to unlink, this instance exists for the lifetime of the sim
    visibleProperty.linkAttribute( this, 'visible' );
  }
}

rutherfordScattering.register( 'BeamNode', BeamNode );

export default BeamNode;