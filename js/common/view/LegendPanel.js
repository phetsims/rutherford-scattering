// Copyright 2002-2015, University of Colorado Boulder

/**
 * @author Jake Selig (PhET Intern 2015)
 *
 * View for the 'Legend Panel'.
 * Static, non-interactive.
 *
 * Should look roughly like this:
 *  ____________________
 * | LEGEND            |
 * | * Electron        |
 * | O Proton          |
 * | 0 Neutron         |
 * | % Alpha Particle  |
 * |___________________|
 *
 */
define( function( require ) {
  'use strict';

  // modules
  var AlphaParticleNode = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticleNode' );
  var ElectronNode = require( 'RUTHERFORD_SCATTERING/common/view/ElectronNode' );
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var NeutronNode = require( 'RUTHERFORD_SCATTERING/common/view/NeutronNode' );
  var Panel = require( 'SUN/Panel' );
  var ProtonNode = require( 'RUTHERFORD_SCATTERING/common/view/ProtonNode' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' ).value;
  var legendAlphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' ).value;
  var legendElectronString = require( 'string!RUTHERFORD_SCATTERING/electron' ).value;
  var legendNeutronString = require( 'string!RUTHERFORD_SCATTERING/neutron' ).value;
  var legendProtonString = require( 'string!RUTHERFORD_SCATTERING/proton' ).value;

  function LegendPanel( options ) {

    options = _.extend( {}, RSConstants.PANEL_OPTIONS, options );

    var particleIconOptions =  {
      scale: 1.2
    };

    // Yellow "LEGEND" text as first row
    var panelTitleText = new Text( legendString, RSConstants.PANEL_TITLE_TEXT_OPTIONS );

    // Icons
    var alphaParticleNode = new AlphaParticleNode( null, particleIconOptions );
    var electronNode = new ElectronNode( particleIconOptions );
    var neutronNode = new NeutronNode( particleIconOptions );
    var protonNode = new ProtonNode( particleIconOptions );

    // Rows have inequally sized icons but need to be spaced well.
    // Each icon will get a bounding box to make things pretty.

    var alphaParticleRowLayoutBox = _makeLayoutBoxRow( alphaParticleNode, legendAlphaParticleString );
    var electronRowLayoutBox = _makeLayoutBoxRow( electronNode, legendElectronString );
    var neutronRowLayoutBox = _makeLayoutBoxRow( neutronNode, legendNeutronString );
    var protonRowLayoutBox = _makeLayoutBoxRow( protonNode, legendProtonString );


    // single container that fits in root Panel element
    // Panel has less layout options that LayoutBox
    var content = new LayoutBox( _.extend( {
      children: [
        panelTitleText,
        electronRowLayoutBox,
        protonRowLayoutBox,
        neutronRowLayoutBox,
        alphaParticleRowLayoutBox
      ]
    }, options ) );

    Panel.call( this, content, options );
  }

  // Internal helper functions
  function _makeLayoutBoxRow( iconNode, rowString ) {
    // Should look something like this, where [] is a LayoutBox and 0 is an icon.
    // [ [  0  ] "text" ]
    var iconLayoutBox = new LayoutBox( { align: 'center' } );
    var iconLayoutBoxHStrut = new HStrut( 30 );
    var rowLayoutBox = new LayoutBox( RSConstants.LEGEND_PANEL_LAYOUT_BOX_OPTIONS );
    var rowText = new Text( rowString, RSConstants.PANEL_ENTRY_TEXT_OPTIONS );

    iconLayoutBox.addChild( iconLayoutBoxHStrut );
    iconLayoutBox.addChild( iconNode );
    rowLayoutBox.addChild( iconLayoutBox );
    rowLayoutBox.addChild( rowText );

    return rowLayoutBox;
  }

  return inherit( Panel, LegendPanel );
} );