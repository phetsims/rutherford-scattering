// Copyright 2002-2016, University of Colorado Boulder

/**
 * Rutherford screen & model construction
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
  var RutherfordAtomModel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtomModel' );
  var RutherfordAtomScreenView = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordAtomScreenView' );

  // strings
  var rutherfordAtomString = require( 'string!RUTHERFORD_SCATTERING/rutherfordAtom' );

  // images
  var screenIcon = require( 'image!RUTHERFORD_SCATTERING/RutherfordAtom-screen-icon.png' );

  /**
   * @constructor
   */
  function RutherfordAtomScreen() {

    Screen.call( this,
      rutherfordAtomString,
      new Image( screenIcon ),
      function() { return new RutherfordAtomModel(); },
      function( model ) { return new RutherfordAtomScreenView( model ); }, {
      backgroundColor: 'black'
    } );
  }

  rutherfordScattering.register( 'RutherfordAtomScreen', RutherfordAtomScreen );

  return inherit( Screen, RutherfordAtomScreen );
} );
