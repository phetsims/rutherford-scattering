// Copyright 2016, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim.  Allows the user to adust the number of protons and neutrons being simulated.
 *
 * @author Dave Schmitz (Schmitzware)

 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var HSlider = require( 'SUN/HSlider' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Text = require( 'SCENERY/nodes/Text' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // strings
  var atomPropertiesString = require( 'string!RUTHERFORD_SCATTERING/atomProperties' );
  var numberOfProtonsString = require( 'string!RUTHERFORD_SCATTERING/numberOfProtons' );
  var numberOfNeutronsString = require( 'string!RUTHERFORD_SCATTERING/numberOfNeutrons' );

  /**
   * Constructor for a Atom Properties control panel.
   *
   * @param { AtomModel } model - The model controlled by this panel.
   * @param {Tandem} tandem
   * @constructor
   */
  function AtomPropertiesPanel( model, tandem, options ) {

    options = _.extend( {
      xMargin: 5,
      yMargin: 5,
      align: 'left'
    }, options );

    // strings
    var font = new PhetFont( 12 );
    var atomPropertiesText = new Text( atomPropertiesString, { font: font, fontWeight: 'bold' } );
    var numProtonsText = new Text( numberOfProtonsString, { font: font } );
    var numNeutronsText = new Text( numberOfNeutronsString, { font: font } );
    var minText = new Text( "min", { font: font } );
    var maxText = new Text( "max", { font: font } );

    var sliderWidth = options.minWidth*0.8;

    // proton count slider
    var protonCountSlider = new HSlider( model.protonCountProperty, {
      min: model.minProtonCount,
      max: model.maxProtonCount
    }, {
      trackFill: 'white',
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: new Dimension2( 10, 20 ),
      majorTickLength: 10,
      tickLabelSpacing: 2
    } );
    protonCountSlider.addMajorTick( model.minProtonCount, new Text( model.minProtonCount, { font: font } ) );
    protonCountSlider.addMajorTick( model.maxProtonCount, new Text( model.maxProtonCount, { font: font } ) );

    // neutron count slider
    var neutronCountSlider = new HSlider( model.neutronCountProperty, {
      min: model.minNeutronCount,
      max: model.maxNeutronCount
    }, {
      trackFill: 'white',
      trackSize: new Dimension2( sliderWidth, 1 ),
      thumbSize: new Dimension2( 10, 20 ),
      majorTickLength: 10,
      tickLabelSpacing: 2
    } );
    neutronCountSlider.addMajorTick( model.minNeutronCount, new Text( model.minNeutronCount, { font: font } ) );
    neutronCountSlider.addMajorTick( model.maxNeutronCount, new Text( model.maxNeutronCount, { font: font } ) );

    var content = new VBox( {
      spacing: 8,
      top: 0,
      right: 0,
      align: 'left',
      children: [ atomPropertiesText , numProtonsText, protonCountSlider, numNeutronsText, neutronCountSlider ]
    } );

    Panel.call( this, content, options );
  }

  // Smitty: do I need this?
  rutherfordScattering.register( 'AtomPropertiesPanel', AtomPropertiesPanel );

  return inherit( Panel, AtomPropertiesPanel );

} );
