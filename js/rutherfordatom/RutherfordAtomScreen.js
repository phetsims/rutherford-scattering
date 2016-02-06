// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );
  var Image = require( 'SCENERY/nodes/Image' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RutherfordAtomModel = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordAtomModel' );
  var RutherfordAtomScreenView = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordAtomScreenView' );
  var Tandem = require( 'TANDEM/Tandem' );

  // strings
  var rutherfordAtomTitleString = require( 'string!RUTHERFORD_SCATTERING/screen.rutherfordAtom' );

  // images
  var screenIcon = require( 'image!RUTHERFORD_SCATTERING/RutherfordAtom-screen-icon.jpg' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function RutherfordAtomScreen( tandem ) {

    var options = {
      tandem: tandem,
      backgroundColor: '#EAEAEA'
    };

    Screen.call( this,
      rutherfordAtomTitleString,
      new Image( screenIcon ),
      function() { return new RutherfordAtomModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new RutherfordAtomScreenView( model, tandem.createTandem( 'view' ) ); }, options );
  }

  rutherfordScattering.register( 'RutherfordAtomScreen', RutherfordAtomScreen );

  return inherit( Screen, RutherfordAtomScreen );
} );
