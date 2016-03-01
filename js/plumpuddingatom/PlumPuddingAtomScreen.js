// Copyright 2002-2016, University of Colorado Boulder

/**
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var PlumPuddingAtomModel = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/model/PlumPuddingAtomModel' );
  var PlumPuddingAtomScreenView = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingAtomScreenView' );

  // strings
  var plumPuddingAtomString = require( 'string!RUTHERFORD_SCATTERING/plumPuddingAtom' );

  // images
  var screenIcon = require( 'image!RUTHERFORD_SCATTERING/PlumPuddingAtom-screen-icon.png' );

  /**
   * @constructor
   */
  function PlumPuddingAtomScreen() {

    Screen.call( this,
      plumPuddingAtomString,
      new Image( screenIcon ),
      function() { return new PlumPuddingAtomModel(); },
      function( model ) { return new PlumPuddingAtomScreenView( model ); }, {
      backgroundColor: 'black'
    } );
  }

  rutherfordScattering.register( 'PlumPuddingAtomScreen', PlumPuddingAtomScreen );

  return inherit( Screen, PlumPuddingAtomScreen );
} );
