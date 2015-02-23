// Copyright 2002-2015, University of Colorado Boulder

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
  var constants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var alphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );
  var tracesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle.traces' );
  var energyMaxString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle.max' );
  var energyMinString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle.min' );
  var energyTitleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle.energy' );

  function AlphaParticlePanel( model, options ) {

    options = _.extend( constants.PANEL_OPTIONS, options );

    var controlOptions = {};
    var energyRange = constants.ENERGY_RANGE;
    energyRange.minLabel = energyMinString;
    energyRange.maxLabel = energyMaxString;

    // TODO: take the property from the model somewhere.
    var energyProperty = new Property( 1 ); // model.alasdf

    // Text elements for entries in Legend
    var alphaParticleText = new Text( alphaParticleString, constants.PANEL_TITLE_TEXT_OPTIONS );
    var energyText = new Text( energyTitleString, constants.PANEL_ENTRY_TEXT_OPTIONS );
    var tracesText = new Text( tracesString, constants.PANEL_ENTRY_TEXT_OPTIONS );


    var energyController = new ControlSlider( energyText, energyProperty, constants.ENERGY_RANGE, 'rgb(50,145,184)', false, controlOptions );


    // Checkbox to enable movement trails on alpha particles
    var tracesCheckBox = new CheckBox( tracesText, energyProperty, constants.CHECKBOX_OPTIONS );

    /**
     * "Alpha Particle"   (alphaParticleText)
     * "Energy"           (energyControl.energyTitleText)
     * |------|           (energyControl.energySlider)
     * [] "Traces"        (tracesCheckBox, tracesCheckBox.tracesText)
     */
    var content = new LayoutBox( _.extend( {
      children: [ alphaParticleText, energyController, tracesCheckBox ]
    }, options ) );

    Panel.call( this, content, options );
  }

  return inherit( Panel, AlphaParticlePanel );
} );