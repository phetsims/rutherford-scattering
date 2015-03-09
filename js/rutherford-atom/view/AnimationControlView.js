// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Animation Control'
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var PlayPauseButton = require( 'SCENERY_PHET/buttons/PlayPauseButton' );
  var Property = require( 'AXON/Property' );
  var StepButton = require( 'SCENERY_PHET/buttons/StepButton' );

  /**
   * @param {RutherfordAtomModel} model
   * @constructor
   */
  function AnimationControlView( model, options ) {

    options = _.extend( {
      orientation: 'horizontal',
      spacing: 10
    }, options );

    var animationToggle = new PlayPauseButton( new Property(1), {} );
    var animationStep = new StepButton( function(){}, new Property(1), {} );

    options.children = [ animationToggle, animationStep ];

    LayoutBox.call( this, options );
  }

  return inherit( LayoutBox, AnimationControlView );
} );