// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Legend Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var constants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var Text = require( 'SCENERY/nodes/Text' );

  // images
  var legendAlphaParticleImageSrc = require( "image!RUTHERFORD_SCATTERING/testImage.png" );
  var legendElectronImageSrc = require( "image!RUTHERFORD_SCATTERING/testImage.png" );
  var legendNeutronImageSrc = require( "image!RUTHERFORD_SCATTERING/testImage.png" );
  var legendProtonImageSrc = require( "image!RUTHERFORD_SCATTERING/testImage.png" );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' );
  var legendAlphaParticleString = require( 'string!RUTHERFORD_SCATTERING/legend.alphaParticle' );
  var legendElectronString = require( 'string!RUTHERFORD_SCATTERING/legend.electron' );
  var legendNeutronString = require( 'string!RUTHERFORD_SCATTERING/legend.neutron' );
  var legendProtonString = require( 'string!RUTHERFORD_SCATTERING/legend.proton' );


  function LegendPanel( model, options ) {

    options = _.extend( constants.PANEL_OPTIONS, options );

    // Predefined options for a horizontal LayoutBox containing [icon, text]
    var rowOptions = {
      orientation: 'horizontal',
      spacing: 4
    };

    // title for this panel
    var legendText = new Text( legendString, constants.PANEL_TITLE_TEXT_OPTIONS );

    // rows contain an icon Image and label Text that create a legend description
    var legendAlphaParticleRow = new LayoutBox( _.extend( {
      children: [ new Image( legendAlphaParticleImageSrc ), new Text( legendAlphaParticleString, constants.PANEL_ENTRY_TEXT_OPTIONS ) ]
    }, rowOptions ) );

    var legendElectronRow = new LayoutBox( _.extend( {
      children: [ new Image( legendElectronImageSrc ), new Text( legendElectronString, constants.PANEL_ENTRY_TEXT_OPTIONS ) ]
    }, rowOptions ) );

    var legendNeutronRow = new LayoutBox( _.extend( {
      children: [ new Image( legendNeutronImageSrc ), new Text( legendNeutronString, constants.PANEL_ENTRY_TEXT_OPTIONS ) ]
    }, rowOptions ) );

    var legendProtonRow = new LayoutBox( _.extend( {
      children: [ new Image( legendProtonImageSrc ), new Text( legendProtonString, constants.PANEL_ENTRY_TEXT_OPTIONS ) ]
    }, rowOptions ) );

    /**
     * "Legend"                 (legendText)
     * <img> "Alpha Particle"   (legendAlphaParticleRow)
     * <img> "Neutron"          (legendNeutronRow)
     * <img> "Proton"           (legendProtonRow)
     * <img> "Election"         (legendElectronRow)
     */
    var content = new LayoutBox( _.extend( {
      children: [ legendText, legendElectronRow, legendProtonRow, legendNeutronRow, legendAlphaParticleRow ]
    }, options ) );

    Panel.call( this, content, options );
  }

  return inherit( Panel, LegendPanel );
} );