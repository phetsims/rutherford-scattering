// Copyright 2002-2016, University of Colorado Boulder

/**
 * Collection of all control panels in a screen of this sim.  Different scenes in a single
 * scene can have different panels, so the panels can be updated.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var Node = require( 'SCENERY/nodes/Node' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  /**
   * Constructor.
   * @param {array.<Panel>} panels
   * @param {Object} options
   * @constructor
   */
  function RSControlPanel( panels, options ) {

    Node.call( this );

    var defaultOptions = {
      spacing: RSConstants.PANEL_VERTICAL_MARGIN,
      align: 'left',
      resize: false,
      children: panels
    };
    this.panelOptions = _.extend( defaultOptions, options ); // @private

    // @private - arrange control panels vertically
    var vBox = new VBox( this.panelOptions );
    this.addChild( vBox );

    this.mutate( options );

    // disposal to prevent memory leak - this is important because a new
    // control panel is created every time the scene or color scheme changes
    this.disposeControlPanel = function() {
      this.panelOptions.children.forEach( function( panel ) {
        panel.dispose();
      } );
    };
  }

  rutherfordScattering.register( 'RSControlPanel', RSControlPanel );

  return inherit( Node, RSControlPanel, {

    /**
     * Dispose the control panel.  A new control panel is created every time the color scheme
     * and scene property changes so it is important to dispose of all elements.
     */
    dispose: function() {
      this.disposeControlPanel();
    }
  } );
} );
