// Copyright 2016-2026, University of Colorado Boulder

/**
 * Main entry point for the sim.
 *
 * @author Dave Schmitz (Schmitzware)
 */

import PreferencesModel from '../../joist/js/preferences/PreferencesModel.js';
import Sim, { SimOptions } from '../../joist/js/Sim.js';
import simLauncher from '../../joist/js/simLauncher.js';
import PlumPuddingAtomScreen from './plumpuddingatom/PlumPuddingAtomScreen.js';
import RutherfordAtomScreen from './rutherfordatom/RutherfordAtomScreen.js';
import RutherfordScatteringFluent from './RutherfordScatteringFluent.js';


const rutherfordScatteringTitleStringProperty = RutherfordScatteringFluent[ 'rutherford-scattering' ].titleStringProperty;

const simOptions: SimOptions = {
  credits: {
    leadDesign: 'Amy Hanson, Sam McKagan',
    softwareDevelopment: 'Jesse Greenberg, Chris Malley, Dave Schmitz, Agust\u00EDn Vallejo',
    team: 'Wendy Adams, Michael Dubson, Noah Finkelstein, Danielle Harlow, Emily B. Moore, Ariel Paul, ' +
          'Kathy Perkins, Noah Podolefsky, Amy Rouinfar, Marla Schulz, Taliesin Smith, Carl Wieman',
    qualityAssurance: 'Steele Dalton, Amanda Davis, Bryce Griebenow, Andrea Lin, Matthew Moore, ' +
                      'Valentina P\u00E9rez, Ben Roberts, Nancy Salpepi, Kathryn Woessner, Bryan Yoelin',
    graphicArts: '',
    thanks: ''
  },

  preferencesModel: new PreferencesModel( {
    visualOptions: {
      supportsProjectorMode: true
    }
  } )
};

simLauncher.launch( () => {
  const screens = [
    new RutherfordAtomScreen(),
    new PlumPuddingAtomScreen()
  ];
  const sim = new Sim( rutherfordScatteringTitleStringProperty, screens, simOptions );
  sim.start();
} );
