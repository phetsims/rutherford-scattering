// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Legend Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );

  // images
  var LegendAlphaParticleImageSrc = require( "image!RUTHERFORD_SCATTERING/testImage.png" );
  var LegendElectronImageSrc = require( "image!RUTHERFORD_SCATTERING/testImage.png" );
  var LegendNeutronImageSrc = require( "image!RUTHERFORD_SCATTERING/testImage.png" );
  var LegendProtonImageSrc = require( "image!RUTHERFORD_SCATTERING/testImage.png" );

  // strings
  var LegendString = require( 'string!RUTHERFORD_SCATTERING/legend' );
  var LegendAlphaParticleString = require( 'string!RUTHERFORD_SCATTERING/legend.alphaParticle' );
  var LegendElectronString = require( 'string!RUTHERFORD_SCATTERING/legend.electron' );
  var LegendNeutronString = require( 'string!RUTHERFORD_SCATTERING/legend.neutron' );
  var LegendProtonString = require( 'string!RUTHERFORD_SCATTERING/legend.proton' );


  function LegendPanel( model, options ) {

    options = _.extend( {
      align: 'left',
      spacing: 1,
      stroke: 'white',
      fill: 'black',
      lineWidth: 3,
      headerFontSize: 18,
      headerFontColor: 'yellow',
      subtextFontSize: 15,
      subtextFontColor: 'white',
      rowOrientation: 'horizontal',
      rowSpacing: 10,
      xMargin: 10,
      yMargin: 10
    },
    options );

    // Text elements for entries in Legend
    var legendText = new Text( LegendString, {
      font: new PhetFont( options.headerFontSize ),
      fill: options.headerFontColor
    } );

    var legendAlphaParticleText = new Text( LegendAlphaParticleString, {
      font: new PhetFont( options.subtextFontSize ),
      fill: options.subtextFontColor
    } );

    var legendElectronText = new Text( LegendElectronString, {
      font: new PhetFont( options.subtextFontSize ),
      fill: options.subtextFontColor
    } );

    var legendNeutronText = new Text( LegendNeutronString, {
      font: new PhetFont( options.subtextFontSize ),
      fill: options.subtextFontColor
    } );

    var legendProtonText = new Text( LegendProtonString, {
      font: new PhetFont( options.subtextFontSize ),
      fill: options.subtextFontColor
    } );

    // rows contain an icon Image and label Text that create a legend description
    var LegendAlphaParticleRow = new LayoutBox( {
      orientation: options.rowOrientation,
      spacing: options.rowSpacing,
      children: [ new Image( LegendAlphaParticleImageSrc ), legendAlphaParticleText ]
    } );

    var LegendElectronRow = new LayoutBox( {
      orientation: options.rowOrientation,
      spacing: options.rowSpacing,
      children: [ new Image( LegendElectronImageSrc ), legendElectronText ]
    } );

    var LegendNeutronRow = new LayoutBox( {
      orientation: options.rowOrientation,
      spacing: options.rowSpacing,
      children: [ new Image( LegendNeutronImageSrc ), legendNeutronText ]
    } );

    var LegendProtonRow = new LayoutBox( {
      orientation: options.rowOrientation,
      spacing: options.rowSpacing,
      children: [ new Image( LegendProtonImageSrc ), legendProtonText ]
    } );

    var content = new LayoutBox( {
      align: options.align,
      spacing: options.spacing,
      width: options.rectWidth,
      children: [ legendText, LegendElectronRow, LegendProtonRow, LegendNeutronRow, LegendAlphaParticleRow ]
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, LegendPanel );
} );