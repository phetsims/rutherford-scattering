// Copyright 2015, University of Colorado Boulder

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

  // constants
  var DIAMETER = 6.75;
  var COLOR = new Color( 120, 120, 255 );

  /**
   * @constructor
   * @param {Object} [options]
   */
  function ElectronNode( options ) {

    options = _.extend( {
      scale: 1,
      mainColor: COLOR,
      highlightColor: COLOR.brighterColor()
    }, options );

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  return inherit( ShadedSphereNode, ElectronNode );
} );
