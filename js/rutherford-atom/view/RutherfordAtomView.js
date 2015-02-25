// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Rutherford Atom' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var Bounds2 = require( 'DOT/Bounds2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ResetAllButton = require('SCENERY_PHET/buttons/ResetAllButton');
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );

  // views
  var LegendPanel = require( 'RUTHERFORD_SCATTERING/common/view/LegendPanel' );
  var AlphaParticlePanel = require( 'RUTHERFORD_SCATTERING/common/view/AlphaParticlePanel' );
  var AtomPanel = require( 'RUTHERFORD_SCATTERING/common/view/AtomPanel' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomView( model ) {
    
    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) } );

    //TODO create view nodes and wire up to model
    this.addChild( new ResetAllButton( {
      right: this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10,
      listener: function() {
        model.reset();
      }
    } ) );

    //TODO remove this
    this.addChild( new Text( 'Rutherford Atom: under construction', {
      font: new PhetFont( 24 ),
      fill: 'white',
      center: this.layoutBounds.center
    } ) );

    var legends = new LayoutBox( {
      align: "right",
      children: [ new LegendPanel(), new AlphaParticlePanel(), new AtomPanel() ],
      right: this.layoutBounds.maxX - 15,
      spacing: 3
    } );

    this.addChild( legends );
  }

  return inherit( ScreenView, RutherfordAtomView );
} );