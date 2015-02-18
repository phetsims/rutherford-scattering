// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Alpha Particle Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var CheckBox = require( 'SUN/CheckBox' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var RutherfordPanelBase = require( 'RUTHERFORD_SCATTERING/common/view/RutherfordPanelBase' );
  var RutherfordScatteringConstants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var AlphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );
  var TracesString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle.traces' );

  function AlphaParticlePanel( model, options ) {

    options = _.extend( {
      align: 'left',
      lineWidth: 3
    }, options );

    var TEST_PROPERTY = new Property( 1 );

    // Text elements for entries in Legend
    var alphaParticleText = new Text( AlphaParticleString, {
      fill: RutherfordScatteringConstants.PANEL_HEADER_FONTCOLOR,
      font: new PhetFont( RutherfordScatteringConstants.PANEL_HEADER_FONTSIZE )
    } );

    var energySlider = new HSlider( TEST_PROPERTY, {
      max: RutherfordScatteringConstants.ALPHAPARTICLE_ENERGY_MAX,
      min: RutherfordScatteringConstants.ALPHAPARTICLE_ENERGY_MIN
    } );

    var tracesText = new Text( TracesString, {
      fill: RutherfordScatteringConstants.PANEL_CONTENT_FONTCOLOR,
      font: new PhetFont( RutherfordScatteringConstants.PANEL_CONTENT_FONTSIZE )
    } );

    var checkBoxTraces = new CheckBox( tracesText, TEST_PROPERTY );

    var content = new LayoutBox( _.extend( {
      children: [ alphaParticleText, energySlider, checkBoxTraces ]
    }, options ) );

    RutherfordPanelBase.call( this, content, options );
  }

  return inherit( RutherfordPanelBase, AlphaParticlePanel );
} );