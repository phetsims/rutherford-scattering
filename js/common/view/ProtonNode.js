// Copyright 2002-2015, University of Colorado Boulder

/**
 * ProtonNode.js - view for a Proton
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
  function ProtonNode( options ) {

    var DIAMETER = 8.25;
    var RED = new Color( 'red');

    options = _.extend( {
      scale: 1,
      mainColor: RED,
      highlightColor: RED.brighterColor()
    }, options );

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  return inherit( ShadedSphereNode, ProtonNode );
} );