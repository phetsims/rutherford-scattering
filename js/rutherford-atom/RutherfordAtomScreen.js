// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'Rutherford Atom' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RutherfordAtomModel = require( 'RUTHERFORD_SCATTERING/rutherford-atom/model/RutherfordAtomModel' );
  var RutherfordAtomView = require( 'RUTHERFORD_SCATTERING/rutherford-atom/view/RutherfordAtomView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var rutherfordAtomString = require( 'string!RUTHERFORD_SCATTERING/rutherfordAtom' ).value;

  var createIcon = function() {
    return new Rectangle( 0, 0, 100, 100, { fill: 'red' } );
  };

  /**
   * @constructor
   */
  function RutherfordAtomScreen() {
    Screen.call( this,
      rutherfordAtomString,
      createIcon(),
      function() { return new RutherfordAtomModel(); },
      function( model ) { return new RutherfordAtomView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, RutherfordAtomScreen );
} );