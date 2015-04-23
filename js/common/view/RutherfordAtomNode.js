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
  var Node = require( 'SCENERY/nodes/Node' );

  function RutherfordAtomNode( rutherfordAtom, options ) {

    options = _.extend( {

    }, options );


    Node.call( this, options );
  }

  return inherit( Node, RutherfordAtomNode );
} );