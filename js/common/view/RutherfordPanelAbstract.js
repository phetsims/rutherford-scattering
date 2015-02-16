// Copyright 2002-2015, University of Colorado Boulder

/**
 * Abstract for Panels belonging to Rutherford Scattering
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var RutherfordScatteringConstants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );

  // strings
  var AlphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );

  function RutherfordPanelAbstract( content, options ) {
    Panel.call( this, content, _.extend( {
      cornerRadius: RutherfordScatteringConstants.PANEL_CORNER_RADIUS,
      fill: RutherfordScatteringConstants.PANEL_BACKGROUND_COLOR,
      xMargin: RutherfordScatteringConstants.PANEL_XMARGIN,
      yMargin: RutherfordScatteringConstants.PANEL_YMARGIN
    }, options ) );
  }

  return inherit( Panel, RutherfordPanelAbstract );
} );
