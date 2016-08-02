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
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Text = require( 'SCENERY/nodes/Text' );
  var CheckBox = require( 'SUN/CheckBox' );
  var RSGlobals = require( 'RUTHERFORD_SCATTERING/common/RSGlobals' );
  var OptionsDialog = require( 'JOIST/OptionsDialog' );

  // strings
  var optionsProjectorColorsString = require( 'string!RUTHERFORD_SCATTERING/options.projectorColors' );

  /**
   *
   * @constructor
   */
  function MenuOptionsNode( model ) {
    var children = [];

    children.push( new CheckBox( new Text( optionsProjectorColorsString, { font: OptionsDialog.DEFAULT_FONT } ),
      RSGlobals.projectorColorsProperty, {} ) );

    VBox.call( this, _.extend( {
      children: children,
      spacing: OptionsDialog.DEFAULT_SPACING,
      align: 'left'
    } ) );
  }

  rutherfordScattering.register( 'MenuOptionsNode', MenuOptionsNode );

  return inherit( VBox, MenuOptionsNode );
} );
