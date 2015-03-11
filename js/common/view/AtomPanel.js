// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Atom Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color');
  var ControlSlider = require( 'RUTHERFORD_SCATTERING/common/view/ControlSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var atomString = require( 'string!RUTHERFORD_SCATTERING/atomProperties' );
  var neutronString = require( 'string!RUTHERFORD_SCATTERING/numberOfNeutrons' );
  var protonString = require( 'string!RUTHERFORD_SCATTERING/numberOfProtons' );

  function AtomPanel( model, options ) {

    options = _.extend( {}, RSConstants.PANEL_OPTIONS, options );

    // TODO: take the property from the model somewhere.
    var protonProperty = new Property( 1 ); // model.numProtons
    var neutronProperty = new Property( 1 ); // model.numNeutrons

    // Colors
    var protonColor = new Color( 255, 165, 0 );
    var neutronColor = new Color( 128, 128, 128 );

    // Text nodes
    var atomText = new Text( atomString, RSConstants.PANEL_TITLE_TEXT_OPTIONS );

    var protonText = new Text( protonString, _.extend( {}, RSConstants.PANEL_ENTRY_TEXT_OPTIONS, {
      fill: protonColor
    } ) );

    var neutronText = new Text( neutronString, _.extend( {}, RSConstants.PANEL_ENTRY_TEXT_OPTIONS, {
      fill: neutronColor
    } ) );

    var protonController = new ControlSlider( {
      title: protonText,
      property: protonProperty,
      range: RSConstants.NUMBER_OF_PROTONS_RANGE,
      color: protonColor,
      withPicker: true
    } );

    var neutronController = new ControlSlider( {
      title: neutronText,
      property: neutronProperty,
      range: RSConstants.NUMBER_OF_NEUTRONS_RANGE,
      color: neutronColor,
      withPicker: true
    } );

    var content = new LayoutBox( _.extend( {
      children: [ atomText, protonController, neutronController ]
    }, options ) );

    Panel.call( this, content, options );
  }

  return inherit( Panel, AtomPanel );
} );