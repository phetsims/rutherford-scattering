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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Text = require( 'SCENERY/nodes/Text' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function RutherfordAtomView( model ) {

    ScreenView.call( this, { layoutBounds: new Bounds2( 0, 0, 1024, 618 ) } );

    //TODO create view nodes and wire up to model

    //TODO remove this
    this.addChild( new Text( 'Rutherford Atom: under construction', {
      font: new PhetFont( 24 ),
      fill: 'white',
      center: this.layoutBounds.center
    } ) );
  }

  return inherit( ScreenView, RutherfordAtomView );
} );