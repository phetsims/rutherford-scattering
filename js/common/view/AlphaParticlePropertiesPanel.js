// Copyright 2016, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim.  Allows the user to adust the energy of alpha particles being simulated.
 *
 * @author Dave Schmitz (Schmitzware)

 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Text = require( 'SCENERY/nodes/Text' );
  var HSlider = require( 'SUN/HSlider' );
  var CheckBox = require( 'SUN/CheckBox' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );


  // strings
  var alphaParticlePropertiesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleProperties' );
  var energyString = require( 'string!RUTHERFORD_SCATTERING/energy' );
  var showTracesString = require( 'string!RUTHERFORD_SCATTERING/showTraces' );
  var minEnergyString = require( 'string!RUTHERFORD_SCATTERING/minEnergy' );
  var maxEnergyString = require( 'string!RUTHERFORD_SCATTERING/maxEnergy' );

  /**
   * Constructor for a Alpha Particle Properties control panel.
   *
   * @param { AtomModel } model - The model controlled by this panel.
   * @param {Tandem} tandem
   * @param { } options
   * @constructor
   */
  function AlphaParticlePropertiesPanel( model, tandem, options ) {

    options = _.extend( {
      xMargin: 5,
      yMargin: 5,
      align: 'left'
    }, options );

    // strings
    var alphaParticlePropertiesText = new Text( alphaParticlePropertiesString, { font: options.titleFont, fontWeight: 'bold' } );
    var energyText = new Text( energyString, { font: options.propertyFont, fontWeight: 'bold' } );
    var minEnergyText = new Text( minEnergyString, { font: options.sliderTickfont } );
    var maxEnergyText = new Text( maxEnergyString, { font: options.sliderTickfont } );

    // particle engery slider
    var sliderWidth = options.minWidth*0.83;
    var particleEnergySlider = new HSlider( model.alphaParticleEnergyProperty, {
      min: RSConstants.MIN_ALPHA_ENERGY,
      max: RSConstants.MAX_ALPHA_ENERGY
    }, {
      trackFill: 'white',
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: new Dimension2( 10, 20 ),
      majorTickLength: 10,
      tickLabelSpacing: 2
    } );
    particleEnergySlider.addMajorTick( RSConstants.MIN_ALPHA_ENERGY, minEnergyText );
    particleEnergySlider.addMajorTick( RSConstants.MAX_ALPHA_ENERGY, maxEnergyText );

    // show traces
    var showTraceStrut = new HStrut(options.minWidth*0.05);
    var showTraceText = new Text( showTracesString, { font: options.propertyFont, fontWeight: 'bold' } );
    var showTraceCheckBox = new CheckBox(showTraceText, model.showAlphaTraceProperty, { } );
    var showTraceBox = new HBox( { children: [ showTraceStrut, showTraceCheckBox ] } );

    var content = new VBox( {
      spacing: 12,
      top: 0,
      right: 0,
      align: 'left',
      children: [ alphaParticlePropertiesText, energyText, particleEnergySlider, showTraceBox ]
    } );

    Panel.call( this, content, options );
  }

  // Smitty: do I need this?
  rutherfordScattering.register( 'AlphaParticlePropertiesPanel', AlphaParticlePropertiesPanel );

  return inherit( Panel, AlphaParticlePropertiesPanel );

} );
