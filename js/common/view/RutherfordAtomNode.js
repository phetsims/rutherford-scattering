// Copyright 2002-2015, University of Colorado Boulder

/**
 * RutherfordAtomNode.js
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var Color = require( 'SCENERY/util/Color');
  var ControlSlider = require( 'RUTHERFORD_SCATTERING/common/view/ControlSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var RutherfordScatteringConstants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var Text = require( 'SCENERY/nodes/Text' );

  // globals
  var MIN_NUCLEUS_RADIUS = 20;
  var NUCLEUS_OUTLINE_COLOR = Color.GRAY;

  function RutherfordAtomNode( rutherfordAtom, options ) {

    options = _.extend( {

    }, options );


    Node.call( this, options )
  }

  return inherit( Node, RutherfordAtomNode );
} );