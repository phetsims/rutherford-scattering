// Copyright 2018, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var Node = require( 'SCENERY/nodes/Node' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RSA11yStrings = require( 'RUTHERFORD_SCATTERING/common/RSA11yStrings' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

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
