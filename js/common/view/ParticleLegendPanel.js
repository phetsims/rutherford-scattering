// Copyright 2002-2016, University of Colorado Boulder

/**
 * Legend for all the particles in the sim
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
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' );
  var electronString = require( 'string!RUTHERFORD_SCATTERING/electron' );
  var protonString = require( 'string!RUTHERFORD_SCATTERING/proton' );
  var neutronString = require( 'string!RUTHERFORD_SCATTERING/neutron' );
  var alphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );

  // constants
  var LEGEND_ITEM_HORIZONTAL_SPACING = 7;

  /**
   *
   * @param {Object} [options]
   * @constructor
   */
  function ParticlesLegendPanel( options ) {

    options = _.extend( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSConstants.PANEL_COLOR,
      stroke: RSConstants.PANEL_STROKE
    }, options );

    var legendText = new Text( legendString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSConstants.PANEL_TITLE_COLOR,
      maxWidth: 225
    } );

    var children = [ legendText ];

    // add  the legend particle entries
    children.push( createParticleBox( electronString, ParticleNodeFactory.createElectron() ) );
    children.push( createParticleBox( protonString, ParticleNodeFactory.createProton() ) );
    children.push( createParticleBox( neutronString, ParticleNodeFactory.createNeutron() ) );
    children.push( createParticleBox( alphaParticleString, ParticleNodeFactory.createAlpha() ) );

    var content = new VBox( {
      spacing: RSConstants.PANEL_CHILD_SPACING,
      top: 0,
      right: 0,
      align: 'left',
      children: children
    } );

    Panel.call( this, content, options );
  }

  /**
   * Build one row in the legend consisting of an image and label
   * @param {string} titleString
   * @param {Node} particleNode
   * @returns {HBox}
   */
  function createParticleBox( titleString, particleNode ) {

    var hStrut1 = new HStrut( LEGEND_ITEM_HORIZONTAL_SPACING - particleNode.width / 2 );
    var titleText = new Text( titleString, { font: RSConstants.PANEL_PROPERTY_FONT, fill: RSConstants.NEUTRAL_FILL_COLOR, maxWidth: 175 } );
    var hStrut2 = new HStrut( LEGEND_ITEM_HORIZONTAL_SPACING );

    // container for one row in the legend
    return new HBox( {
      spacing: LEGEND_ITEM_HORIZONTAL_SPACING,
      top: 0,
      right: 0,
      align: 'center',
      children: [ hStrut1, particleNode, hStrut2, titleText ]
    } );
  }

  rutherfordScattering.register( 'ParticlesLegendPanel', ParticlesLegendPanel );

  return inherit( Panel, ParticlesLegendPanel );

} );
