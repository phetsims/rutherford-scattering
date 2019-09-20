// Copyright 2016-2019, University of Colorado Boulder

/**
 * BeamNode is the beam the comes out of the gun.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

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
