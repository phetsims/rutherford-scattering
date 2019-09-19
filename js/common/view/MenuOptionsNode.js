// Copyright 2016-2019, University of Colorado Boulder

/**
 * Options menu for Rutherford Scattering.  Includes the option to use a 'projector' colors
 * profile so that it is easier to see the simulation when using a projector.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const OptionsDialog = require( 'JOIST/OptionsDialog' );
  const ProjectorModeCheckbox = require( 'JOIST/ProjectorModeCheckbox' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const VBox = require( 'SCENERY/nodes/VBox' );

  /**
   * @constructor
   */
  function MenuOptionsNode() {

    const projectorCheckbox = new ProjectorModeCheckbox( RSColorProfile );

    VBox.call( this, _.extend( {
      children: [ projectorCheckbox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left'
    } ) );
  }

  rutherfordScattering.register( 'MenuOptionsNode', MenuOptionsNode );

  return inherit( VBox, MenuOptionsNode );
} );
