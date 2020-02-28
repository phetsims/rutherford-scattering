// Copyright 2016-2020, University of Colorado Boulder

/**
 * Options menu for Rutherford Scattering.  Includes the option to use a 'projector' colors
 * profile so that it is easier to see the simulation when using a projector.
 *
 * @author Jesse Greenberg
 */

import OptionsDialog from '../../../../joist/js/OptionsDialog.js';
import ProjectorModeCheckbox from '../../../../joist/js/ProjectorModeCheckbox.js';
import inherit from '../../../../phet-core/js/inherit.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSColorProfile from '../RSColorProfile.js';

/**
 * @constructor
 */
function MenuOptionsNode() {

  const projectorCheckbox = new ProjectorModeCheckbox( RSColorProfile );

  VBox.call( this, {
    children: [ projectorCheckbox ],
    spacing: OptionsDialog.DEFAULT_SPACING,
    align: 'left'
  } );
}

rutherfordScattering.register( 'MenuOptionsNode', MenuOptionsNode );

inherit( VBox, MenuOptionsNode );
export default MenuOptionsNode;