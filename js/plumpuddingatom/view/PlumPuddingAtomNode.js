// Copyright 2016-2017, University of Colorado Boulder

/**
 * Visual representation of a plum pudding atom
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const Image = require( 'SCENERY/nodes/Image' );
  const inherit = require( 'PHET_CORE/inherit' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // images
  const plumPuddingImage = require( 'image!RUTHERFORD_SCATTERING/plumPudding.png' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function PlumPuddingAtomNode( options ) {
    Image.call( this, plumPuddingImage, options );
  }

  rutherfordScattering.register( 'PlumPuddingAtomNode', PlumPuddingAtomNode );

  return inherit( Image, PlumPuddingAtomNode, {} ); // inherit

} ); // define
