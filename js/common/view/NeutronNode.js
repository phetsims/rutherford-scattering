// Copyright 2002-2015, University of Colorado Boulder

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


  /**
   * @constructor
   * @param {Object} [options]
   */
  function NeutronNode( options ) {

    var DIAMETER = 8.25;
    var GRAY = new Color( 'gray' );

    options = _.extend( {
      mainColor: GRAY,
      highlightColor: GRAY.brighterColor()
    }, options );

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  return inherit( ShadedSphereNode, NeutronNode );
} );