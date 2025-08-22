// Copyright 2016-2025, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

/**
 * Collection of all control panels in a screen of this sim.  Different scenes in a single
 * scene can have different panels, so the panels can be updated.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import optionize from '../../../../phet-core/js/optionize.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node, { NodeOptions } from '../../../../scenery/js/nodes/Node.js';
import Panel from '../../../../sun/js/Panel.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RSConstants from '../RSConstants.js';

type SelfOptions = {
  spacing?: number;
  align?: string;
  resize?: boolean;
  children?: Array<Panel>;
};

type RSControlPanelOptions = SelfOptions & NodeOptions;

class RSControlPanel extends Node {

  private readonly panelOptions: RSControlPanelOptions;
  private readonly disposeRSControlPanel: () => void;

  /**
   * Constructor.
   */
  public constructor( panels: Array<Panel>, providedOptions?: RSControlPanelOptions ) {

    super();

    const options = optionize<RSControlPanelOptions, SelfOptions, NodeOptions>()( {
      spacing: RSConstants.PANEL_VERTICAL_MARGIN,
      align: 'left',
      resize: false,
      children: panels
    }, providedOptions );
    
    this.panelOptions = options;

    const vBox = new VBox( this.panelOptions );
    this.addChild( vBox );

    this.mutate( providedOptions );

    // disposal to prevent memory leak - this is important because a new
    // control panel is created every time the scene or color scheme changes
    this.disposeRSControlPanel = () => {
      this.panelOptions.children.forEach( panel => {
        panel.dispose();
      } );
    };
  }


  /**
   * Dispose the control panel.  A new control panel is created every time the color scheme
   * and scene property changes so it is important to dispose of all elements.
   */
  public dispose(): void {
    this.disposeRSControlPanel();
    super.dispose();
  }
}

rutherfordScattering.register( 'RSControlPanel', RSControlPanel );

export default RSControlPanel;