// Copyright 2016-2019, University of Colorado Boulder

/**
 * Visual representation of a collection of rutherford atoms. This draws the actual nuclei and electron shells in the
 * "Atom" scene of the "Rutherford Atom" screen. The electron energy levels are represented by dashed
 * circles scaled by the Bohr energy for each level.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( require => {
  'use strict';

  // modules
  const Circle = require( 'SCENERY/nodes/Circle' );
  const inherit = require( 'PHET_CORE/inherit' );
  const Node = require( 'SCENERY/nodes/Node' );
  const ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  const Path = require( 'SCENERY/nodes/Path' );
  const RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  const RSQueryParameters = require( 'RUTHERFORD_SCATTERING/common/RSQueryParameters' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // constants
  const IONIZATION_ENERGY = 13.6; // energy required to ionize hydrogen, in eV
  const RADIUS_SCALE = 5.95; // scale to make the radii visible in the space, chosen empirically
  const ENERGY_LEVELS = 6; // number of energy levels/radii to show for the atom

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
    const self = this;

    // @public (read-only) {null|HTMLImageElement} - This node will eventually be drawn with canvas with
    // context.drawImage. The image is created asynchronously in this constructor.
    this.image = null;

    // draw each atom in the space - called every time the color profile changes
    const drawAtomCollection = function() {

      // remove the all children
      self.removeAllChildren();
      atomSpace.atoms.forEach( function( atom ) {

        // a small circle represents each nucleus
        const nucleusCircle = ParticleNodeFactory.createNucleus();
        nucleusCircle.center = modelViewTransform.modelToViewPosition( atom.position );
        self.addChild( nucleusCircle );

        // create the radii - concentric circles with dashed lines spaced proportionally to the Bohr
        // energies
        const getScaledRadius = function( index ) {
          let radius = 0;

          // sum the Bohr energies up to this index
          for ( let i = 1; i <= index; i++ ) {
            const bohrEnergy = IONIZATION_ENERGY / ( i * i );
            radius += bohrEnergy; // radius will be scaled by this sum
          }
          return radius * RADIUS_SCALE;
        };

        // draw the radii
        for ( let i = ENERGY_LEVELS; i > 0 ; i-- ) {
          const scaledRadius = getScaledRadius( i );
          const radius = new Circle( scaledRadius, { stroke: 'grey', lineDash: [ 5, 5 ], center: nucleusCircle.center } );
          self.addChild( radius );
        }

        // draw the bounds of each nucleus
        if ( RSQueryParameters.showDebugShapes ) {
          const boundsRectangle = new Path( modelViewTransform.modelToViewShape( atom.boundingRect ), { stroke: 'red' } );
          self.addChild( boundsRectangle );

          const boundingCircle = new Path( modelViewTransform.modelToViewShape( atom.boundingCircle ), { stroke: 'red' } );
          self.addChild( boundingCircle );
        }
      } );
    };

    // Draw to image whenever the color changes so this can be drawn to a CanvasNode. The only color that changes is
    // nucleusColorProperty (used in ParticleNodeFactory.createNucleus()) and we link directly to that color rather
    // than profileNameProperty so that we redraw the image if that color changes from
    // rutherford-scattering-colors.hmtl. No need to unlink, this instance exists for life of sim
    RSColorProfile.nucleusColorProperty.link( function() {
      drawAtomCollection();

      // update the image
      self.image = self.toImage( function( image, x, y ) {
        self.image = image;
      } );
    } );
  }

  rutherfordScattering.register( 'AtomCollectionNode', AtomCollectionNode );

  return inherit( Node, AtomCollectionNode ); // inherit

} ); // define
