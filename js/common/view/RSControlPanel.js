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
   *
   * @param {Object} [options]
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
    this.vBox = new VBox( this.panelOptions );
    this.addChild( this.vBox );

    this.mutate( options );
  }

  rutherfordScattering.register( 'RSControlPanel', RSControlPanel );

  return inherit( Node, RSControlPanel, {

    updatePanels: function( panels ) {
      // remove all of the old panels
      this.removeChild( this.vBox );

      // replace the children
      this.panelOptions.children = panels;
      var controlPanel = new VBox( this.panelOptions );

      // the the vBox back to the view
      this.vBox = controlPanel;
      this.addChild( this.vBox );
    }
  } );
} );
