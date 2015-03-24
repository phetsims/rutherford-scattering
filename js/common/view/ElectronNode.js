// Copyright 2002-2015, University of Colorado Boulder

/**
 * ElectronNode.js - view for an Electron
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
  function ElectronNode( options ) {

    var DIAMETER = 8.25;
    var BLUE = new Color( 120, 120, 255 );

    options = _.extend( {
      lineDash: [ 3, 6 ],
      mainColor: BLUE,
      highlightColor: BLUE.brighterColor()
    }, options );

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  return inherit( ShadedSphereNode, ElectronNode );
} );