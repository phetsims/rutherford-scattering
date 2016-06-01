// Copyright 2002-2016, University of Colorado Boulder

/**
 * Visual representation of a collection of rutherford atoms.  Electron energy levels are shown around the atoms, 
 * represented by dashed circles scaled by the Bohr energy for each level.  
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );

  // constants
  var IONIZATION_ENERGY = 13.6; // energy required to ionize hydrogen, in eV
  var RADIUS_SCALE = 5.95; // scale to make the radii visible in the space, chosen empirically
  var ENERGY_LEVELS = 6; // number of energy levels/radii to show for the atom

  /**
   * Constructor.
   *
   * @param {Property.<boolean>} userInteractionProperty - is the user changing the model
   * @param {Property.<boolean>} protonCountProperty
   * @param {Property.<boolean>} neutronCountProperty
   * @param {Object} [options]
   * @constructor
   */
  function AtomCollectionNode( atomSpace, modelViewTransform, options ) {

    Node.call( this, options );

    // for each atom in the space, draw the following
    var self = this;
    atomSpace.atoms.forEach( function( atom ) {

      // a small circle represents each nucleus
      var nucleusCircle = new Circle( 2, { fill: RSConstants.PANEL_TITLE_COLOR } );
      nucleusCircle.center = modelViewTransform.modelToViewPosition( atom.position );
      self.addChild( nucleusCircle );

      // create the radii - concentric circles with dashed lines spaced proportionally to the Bohr
      // energies
      var getScaledRadius = function( index ) {
        var radius = 0;

        // sum the Bohr energies up to this index
        for ( var i = 1; i <= index; i++ ) {
          var bohrEnergy = IONIZATION_ENERGY / ( i * i );
          radius += bohrEnergy; // radius will be scaled by this sum
        }
        return radius * RADIUS_SCALE;
      };

      // draw the radii
      for ( var i = ENERGY_LEVELS; i > 0 ; i-- ) {
        var scaledRadius = getScaledRadius( i );
        var radius = new Circle( scaledRadius, { stroke: 'grey', lineDash: [ 5, 5 ], center: nucleusCircle.center } );
        self.addChild( radius );
      }
    } );

    // convert to image
    this.image = self.toImage( function( image, x, y ) {
      self.image = image;
    } );
  }

  rutherfordScattering.register( 'AtomCollectionNode', AtomCollectionNode );

  return inherit( Node, AtomCollectionNode ); // inherit

} ); // define
