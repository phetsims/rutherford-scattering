// Copyright 2016-2021, University of Colorado Boulder

/**
 * Options menu for Rutherford Scattering.  Includes the option to use a 'projector' colors
 * profile so that it is easier to see the simulation when using a projector.
 *
 * @author Jesse Greenberg
 */

import OptionsDialog from '../../../../joist/js/OptionsDialog.js';
import ProjectorModeCheckbox from '../../../../joist/js/ProjectorModeCheckbox.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSColorProfile from '../RSColorProfile.js';

class MenuOptionsNode extends VBox {
  constructor() {

    const projectorCheckbox = new ProjectorModeCheckbox( RSColorProfile );

    super( {
      children: [ projectorCheckbox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left'
    } );
  }
}

rutherfordScattering.register( 'MenuOptionsNode', MenuOptionsNode );

export default MenuOptionsNode;