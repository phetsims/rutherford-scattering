// Copyright 2016-2019, University of Colorado Boulder

/**
 * Plum pudding screen & model construction
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const PlumPuddingAtomModel = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/model/PlumPuddingAtomModel' );
  const PlumPuddingAtomScreenView = require( 'RUTHERFORD_SCATTERING/plumpuddingatom/view/PlumPuddingAtomScreenView' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  const Screen = require( 'JOIST/Screen' );

  // strings
  const plumPuddingAtomString = require( 'string!RUTHERFORD_SCATTERING/plumPuddingAtom' );

  // images
  const screenIcon = require( 'image!RUTHERFORD_SCATTERING/PlumPuddingAtom-screen-icon.png' );

  /**
   * @constructor
   */
  function PlumPuddingAtomScreen() {

    const options = {
      name: plumPuddingAtomString,
      backgroundColorProperty: RSColorProfile.backgroundColorProperty,
      homeScreenIcon: new Image( screenIcon )
    };

    Screen.call( this,
      function() { return new PlumPuddingAtomModel(); },
      function( model ) { return new PlumPuddingAtomScreenView( model ); },
      options );
  }

  rutherfordScattering.register( 'PlumPuddingAtomScreen', PlumPuddingAtomScreen );

  return inherit( Screen, PlumPuddingAtomScreen );
} );
