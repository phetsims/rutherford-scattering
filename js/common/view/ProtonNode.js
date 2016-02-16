// Copyright 2002-2016, University of Colorado Boulder

/**
 * Visual representation of an proton.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );

  /**
   * @param {Object} [options]
   * @constructor
   */
  function ProtonNode( options ) {

    options = _.extend( {
      mainColor: 'orange',
      diameter: 8.25
    }, options );

    ShadedSphereNode.call( this, options.diameter, options );
  }

  rutherfordScattering.register( 'ProtonNode', ProtonNode );

  return inherit( ShadedSphereNode, ProtonNode, {

  } );
} );
