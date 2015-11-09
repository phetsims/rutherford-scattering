// Copyright 2015, University of Colorado Boulder

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
  var Color = require( 'SCENERY/util/Color' );
  var ElectronNode = require( 'RUTHERFORD_SCATTERING/common/view/ElectronNode' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var NeutronNode = require( 'RUTHERFORD_SCATTERING/common/view/NeutronNode' );
  var Panel = require( 'SUN/Panel' );
  var ProtonNode = require( 'RUTHERFORD_SCATTERING/common/view/ProtonNode' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' );
  var alphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );
  var electronString = require( 'string!RUTHERFORD_SCATTERING/electron' );
  var neutronString = require( 'string!RUTHERFORD_SCATTERING/neutron' );
  var protonString = require( 'string!RUTHERFORD_SCATTERING/proton' );

  // constants
  var TEXT_COLOR = Color.WHITE;

  function LegendPanel( iconScale, titleFont, labelFont, options ) {

    options = _.extend( {}, RSConstants.PANEL_OPTIONS, options );

    var labelIconOptions = {
      scale: iconScale
    };

    var labelTextOptions = {
      font: labelFont,
      fill: TEXT_COLOR
    };

    // Yellow "LEGEND" text as first row
    var panelTitleText = new Text( legendString, RSConstants.PANEL_TITLE_TEXT_OPTIONS );

    // Label rows
    var alphaParticleNode = AlphaParticleNode.createImage( labelIconOptions );
    var alphaParticleText = new Text( alphaParticleString, labelTextOptions );

    var electronNode = new ElectronNode( labelIconOptions );
    var electronText = new Text( electronString, labelTextOptions );

    var neutronNode = new NeutronNode( labelIconOptions );
    var neutronText = new Text( neutronString, labelTextOptions );

    var protonNode = new ProtonNode( labelIconOptions );
    var protonText = new Text( protonString, labelTextOptions );


    // Prettying rows so they align to a grid
    // Rows have inequally sized icons but need to be spaced well.
    // Each icon will get a bounding box to make things pretty.
    var maxIconWidth = alphaParticleNode.width;

    var alphaParticleRowLayoutBox = _makeLayoutBoxRow( alphaParticleNode, maxIconWidth, alphaParticleText );
    var electronRowLayoutBox = _makeLayoutBoxRow( electronNode, maxIconWidth, electronText );
    var neutronRowLayoutBox = _makeLayoutBoxRow( neutronNode, maxIconWidth, neutronText );
    var protonRowLayoutBox = _makeLayoutBoxRow( protonNode, maxIconWidth, protonText );


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

  /**
   * Create a LayoutBox for an icon and text
   * @private
   * @returns LayoutBox
   */
  function _makeLayoutBoxRow( iconNode, iconWidth, rowText ) {
    // Should look something like this, where [] is a LayoutBox and 0 is an icon.
    // [ [  0  ] "text" ]
    var iconLayoutBox = new LayoutBox( {
      align: 'center' 
    } );

    // Allow a bit of room to the side of the image
    var iconLayoutBoxHStrut = new HStrut( iconWidth * 2 );

    var rowLayoutBox = new LayoutBox( {
      align: 'left',
      orientation: 'horizontal',
      spacing: 4
    } );

    iconLayoutBox.addChild( iconLayoutBoxHStrut );
    iconLayoutBox.addChild( iconNode );
    rowLayoutBox.addChild( iconLayoutBox );
    rowLayoutBox.addChild( rowText );

    return rowLayoutBox;
  }

  return inherit( Panel, LegendPanel );
} );
