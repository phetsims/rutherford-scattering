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
  var PlumPuddingAtomModel = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/model/PlumPuddingAtomModel' );
  var PlumPuddingAtomScreenView = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingAtomScreenView' );

  // strings
  var plumPuddingAtomTitleString = require( 'string!RUTHERFORD_SCATTERING/screen.plumPuddingAtom' );

  // images
  var screenIcon = require( 'image!RUTHERFORD_SCATTERING/PlumPuddingAtom-screen-icon.jpg' );

  /**
   * @param {Tandem} tandem
   * @constructor
   */
  function PlumPuddingAtomScreen( tandem ) {

    Screen.call( this,
      plumPuddingAtomTitleString,
      new Image( screenIcon ),
      function() { return new PlumPuddingAtomModel( tandem.createTandem( 'model' ) ); },
      function( model ) { return new PlumPuddingAtomScreenView( model, tandem.createTandem( 'view' ) ); },
      { tandem: tandem,
        backgroundColor: '#EAEAEA'
      }
    );
  }

  rutherfordScattering.register( 'PlumPuddingAtomScreen', PlumPuddingAtomScreen );

  return inherit( Screen, PlumPuddingAtomScreen );
} );
