// Copyright 2018, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const RSA11yStrings = require( 'RUTHERFORD_SCATTERING/common/RSA11yStrings' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  var screenSummaryString = RSA11yStrings.screenSummary.value;

  /**
   * @constructor
   * @param {Object} options
   */
  function RSScreenSummaryNode( options ) {
    Node.call( this, {
      tagName: 'p',
      innerContent: screenSummaryString
    } );
  }

  rutherfordScattering.register( 'RSScreenSummaryNode', RSScreenSummaryNode );

  return inherit( Node, RSScreenSummaryNode );
} );
