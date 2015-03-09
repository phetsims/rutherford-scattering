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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  var RutherfordScatteringConstants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var rutherfordAtomScaleString = require( "string!RUTHERFORD_SCATTERING/rutherfordAtom.scale" );

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

    //TODO create view nodes and wire up to model
    this.addChild( new ResetAllButton( {
      right: this.layoutBounds.maxX - RutherfordScatteringConstants.BEZEL.x,
      bottom: this.layoutBounds.maxY - RutherfordScatteringConstants.BEZEL.y,
      listener: function() {
        model.reset();
      }
    } ) );

    this.addChild( new ZoomView( rutherfordAtomScaleString, {
      centerX: this.layoutBounds.center.x,
      top: RutherfordScatteringConstants.BEZEL.y
    } ) );

    this.addChild( new AnimationControlView( model, {
      centerX: this.layoutBounds.center.x,
      bottom: this.layoutBounds.maxY - RutherfordScatteringConstants.BEZEL.y
    } ) );

    var legends = new LayoutBox( {
      align: "right",
      children: [ new LegendPanel(), new AlphaParticlePanel(), new AtomPanel() ],
      right: this.layoutBounds.maxX - RutherfordScatteringConstants.BEZEL.x,
      top: RutherfordScatteringConstants.BEZEL.y,
      spacing: 3
    } );

    this.addChild( legends );
  }

  return inherit( ScreenView, RutherfordAtomView );
} );