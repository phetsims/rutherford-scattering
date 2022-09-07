// Copyright 2016-2022, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import { HighlightOverlay } from '../../scenery/js/imports.js';
import RSColors from './common/RSColors.js';
import PlumPuddingAtomScreen from './plumpuddingatom/PlumPuddingAtomScreen.js';
import RutherfordAtomScreen from './rutherfordatom/RutherfordAtomScreen.js';
import RutherfordScatteringStrings from './RutherfordScatteringStrings.js';


const rutherfordScatteringTitleStringProperty = RutherfordScatteringStrings[ 'rutherford-scattering' ].titleStringProperty;

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

  preferencesModel: new PreferencesModel( {
    visualOptions: {
      supportsProjectorMode: true
    }
  } )
};

// group focus highlights are synced with color profile
HighlightOverlay.setInnerGroupHighlightColor( RSColors.innerGroupHighlightColorProperty );
HighlightOverlay.setOuterGroupHighlightColor( RSColors.outerGroupHighlightColorProperty );

simLauncher.launch( () => {
  const screens = [
    new RutherfordAtomScreen(),
    new PlumPuddingAtomScreen()
  ];
  const sim = new Sim( rutherfordScatteringTitleStringProperty, screens, simOptions );
  sim.start();
} );