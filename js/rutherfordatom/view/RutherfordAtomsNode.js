// Copyright 2002-2016, University of Colorado Boulder

/**
 * Visual representation of a collection of rutherford atoms.  Electron energy levels are shown around the atoms, 
 * represented by dashed circles scaled by the Bohr radius for each level.  
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );

  /**
   * Constructor.
   *
   * @param {Property.<boolean>} userInteractionProperty - is the user changing the model
   * @param {Property.<boolean>} protonCountProperty
   * @param {Property.<boolean>} neutronCountProperty
   * @param {Object} [options]
   * @constructor
   */
  function RutherfordAtomsNode( userInteractionProperty, protonCountProperty, neutronCountProperty, options ) {

    CanvasNode.call( this, options );

    // TODO: Temporary use of HTMLImageElement until we determine how the actual image should be rendered
    this.image = new Image();

    // TODO: this is a temp image, representing this, come back once it is determined how to handle the model
    this.invalidatePaint();
  }

  rutherfordScattering.register( 'RutherfordAtomsNode', RutherfordAtomsNode );

  return inherit( CanvasNode, RutherfordAtomsNode, {

  } ); // inherit

} ); // define
