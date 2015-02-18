// Copyright 2002-2015, University of Colorado Boulder

/**
 * Abstract for Panel base belonging to Rutherford Scattering
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var HStrut = require( 'SUN/HStrut' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var RutherfordScatteringConstants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );

  function RutherfordPanelBase( content, options ) {

    options = _.extend( {
      panelWidth: RutherfordScatteringConstants.PANEL_WIDTH || 0
    }, options );

    content.addChild( new HStrut( options.panelWidth ) );

    Panel.call( this, content, _.extend( {
      fill: RutherfordScatteringConstants.PANEL_BACKGROUND_COLOR,
      spacing: RutherfordScatteringConstants.PANEL_SPACING_VERTICAL,
      stroke: RutherfordScatteringConstants.PANEL_STROKE_COLOR,
      xMargin: RutherfordScatteringConstants.PANEL_XMARGIN,
      yMargin: RutherfordScatteringConstants.PANEL_YMARGIN
    }, options ) );
  }

  return inherit( Panel, RutherfordPanelBase );
} );
