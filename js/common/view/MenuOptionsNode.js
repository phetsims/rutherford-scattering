// Copyright 2002-2016, University of Colorado Boulder

/**
 * Options menu for Rutherford Scattering.  Includes the option to use a 'projector' colors
 * profile so that it is easier to see the simulation when using a projector.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var inherit = require( 'PHET_CORE/inherit' );
  var OptionsDialog = require( 'JOIST/OptionsDialog' );
  var RSGlobals = require( 'RUTHERFORD_SCATTERING/common/RSGlobals' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var optionsProjectorModeString = require( 'string!RUTHERFORD_SCATTERING/options.projectorMode' );

  /**
   *
   * @constructor
   */
  function MenuOptionsNode( model ) {
    var children = [];

    children.push( new CheckBox( new Text( optionsProjectorModeString, { font: OptionsDialog.DEFAULT_FONT } ),
      RSGlobals.projectorModeProperty, {} ) );

    VBox.call( this, _.extend( {
      children: children,
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left'
    } ) );
  }

  rutherfordScattering.register( 'MenuOptionsNode', MenuOptionsNode );

  return inherit( VBox, MenuOptionsNode );
} );
