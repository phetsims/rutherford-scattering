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
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var HSlider = require( 'SUN/HSlider' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );


  // strings
  var alphaParticlePropertiesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticleProperties' );
  var energyString = require( 'string!RUTHERFORD_SCATTERING/energy' );
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
    var font = new PhetFont( 12 );
    var alphaParticlePropertiesText = new Text( alphaParticlePropertiesString, { font: font, fontWeight: 'bold' } );
    var energyText = new Text( energyString, { font: font } );
    var minEnergyText = new Text( minEnergyString, { font: font } );
    var maxEnergyText = new Text( maxEnergyString, { font: font } );

    // particle engery slider
    var sliderWidth = options.minWidth*0.8;
    var particleEnergySlider = new HSlider( model.alphaParticleEnergyProperty, {
      min: model.minAlphaParticleEnergy,
      max: model.maxAlphaParticleEnergy
    }, {
      trackFill: 'white',
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: new Dimension2( 10, 20 ),
      majorTickLength: 10,
      tickLabelSpacing: 2
    } );
    particleEnergySlider.addMajorTick( model.minAlphaParticleEnergy, minEnergyText );
    particleEnergySlider.addMajorTick( model.maxAlphaParticleEnergy, maxEnergyText );

    var content = new VBox( {
      spacing: 8,
      top: 0,
      right: 0,
      align: 'left',
      children: [ alphaParticlePropertiesText, energyText, particleEnergySlider ]
    } );

    Panel.call( this, content, options );
  }

  // Smitty: do I need this?
  rutherfordScattering.register( 'AlphaParticlePropertiesPanel', AlphaParticlePropertiesPanel );

  return inherit( Panel, AlphaParticlePropertiesPanel );

} );
