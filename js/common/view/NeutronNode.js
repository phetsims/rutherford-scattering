// Copyright 2002-2016, University of Colorado Boulder

/**
 Visual representation of an neutron.
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
  function NeutronNode( options ) {

    options = _.extend( {
      mainColor: 'grey',
      diameter: 8.25
    }, options );

    ShadedSphereNode.call( this, options.diameter, options );
  }

  rutherfordScattering.register( 'NeutronNode', NeutronNode );

  return inherit( ShadedSphereNode, NeutronNode, {

  } );
} );
