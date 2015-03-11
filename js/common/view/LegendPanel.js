// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Legend Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // images
  var AlphaParticleNode = require( "RUTHERFORD_SCATTERING/common/view/AlphaParticleNode" );
  var ElectronNode = require( "RUTHERFORD_SCATTERING/common/view/ElectronNode" );
  var NeutronNode = require( "RUTHERFORD_SCATTERING/common/view/NeutronNode" );
  var ProtonNode = require( "RUTHERFORD_SCATTERING/common/view/ProtonNode" );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' );
  var legendAlphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );
  var legendElectronString = require( 'string!RUTHERFORD_SCATTERING/electron' );
  var legendNeutronString = require( 'string!RUTHERFORD_SCATTERING/neutron' );
  var legendProtonString = require( 'string!RUTHERFORD_SCATTERING/proton' );


  function LegendPanel( model, options ) {

    options = _.extend( {}, RSConstants.PANEL_OPTIONS, options );

    // Predefined options for a horizontal LayoutBox containing [icon, text]
    var rowOptions = {
      align: 'left',
      orientation: 'horizontal',
      spacing: 4
    };

    var headerTextOptions = {
      fill: 'gold',
      font: RSConstants.DEFAULT_FONT
    };

    var rowTextOptions = {
      fill: 'white',
      font: RSConstants.CONTROL_FONT
    };

    // title for this panel
    var legendText = new Text( legendString, headerTextOptions );

    // rows contain an icon Image and label Text that create a legend description
    var legendAlphaParticleRow = new LayoutBox( _.extend( {
      children: [ new AlphaParticleNode(), new Text( legendAlphaParticleString, rowTextOptions ) ]
    }, rowOptions ) );

    var legendElectronRow = new LayoutBox( _.extend( {
      children: [ new ElectronNode(), new Text( legendElectronString, rowTextOptions ) ]
    }, rowOptions ) );

    var legendNeutronRow = new LayoutBox( _.extend( {
      children: [ new NeutronNode(), new Text( legendNeutronString, rowTextOptions ) ]
    }, rowOptions ) );

    var legendProtonRow = new LayoutBox( _.extend( {
      children: [ new ProtonNode(), new Text( legendProtonString, rowTextOptions ) ]
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