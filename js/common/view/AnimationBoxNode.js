// Copyright 2002-2015, University of Colorado Boulder

/**
 * AnimationBoxNode.js - Node containing animation area for alpha particles.
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
  var STROKE_WIDTH = 2;
  var STROKE_COLOR = Color.WHITE;

  /**
   * @constructor
   * @param {Object} [options]
   */
  function AnimationBoxNode( rutherfordScatteringModel, dimensions, options ) {

    options = _.extend( {
      scale: 1,
      mainColor: COLOR,
      highlightColor: COLOR.brighterColor()
    }, options );

    this._model = rutherfordScatteringModel;
    this._atomlayer;     // Contains atoms
    this._traceLayer;    // Contains trails of particle motions
    this._particleLayer; // Contains particles
    this._topLayer;      // Contains all things that must be in the foreground

    this._hashMap;       // Maps AlphaParticles to AlphaParticleNodes

    ShadedSphereNode.call( this, DIAMETER, options );
  }

  return inherit( ShadedSphereNode, ProtonNode );
} );
