// Copyright 2002-2015, University of Colorado Boulder

/**
 * @class AlphaParticleNode.js
 * @author Jake Selig (PhET)
 *
 * View representation of an alpha particle node.
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
  var IMAGE = null;                  // Common image used for all AlphaParticleNodes
  var OVERLAP = (1 / 3);             // Overlay % between protons and neutrons
  var ROTATE_TO_ORIENTATION = false; // Should the image rotate to match model orientation

  /**
   * @constructor
   * @param {RutherfordAtomModel} model
   */
  function AlphaParticleNode( alphaParticle, options ) {

    options = _.extend( {
      scale: 1,
      pickable: false
    }, options );

    this._alphaParticle = alphaParticle;
    this._image = AlphaParticleNode.createImage();

    // Move origin to center
    this._image.center = new Vector2( 0, 0 );

    options.children = [ this._image ];

    Node.call( this, options );
  }

  /**
   * Keeps the image in the same place (and possibly rotation) as the model
   * @private
   */
  function updateImage() {
    if ( ROTATE_TO_ORIENTATION ) {
      this._image.rotation = this._alphaParticle.rotation;
    }
    
    this._image.center = this._alphaParticle.center;
  }

  return inherit( Node, AlphaParticleNode, {

    /**
     * @public
     */
    update: function( observable ) {
      updateImage();
    }
  }, {
    /**
     * Creates the image for an alpha particle
     * @public
     * @returns Node
     */
    createImage: function( options ) {
      var p1 = new ProtonNode();
      var p2 = new ProtonNode();
      var n1 = new NeutronNode();
      var n2 = new NeutronNode();

      var parent = new Node( _.extend( {
        children: [ p2, n2, p1, n1 ]
      }, options ) );

      var xOffset = ( 1 - OVERLAP ) * p1.width;
      var yOffset = ( 1 - OVERLAP ) * p1.height;

      p1.translate( 0, 0 );
      p2.translate( xOffset, yOffset );
      n1.translate( xOffset, 0 );
      n2.translate( 0, yOffset );

      return parent;
    }
  });
} );
