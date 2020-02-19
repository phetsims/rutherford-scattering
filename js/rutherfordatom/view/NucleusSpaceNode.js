// Copyright 2016-2020, University of Colorado Boulder

/**
 * NucleusSpaceNode is the space in which atoms and alpha particles are rendered.  In this
 * representation, the space has a single nucleus.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( require => {
  'use strict';

  // modules
  const inherit = require( 'PHET_CORE/inherit' );
  const merge = require( 'PHET_CORE/merge' );
  const ParticleSpaceNode = require( 'RUTHERFORD_SCATTERING/common/view/ParticleSpaceNode' );
  const required = require( 'PHET_CORE/required' );
  const RSA11yStrings = require( 'RUTHERFORD_SCATTERING/common/RSA11yStrings' );
  const RutherfordNucleusNode = require( 'RUTHERFORD_SCATTERING/rutherfordatom/view/RutherfordNucleusNode' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // a11y strings
  const observationWindowString = RSA11yStrings.observationWindow.value;
  const nucleusSpaceDescriptionString = RSA11yStrings.nucleusSpaceDescription.value;

  /**
   * @param {RSBaseModel} model
   * @param {Property.<boolean>} showAlphaTraceProperty
   * @param {ModelViewTransform2} modelViewTransform - model to view transform
   * @param {Object} config - must provide {Bounds2} canvasBounds
   * @constructor
   */
  function NucleusSpaceNode( model, showAlphaTraceProperty, modelViewTransform, config ) {
    config = merge( {

      // {Bounds2}
      canvasBounds: required( config.canvasBounds ),

      // a11y
      tagName: 'div',
      labelTagName: 'h3',
      labelContent: observationWindowString,
      descriptionContent: nucleusSpaceDescriptionString,
      appendDescription: true
    }, config );

    ParticleSpaceNode.call( this, model.nucleusSpace, showAlphaTraceProperty, modelViewTransform, config );

    // @private - atom image generator
    this.atomNode = new RutherfordNucleusNode( model.userInteractionProperty, model.protonCountProperty,
      model.neutronCountProperty, model.nucleusSpace.rutherfordNucleus );

    this.invalidatePaint();

    // workaround for an issue where the asynchronous images for the RutherfordNuclues weren't getting
    // updated correctly - when marked as 'dirty', the atom node will be explicitly redrawn to ensure that
    // it looks correct in the space
    // does not need to be unlinked, space will exist for life of sim
    const self = this;
    model.stepEmitter.addListener( function( dt ) {
      if ( self.atomNode.isDirty ) {
        if ( dt ) {
          self.atomNode.timeSinceDirty += dt;
          self.atomNode.updateAtomImage();
          self.atomNode.invalidatePaint();
          if ( self.atomNode.timeSinceDirty > 1 ) {
            self.atomNode.isDirty = false;
          }
        }
      }
    } );
  }

  rutherfordScattering.register( 'NucleusSpaceNode', NucleusSpaceNode );

  return inherit( ParticleSpaceNode, NucleusSpaceNode, {

    /**
     * @param {CanvasRenderingContext2D} context
     * @override
     * @protected
     */
    paintSpace: function( context ) {

      // Slight chance the image used isn't available. In that case, return & try again on next frame
      if ( this.atomNode.image === null ) {
        return;
      }

      const x = this.centerX - this.atomNode.image.width / 2;
      const y = this.centerY - this.atomNode.image.height / 2;
      context.drawImage( this.atomNode.image, x, y, this.atomNode.image.width, this.atomNode.image.height );
    }

  } ); // inherit

} ); // define
