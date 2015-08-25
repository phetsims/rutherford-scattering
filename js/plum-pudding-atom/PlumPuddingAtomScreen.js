// Copyright 2002-2015, University of Colorado Boulder

/**
 * The 'Plum Pudding Atom' screen. Conforms to the contract specified in joist/Screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var PlumPuddingAtomModel = require( 'RUTHERFORD_SCATTERING/plum-pudding-atom/model/PlumPuddingAtomModel' );
  var PlumPuddingAtomView = require( 'RUTHERFORD_SCATTERING/plum-pudding-atom/view/PlumPuddingAtomView' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var plumPuddingAtomString = require( 'string!RUTHERFORD_SCATTERING/plumPuddingAtom' );

  var createIcon = function() {
    return new Rectangle( 0, 0, Screen.HOME_SCREEN_ICON_SIZE.width, Screen.HOME_SCREEN_ICON_SIZE.height, { fill: 'green' } );
  };

  /**
   * @constructor
   */
  function PlumPuddingAtomScreen() {
    Screen.call( this,
      plumPuddingAtomString,
      createIcon(),
      function() { return new PlumPuddingAtomModel(); },
      function( model ) { return new PlumPuddingAtomView( model ); },
      { backgroundColor: 'black' }
    );
  }

  return inherit( Screen, PlumPuddingAtomScreen );
} );