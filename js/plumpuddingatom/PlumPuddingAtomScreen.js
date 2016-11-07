// Copyright 2002-2016, University of Colorado Boulder

/**
 * Plum pudding screen & model construction
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
  var RSColors = require( 'RUTHERFORD_SCATTERING/common/RSColors' );

  // strings
  var plumPuddingAtomString = require( 'string!RUTHERFORD_SCATTERING/plumPuddingAtom' );

  // images
  var screenIcon = require( 'image!RUTHERFORD_SCATTERING/PlumPuddingAtom-screen-icon.png' );

  /**
   * @constructor
   */
  function PlumPuddingAtomScreen() {

    var options = {
      name: plumPuddingAtomString,
      backgroundColor: RSColors.backgroundColor,
      homeScreenIcon: new Image( screenIcon )
    };

    Screen.call( this,
      function() { return new PlumPuddingAtomModel(); },
      function( model ) { return new PlumPuddingAtomScreenView( model ); },
      options );

    // screen will exist for life of sim, no need to unlink
    var self = this;
    RSColors.link( 'backgroundColor', function( color ) {
      self.backgroundColorProperty.value = color;
    } );
  }

  rutherfordScattering.register( 'PlumPuddingAtomScreen', PlumPuddingAtomScreen );

  return inherit( Screen, PlumPuddingAtomScreen );
} );
