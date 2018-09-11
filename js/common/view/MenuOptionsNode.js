// Copyright 2016-2017, University of Colorado Boulder

/**
 * Options menu for Rutherford Scattering.  Includes the option to use a 'projector' colors
 * profile so that it is easier to see the simulation when using a projector.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var OptionsDialog = require( 'JOIST/OptionsDialog' );
  var ProjectorModeCheckbox = require( 'JOIST/ProjectorModeCheckbox' );
  var RSGlobals = require( 'RUTHERFORD_SCATTERING/common/RSGlobals' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  /**
   *
   * @constructor
   */
  function MenuOptionsNode( model ) {

    var projectorCheckbox = new ProjectorModeCheckbox( {
      projectorModeEnabledProperty: RSGlobals.projectorModeProperty
    } );

    VBox.call( this, _.extend( {
      children: [ projectorCheckbox ],
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left'
    } ) );
  }

  rutherfordScattering.register( 'MenuOptionsNode', MenuOptionsNode );

  return inherit( VBox, MenuOptionsNode );
} );
