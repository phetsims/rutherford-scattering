// Copyright 2016-2021, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import HighlightOverlay from '../../scenery/js/overlays/HighlightOverlay.js';
import RSColors from './common/RSColors.js';
import MenuOptionsNode from './common/view/MenuOptionsNode.js';
import PlumPuddingAtomScreen from './plumpuddingatom/PlumPuddingAtomScreen.js';
import rutherfordScatteringStrings from './rutherfordScatteringStrings.js';
import RutherfordAtomScreen from './rutherfordatom/RutherfordAtomScreen.js';

const rutherfordScatteringTitleString = rutherfordScatteringStrings[ 'rutherford-scattering' ].title;

const simOptions = {
  credits: {
    leadDesign: 'Amy Hanson, Sam McKagan',
    softwareDevelopment: 'Jesse Greenberg, Chris Malley, Dave Schmitz',
    team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Danielle Harlow, Ariel Paul, Kathy Perkins, ' +
          'Noah Podolefsky, Amy Rouinfar, Carl Weiman',
    qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Andrea Lin, Ben Roberts, Kathryn Woessner, Bryan Yoelin',
    graphicArts: '',
    thanks: ''
  },

  // Creates content for the Options dialog
  createOptionsDialogContent: () => new MenuOptionsNode()
};

// group focus highlights are synced with color profile
HighlightOverlay.setInnerGroupHighlightColor( RSColors.innerGroupHighlightColorProperty );
HighlightOverlay.setOuterGroupHighlightColor( RSColors.outerGroupHighlightColorProperty );

simLauncher.launch( () => {
  const screens = [
    new RutherfordAtomScreen(),
    new PlumPuddingAtomScreen()
  ];
  const sim = new Sim( rutherfordScatteringTitleString, screens, simOptions );
  sim.start();
} );