// Copyright 2002-2015, University of Colorado Boulder

/**
 * AlphaParticleNode.js - view representation of an alpha particle node
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var NeutronNode = require( 'RUTHERFORD_SCATTERING/common/view/NeutronNode' );
  var ProtonNode = require( 'RUTHERFORD_SCATTERING/common/view/ProtonNode' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants
  var OVERLAP = 0.333;
  var ROTATE_TO_ORIENTATION = false; // Should the image rotate to match model orientation

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function AlphaParticleNode( alphaParticle, options ) {

    this.alphaParticleModel = alphaParticle;
    this.alphaParticleNode = createAlphaParticleNode();

    options = _.extend( {
      pickable: false
    }, options );

    options.children = [ createAlphaParticleNode() ];

    Node.call( this, options );
  }

  /**
   * Creates an alpha particle node
   * @returns {Node}
   */
  function createAlphaParticleNode () {
    var parent = new Node();
    var p1 = new ProtonNode();
    var p2 = new ProtonNode();
    var n1 = new NeutronNode();
    var n2 = new NeutronNode();

    parent.children = [ p2, n2, p1, n1 ];

    var xOffset = ( 1 - OVERLAP ) * p1.width;
    var yOffset = ( 1 - OVERLAP ) * p1.height;

    p1.translate( 0, 0 );
    p2.translate( xOffset, yOffset );
    n1.translate( xOffset, 0 );
    n2.translate( 0, yOffset );

    return parent;
  }

  return inherit( Node, AlphaParticleNode, {

    // update the view
    update: function() {
      if ( ROTATE_TO_ORIENTATION ) {
        this.alphaParticleNode.rotation = this.alphaParticleModel.rotation;
      }
      this.alphaParticleNode.center = this.alphaParticleModel.center;
    }

  } );
} );