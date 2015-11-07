// Copyright 2015, University of Colorado Boulder

/**
 * View for the 'Atom Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
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

    // Yellow "ATOM PROPERTIES" text as first row
    var panelTitleText = new Text( atomString, RSConstants.PANEL_TITLE_TEXT_OPTIONS );

    // Texts for sliders
    var protonText = new Text( protonString, {
      fill: RSConstants.PROTON_COLOR,
      font: RSConstants.CONTROL_FONT
    } );

    var neutronText = new Text( neutronString, {
      fill: RSConstants.NEUTRON_COLOR,
      font: RSConstants.CONTROL_FONT
    } );

    var protonController = new ControlSlider( {
      title: protonText,
      property: protonProperty,
      range: RSConstants.NUMBER_OF_PROTONS_RANGE,
      color: RSConstants.PROTON_COLOR,
      withPicker: true
    } );

    var neutronController = new ControlSlider( {
      title: neutronText,
      property: neutronProperty,
      range: RSConstants.NUMBER_OF_NEUTRONS_RANGE,
      color: RSConstants.NEUTRON_COLOR,
      withPicker: true
    } );

    var content = new LayoutBox( _.extend( {
      children: [ panelTitleText, protonController, neutronController ]
    }, options ) );

    Panel.call( this, content, options );
  }

  return inherit( Panel, AtomPanel );
} );