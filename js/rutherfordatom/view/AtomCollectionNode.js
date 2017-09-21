// Copyright 2016-2017, University of Colorado Boulder

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
  var Circle = require( 'SCENERY/nodes/Circle' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  var Path = require( 'SCENERY/nodes/Path' );
  var RSGlobals = require( 'RUTHERFORD_SCATTERING/common/RSGlobals' );
  var RSQueryParameters = require( 'RUTHERFORD_SCATTERING/common/RSQueryParameters' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // constants
  var IONIZATION_ENERGY = 13.6; // energy required to ionize hydrogen, in eV
  var RADIUS_SCALE = 5.95; // scale to make the radii visible in the space, chosen empirically
  var ENERGY_LEVELS = 6; // number of energy levels/radii to show for the atom

  /**
   * Constructor.
   *
   * @param {RutherfordAtomSpace} atomSpace - AtomSpace containing the atoms
   * @param {ModelViewTransform2} modelViewTransform
   * @param {Object} options`
   * @constructor
   */
  function AtomCollectionNode( atomSpace, modelViewTransform, options ) {

    Node.call( this, options );
    var self = this;

    // draw each atom in the space - called every time the color profile changes
    var drawAtomSpace = function() {

      // remove the all children
      self.removeAllChildren();
      atomSpace.atoms.forEach( function( atom ) {

        // a small circle represents each nucleus
        var nucleusCircle = ParticleNodeFactory.createNucleus();
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

        // draw the bounds of each nucleus
        if ( RSQueryParameters.showDebugShapes ) {
          var boundsRectangle = new Path( modelViewTransform.modelToViewShape( atom.boundingRect ), { stroke: 'red' } );
          self.addChild( boundsRectangle );

          var boundingCircle = new Path( modelViewTransform.modelToViewShape( atom.boundingCircle ), { stroke: 'red' } );
          self.addChild( boundingCircle );
        }
      } );
    };

    // draw the atom space whenever the color profile changes
    // no need to unlink, this instance exists for life of sim
    RSGlobals.projectorModeProperty.link( function() {
      drawAtomSpace();

      // update the image
      self.image = self.toImage( function( image, x, y ) {
        self.image = image;
      } );
    } );
  }

  rutherfordScattering.register( 'AtomCollectionNode', AtomCollectionNode );

  return inherit( Node, AtomCollectionNode ); // inherit

} ); // define
