// Copyright 2002-2015, University of Colorado Boulder

/**
 * RutherfordAtomNode.js
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Color = require( 'SCENERY/util/Color' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Paintable = require( 'SCENERY/nodes/Paintable' );

  // constants
  //var MIN_NUCLEUS_RADIUS = 20;
  var NUCLEUS_OUTLINE_COLOR = Color.GRAY;
  //var NUCLEUS_OUTLINE_STROKE = null;      // TODO: Figure out what this should be
  //var ORBIT_COLOR = Color.GRAY; 
  //var ORBIT_STROKE = null;                // TODO: Figure out what this should be

  function RutherfordAtomNode( rutherfordAtom, options ) {

    options = _.extend( {
      pickable: false
    }, options );

    this._rutherfordAtom = rutherfordAtom;

    /**
     * @private
     */
    this._nucleusNode = new Paintable();
    this.addChild( this._nucleusNode );

    this._nucleusNode.strokeColor = NUCLEUS_OUTLINE_COLOR;
    this._nucleusNode.strokeColor = NUCLEUS_OUTLINE_COLOR;


    Node.call( this, options );
  }

  return inherit( Node, RutherfordAtomNode );
} );
