// Copyright 2018, University of Colorado Boulder

/**
 * A consistent Scene Summary node that can be used in all screen views.
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

define( function( require ) {
  'use strict';

  // modules
  var SceneSummaryNode = require( 'SCENERY_PHET/accessibility/nodes/SceneSummaryNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var RSA11yStrings = require( 'RUTHERFORD_SCATTERING/common/RSA11yStrings' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  var sceneSummaryString = RSA11yStrings.sceneSummary.value;

  /**
   * @constructor
   * @param {Object} options
   */
  function RSSceneSummaryNode( options ) {

    SceneSummaryNode.call( this, sceneSummaryString, options );
  }

  rutherfordScattering.register( 'RSSceneSummaryNode', RSSceneSummaryNode );

  return inherit( SceneSummaryNode, RSSceneSummaryNode );
} );
