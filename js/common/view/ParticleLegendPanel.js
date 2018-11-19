// Copyright 2016-2018, University of Colorado Boulder

/**
 * Legend for all the particles in the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var AlignGroup = require( 'SCENERY/nodes/AlignGroup' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Text = require( 'SCENERY/nodes/Text' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' );

  // constants
  var LEGEND_ITEM_HORIZONTAL_SPACING = 12.5;

  /**
   * @param {VBox} children - content to be contained in the panel
   * @param {Object} options
   * @constructor
   */
  function ParticleLegendPanel( content, options ) {

    // the title for the panel
    var legendText = new Text( legendString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColorProfile.panelTitleColorProperty,
      maxWidth: 225
    } );

    // title with content, aligned
    var contentVBox = new VBox( {
      children: [ legendText, content ],
      align: 'left',
      spacing: RSConstants.PANEL_CHILD_SPACING
    } );

    options = _.extend( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      fill: RSColorProfile.panelColorProperty,
      stroke: RSColorProfile.panelBorderColorProperty,
      itemVerticalSpacing: RSConstants.PANEL_CHILD_SPACING
    }, options );

    Panel.call( this, contentVBox, options );
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
    createPanelContent: function( content, options ) {
      return new ParticleLegendPanelContent( content, options );
    },

    // for aligning with other panels in the various screens, legend content should be left aligned
    LEGEND_CONTENT_ALIGN: 'left'
  } );

  /**
   * Creates the content for the panel, does not include the title.
   * @param {Array.<Node>} content
   * @param {Object} [options]
   */
  function ParticleLegendPanelContent( content, options ) {

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

    // i18n - make align boxes for all items so that they are the same height, important when strings change size
    var alignGroup = new AlignGroup( { matchHorizontal: false } );
    var children = [];
    content.forEach( function( item ) {
      children.push( alignGroup.createBox( item ) );
    } );

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
