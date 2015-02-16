// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Alpha Particle Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var AlphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );

  function AlphaParticlePanel( model, options ) {

    options = _.extend( {
        align: 'left',
        spacing: 1,
        stroke: 'white',
        fill: 'black',
        lineWidth: 3,
        headerFontSize: 18,
        headerFontColor: 'yellow',
        subtextFontSize: 15,
        subtextFontColor: 'white',
        rowOrientation: 'horizontal',
        rowSpacing: 10,
        xMargin: 10,
        yMargin: 10
      },
      options );

    // Text elements for entries in Legend
    var alphaParticleText = new Text( AlphaParticleString, {
      font: new PhetFont( options.headerFontSize ),
      fill: options.headerFontColor
    } );

    var energySlider = new HSlider( new Property(1), {min: 0, max: 15} );

    var content = new LayoutBox( {
      align: options.align,
      spacing: options.spacing,
      children: [ alphaParticleText, energySlider ]
    } );

    Panel.call( this, content, options );
  }

  return inherit( Panel, AlphaParticlePanel );
} );