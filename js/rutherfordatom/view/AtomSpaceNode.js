// Copyright 2016-2020, University of Colorado Boulder

/**
 * Space in which atoms and alpha particles are rendered.  In this representation, there are several
 * atoms in the space and the alpha particles are small particles, most of which travel through the
 * atoms undeflected.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const AtomCollectionNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/AtomCollectionNode' );
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  const Path = require( 'SCENERY/nodes/Path' );
  const RSA11yStrings = require( 'RUTHERFORD_SCATTERING/common/RSA11yStrings' );
  const RSQueryParameters = require( 'RUTHERFORD_SCATTERING/common/RSQueryParameters' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // a11y strings
  const observationWindowString = RSA11yStrings.observationWindow.value;
  const atomSpaceDescriptionString = RSA11yStrings.atomSpaceDescription.value;

  /**
   * @param {RSBaseModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view transform
   * @param {Object} config - must provide {Bounds2} canvasBounds
   * @constructor
   */
  function AtomSpaceNode( model, showAlphaTraceProperty, modelViewTransform, config ) {

    assert && assert( config && config.hasOwnProperty( 'canvasBounds' ), 'No canvasBounds specified.' );

    config = merge( {
      particleStyle: 'particle',

      // a11y
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: observationWindowString,
      descriptionContent: atomSpaceDescriptionString,
      appendDescription: true
    }, config );

    // @private - generates an image for the collection of atoms
    this.atomsNode = new AtomCollectionNode( model.atomSpace, modelViewTransform );

    ParticleSpaceNode.call( this, model.atomSpace, showAlphaTraceProperty, modelViewTransform, config );
    const self = this;

    if ( RSQueryParameters.showDebugShapes ) {
      model.atomSpace.particleTransitionedEmitter.addListener( function( particle ) {
        // a particle has been transitioned to a new atom - show the bounding box of the particle
        self.addChild( new Path( modelViewTransform.modelToViewShape( particle.preparedBoundingBox ), {
          stroke: 'rgb(114,183,188)'
        } ) );
      } );
    }
  }

  rutherfordScattering.register( 'AtomSpaceNode', AtomSpaceNode );

  return inherit( ParticleSpaceNode, AtomSpaceNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @override
     * @protected
     */
    paintSpace: function( context ) {

      // Slight chance the image used isn't available. In that case, return & try again on next frame
      if ( !this.atomsNode.image ) {
        return;
      }

      const x = this.centerX - this.atomsNode.image.width / 2;
      const y = this.centerY - this.atomsNode.image.height / 2;
      context.drawImage( this.atomsNode.image, x, y, this.atomsNode.image.width, this.atomsNode.image.height );
    }
  } ); // inherit
} ); // define
