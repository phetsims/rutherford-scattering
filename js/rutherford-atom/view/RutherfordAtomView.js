// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @authpr Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var ScreenView = require( 'JOIST/ScreenView' );

  // strings
  var scaleString = require( 'string!RUTHERFORD_SCATTERING/pattern.nuclearScale' );

  // views
  var LegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/LegendPanel' );
  var AlphaParticlePanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePanel' );
  var AnimationControlView = require( 'RUTHERFORD_SCATTERING/rutherford-atom/view/AnimationControlView' );
  var AtomPanel = require( 'RUTHERFORD_SCATTERING/common/view/AtomPanel' );
  var ZoomView = require( 'RUTHERFORD_SCATTERING/common/view/ZoomView' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomView( model ) {
    
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) } );

    var tempX = 5, tempY = 5;

    //TODO create view nodes and wire up to model
    this.addChild( new ResetAllButton( {
      right: this.layoutBounds.maxX - tempX,
      bottom: this.layoutBounds.maxY - tempY,
      listener: function() {
        model.reset();
      }
    } ) );

    // GitHub Issue #2
    //scaleString = scaleString.replace('?', RSConstants.NUCLEAR_SCALE_DEFAULT);
    this.addChild( new ZoomView( scaleString, {
      centerX: this.layoutBounds.center.x,
      top: tempY
    } ) );

    this.addChild( new AnimationControlView( model, {
      centerX: this.layoutBounds.center.x,
      bottom: this.layoutBounds.maxY - tempY
    } ) );

    // Legend
    var legendPanel = new LegendPanel( 1.3, RSConstants.TITLE_FONT, RSConstants.LEGEND_FONT );

    var legends = new LayoutBox( {
      align: 'right',
      children: [ legendPanel, new AlphaParticlePanel(), new AtomPanel() ],
      right: this.layoutBounds.maxX - tempX,
      top: tempY,
      spacing: 3
    } );

    this.addChild( legends );
  }

  return inherit( ScreenView, RutherfordAtomView );
} );
