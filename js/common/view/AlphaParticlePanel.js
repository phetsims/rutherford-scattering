// Copyright 2015, University of Colorado Boulder

/**
 * View for the 'Alpha Particle Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var ControlSlider = require( 'RUTHERFORD_SCATTERING/common/view/ControlSlider' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var alphaParticlePropertiesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleProperties' );
  var showTracesString = require( 'string!RUTHERFORD_SCATTERING/showTraces' );
  var maxEnergyString = require( 'string!RUTHERFORD_SCATTERING/maxEnergy' );
  var minEnergyString = require( 'string!RUTHERFORD_SCATTERING/minEnergy' );
  var energyString = require( 'string!RUTHERFORD_SCATTERING/energy' );

  function AlphaParticlePanel( model, options ) {

    options = _.extend( {}, RSConstants.PANEL_OPTIONS, options );

    // Yellow "ALPHA PARTICLE" text as first row
    var panelTitleText = new Text( alphaParticlePropertiesString, RSConstants.PANEL_TITLE_TEXT_OPTIONS );

    var energyRange = RSConstants.INITIAL_SPEED_RANGE;

    var energyRangeLabels = { 
      minLabel: minEnergyString,
      maxLabel: maxEnergyString
    };

    // TODO: take the property from the model somewhere.
    var energyProperty = new Property( 1 ); // model.alasdf

    // Text elements for entries in Legend
    var energyText = new Text( energyString, {
      fill: RSConstants.ENERGY_COLOR,
      font: RSConstants.CONTROL_FONT
    } );

    var energyController = new ControlSlider( {
      title: energyText,
      property: energyProperty,
      range: energyRange,
      rangeLabels: energyRangeLabels,
      color: RSConstants.ENERGY_COLOR,
      withPicker: true
    } );


    // Checkbox to enable movement trails on alpha particles.
    // This text is like a <label> in that clicking it toggles the checkbox
    var tracesText = new Text( showTracesString, {
      fill: 'white',
      font: RSConstants.CONTROL_FONT
    } );

    var tracesCheckBox = new CheckBox( tracesText, energyProperty, {
      checkBoxColor: 'white',
      checkBoxColorBackground: 'black'
    } );

    var content = new LayoutBox( _.extend( {
      children: [
        panelTitleText,
        energyController,
        tracesCheckBox
      ]
    }, options ) );

    Panel.call( this, content, options );
  }

  return inherit( Panel, AlphaParticlePanel );
} );
