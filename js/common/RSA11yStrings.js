// Copyright 2018-2020, University of Colorado Boulder

/**
 * Single location of all accessibility strings.  These strings are not meant to be translatable yet.  Rosetta needs
 * some work to provide translators with context for these strings, and we want to receive some community feedback
 * before these strings are submitted for translation.
 *
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import rutherfordScattering from '../rutherfordScattering.js';

const RSA11yStrings = {


};

if ( phet.chipper.queryParameters.stringTest === 'xss' ) {
  for ( const key in RSA11yStrings ) {
    RSA11yStrings[ key ].value += '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQIW2NkYGD4DwABCQEBtxmN7wAAAABJRU5ErkJggg==" onload="window.location.href=atob(\'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==\')" />';
  }
}

// verify that object is immutable, without the runtime penalty in production code
if ( assert ) { Object.freeze( RSA11yStrings ); }

rutherfordScattering.register( 'RSA11yStrings', RSA11yStrings );

export default RSA11yStrings;