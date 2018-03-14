// Copyright 2018, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  var RSA11yStrings = {

    sceneSummary: {
      value: 'On this screen, the Play Area has a source that can stream Alpha particles onto a thin foil. A highly ' +
             'magnified view of the foil is shown in an observation window. Sliders adjust energy of the alpha particles ' +
             'and the number of protons and neutrons comprising the atoms in the foil. The Control Panel has radio buttons ' +
             'to toggle between atomic and nuclear scale views, buttons to pause and step incrementally through ' +
             'observations, and a button to reset the sim. Stream alpha particles to begin observations. Look for alpha ' +
             'particles and atom sliders to play, or read on for details about the observation window.'
    }
  };

  if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
    for ( var key in RSA11yStrings ) {
      RSA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
    }
  }

  // verify that object is immutable, without the runtime penalty in production code
  if ( assert ) { Object.freeze( RSA11yStrings ); }

  rutherfordScattering.register( 'RSA11yStrings', RSA11yStrings );

  return RSA11yStrings;
} );