// Copyright 2002-2016, University of Colorado Boulder

/**
 * Visual representation of a plum pudding atom
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Image = require( 'SCENERY/nodes/Image' );

  // images
  var plumPuddingImage = require( 'image!RUTHERFORD_SCATTERING/plumPudding.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PlumPuddingAtomNode( options ) {

    options = _.extend( {
    }, options );

    Image.call( this, plumPuddingImage );
  }

  rutherfordScattering.register( 'PlumPuddingAtomNode', PlumPuddingAtomNode );

  return inherit( Image, PlumPuddingAtomNode, {

  } ); // inherit

} ); // define
