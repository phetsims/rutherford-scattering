// Copyright 2016, University of Colorado Boulder

/**
 * ElectronNode is the visual representation of an electron.
 * An electron is blue, and has a specular highlight with the light source coming from below.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  /**
   * @param {Object} [options], must contain a canvasBounds attribute of type Bounds2
   * @constructor
   */
  function ElectronNode( options ) {

    var diameter = 100;

    options = _.extend( {
      mainColor: 'blue'
    }, options );

    ShadedSphereNode.call( this, diameter, options );
  }

  rutherfordScattering.register( 'ElectronNode', ElectronNode );

  return inherit( ShadedSphereNode, ElectronNode, {

  } );
} );
