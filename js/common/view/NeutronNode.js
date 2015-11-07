// Copyright 2015, University of Colorado Boulder

/**
 * NeutronNode.js - view for a Neutron
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Color = require( 'SCENERY/util/Color' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  // constants
  var DIAMETER = 8.25;
  var COLOR = new Color( 128, 128, 128 );

  /**
   * @constructor
   * @param {Object} [options]
   */
  function NeutronNode( options ) {

    options = _.extend( {
      scale: 1,
      mainColor: COLOR,
      highlightColor: COLOR.brighterColor()
    }, options );

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  return inherit( ShadedSphereNode, NeutronNode );
} );
