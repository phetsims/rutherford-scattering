// Copyright 2016-2020, University of Colorado Boulder

/**
 * Collection of all control panels in a screen of this sim.  Different scenes in a single
 * scene can have different panels, so the panels can be updated.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import inherit from '../../../../phet-core/js/inherit.js';
import merge from '../../../../phet-core/js/merge.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSConstants from '../RSConstants.js';

/**
 * Constructor.
 * @param {array.<Panel>} panels
 * @param {Object} [options]
 * @constructor
 */
function RSControlPanel( panels, options ) {

  Node.call( this );

  const defaultOptions = {
    spacing: RSConstants.PANEL_VERTICAL_MARGIN,
    align: 'left',
    resize: false,
    children: panels
  };
  this.panelOptions = merge( defaultOptions, options ); // @private

  // @private - arrange control panels vertically
  const vBox = new VBox( this.panelOptions );
  this.addChild( vBox );

  this.mutate( options );

  // disposal to prevent memory leak - this is important because a new
  // control panel is created every time the scene or color scheme changes
  // @private
  this.disposeRSControlPanel = function() {
    this.panelOptions.children.forEach( function( panel ) {
      panel.dispose();
    } );
  };
}

rutherfordScattering.register( 'RSControlPanel', RSControlPanel );

inherit( Node, RSControlPanel, {

  /**
   * Dispose the control panel.  A new control panel is created every time the color scheme
   * and scene property changes so it is important to dispose of all elements.
   */
  dispose: function() {
    this.disposeRSControlPanel();
    Node.prototype.dispose.call( this );
  }
} );

export default RSControlPanel;