// Copyright 2002-2016, University of Colorado Boulder

/**
 * BeamNode for the RutherfordAtomScreen.  Changes width depending on the scene property.
 *
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var BeamNode = require( 'RUTHERFORD_SCATTERING/common/view/BeamNode' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  /**
   * @param {Property.<boolean>} visibleProperty - is the beam visible?
   * @param {Object} [options]
   * @constructor
   */
  function RutherfordAtomBeamNode( visibleProperty, sceneProperty, gunNode, options ) {

    BeamNode.call( this, visibleProperty, options );

    // if atom scene, beam should be wider - exists for lifetime of sim, no need to unlink
    var self = this;
    sceneProperty.link( function( scene ) {
      if ( scene === 'atom' ) {
        self.setRect( 0, 0, RSConstants.BEAM_SIZE.width * 4, self.height );
      }
      else {
        self.setRect( 0, 0, RSConstants.BEAM_SIZE.width, self.height );
      }
      self.centerX = gunNode.centerX;
    } );

  }

  rutherfordScattering.register( 'RutherfordAtomBeamNode', RutherfordAtomBeamNode );

  return inherit( BeamNode, RutherfordAtomBeamNode );

} ); // define
