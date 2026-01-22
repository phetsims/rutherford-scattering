// Copyright 2016, University of Colorado Boulder

/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  /**
   * @param {Property.<boolean>} visibleProperty - is the beam visible?
   * @param {Object} [options]
   * @constructor
   */
  function BeamNode( visibleProperty, options ) {

    options = _.extend( {
      fill: '#8f8f8f'
    }, options );

    Rectangle.call( this, 0, 0, RSConstants.BEAM_SIZE.width, RSConstants.BEAM_SIZE.height, options );

    // no need to unlink, this instance exists for the lifetime of the sim
    visibleProperty.linkAttribute( this, 'visible' );
  }

  rutherfordScattering.register( 'BeamNode', BeamNode );

  return inherit( Rectangle, BeamNode );

} ); // define
