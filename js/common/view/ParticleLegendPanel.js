// Copyright 2002-2016, University of Colorado Boulder

/**
 * Legend for all the particles in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
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
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' );

  // constants
  var LEGEND_ITEM_HORIZONTAL_SPACING = 12.5;
  var LEGEND_TITLE_HORIZONTAL_SPACING = 10;

  /**
   * @param {VBox} children - content to be contained in the panel
   * @param {Object} options
   * @constructor
   */
  function ParticleLegendPanel( content, options ) {

    options = _.extend( {
      xMargin: 5,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColorProfile.panelColorProperty,
      stroke: RSColorProfile.panelBorderColorProperty,
      itemVerticalSpacing: RSConstants.PANEL_CHILD_SPACING
    }, options );

    Panel.call( this, content, options );
  }

  /**
   * Build the title row consisting of the title text
   * @param {string} titleText
   */
  function createLegendTitle( titleText ) {
    var hStrut = new HStrut( LEGEND_TITLE_HORIZONTAL_SPACING );

    return new HBox( {
      spacing: 0,
      align: 'center',
      children: [ hStrut, titleText ]
    } );
  }

  /**
   * Build one row in the legend consisting of an image and label
   * @param {Node} particleNode
   * @param {string} titleString
   * @returns {HBox}
   * @private
   */
  function createParticleRow( particleNode, titleString ) {

    var hStrut1 = new HStrut( LEGEND_ITEM_HORIZONTAL_SPACING - particleNode.width / 2 );
    var titleText = new Text( titleString, { font: RSConstants.PANEL_PROPERTY_FONT, fill: RSColorProfile.panelLabelColorProperty, maxWidth: 175 } );
    var hStrut2 = new HStrut( LEGEND_ITEM_HORIZONTAL_SPACING - particleNode.width / 2 );

    // container for one row in the legend
    return new HBox( {
      spacing: LEGEND_ITEM_HORIZONTAL_SPACING,
      top: 0,
      right: 0,
      align: 'center',
      children: [ hStrut1, particleNode, hStrut2, titleText ]
    } );
  }

  rutherfordScattering.register( 'ParticleLegendPanel', ParticleLegendPanel );

  inherit( Panel, ParticleLegendPanel, {}, {

    /**
     * Create a box containing one row for the legend panel
     *
     * @param  {Node} particleNode
     * @param  {string} titleString
     * @returns {HBox}
     * @protected
     */
    createParticleBox: function( particleNode, titleString ) {
      return createParticleRow( particleNode, titleString );
    },

    /**
     * Create content which will be contained in the panel.
     *
     * @returns {type}  description
     * @public
     */
    createPanelContent: function( children, options ) {
      return new ParticleLegendPanelContent( children, options );
    }
  } );

  function ParticleLegendPanelContent( children, options ) {

    options = _.extend( {
      xMargin: 5,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColorProfile.panelColorProperty,
      stroke: RSColorProfile.panelBorderColorProperty,
      itemVerticalSpacing: RSConstants.PANEL_CHILD_SPACING
    }, options );

    var legendText = new Text( legendString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColorProfile.panelTitleColorProperty,
      maxWidth: 225
    } );

    // add the legend title to the begining of the children
    var legendTitleRow = createLegendTitle( legendText );
    children.unshift( legendTitleRow );

    VBox.call( this, {
      spacing: options.itemVerticalSpacing,
      top: 0,
      right: 0,
      align: 'left',
      children: children
    } );
  }

  rutherfordScattering.register( 'ParticleLegendPanelContent', ParticleLegendPanelContent );

  inherit( VBox, ParticleLegendPanelContent );

  return ParticleLegendPanel;

} );
