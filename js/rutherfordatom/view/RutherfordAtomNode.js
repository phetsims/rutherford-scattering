// Copyright 2002-2016, University of Colorado Boulder

/**
 * Visual representation of a Rutherford atom
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleNodeFactory = require( 'RUTHERFORD_SCATTERING/common/view/ParticleNodeFactory' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var CanvasNode = require( 'SCENERY/nodes/CanvasNode' );
  var Bounds2 = require( 'DOT/Bounds2' );

  // constants
  var MIN_NUCLEUS_RADIUS = 20; // view coordinates
  var OUTLINE_LINE_WIDTH = 1;
  var OUTLINE_STROKE_COLOR = 'orange';
  var MIN_PARTICLE_COUNT = RSConstants.MIN_PROTON_COUNT + RSConstants.MIN_NEUTRON_COUNT;
  var MAX_PARTICLE_COUNT = RSConstants.MAX_PROTON_COUNT + RSConstants.MAX_NEUTRON_COUNT;
  var PARTICLE_COUNT_EXP = 0.333;

  /**
   * The Rutherford atom is build by randomly drawing proton & neutron images to a CanvasNode. This canvas is then
   * rendered to an Image.
   *
   * @param {AtomModel} model
   * @param {Object} [options]
   * @constructor
   */
  function RutherfordAtomNode( model, options ) {

    // max radius of an atom with MAX protons & neutrons
    var maxRadius = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP ) *
      Math.pow( MAX_PARTICLE_COUNT, PARTICLE_COUNT_EXP );

    options = _.extend( {
    }, options );

    // set canvasBounds based on max radius of atom
    CanvasNode.call( this, {
      canvasBounds: new Bounds2( 0, 0, 2*maxRadius, 2*maxRadius )
    } );

    var self = this;

    // @private
    this.model = model;

    // @private - switch to render the outline or full atom
    this.renderAtomOutline = false;

    // @private - the final rendered Rutherford atom
    this.image = null;

    // @private - the image to use as the proton
    self.protonImage = null;

    // @private - the image to use as the neutron
    self.neutronImage = null;

    // @private
    this.radius = MIN_NUCLEUS_RADIUS;

    // @private
    this.numberOfProtons = RSConstants.MIN_PROTON_COUNT;

    // @private
    this.numberOfNeutrons = RSConstants.MIN_NEUTRON_COUNT;

    // renders a new atom image based on proton/neutron counts
    var updateAtomImage = function() {

      // Calculate the radius of the nucleus
      var currentParticles = self.numberOfProtons + self.numberOfNeutrons;
      var C = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP );
      self.radius = C * Math.pow( currentParticles, PARTICLE_COUNT_EXP );
      assert && assert( self.radius > 0 , 'Rutherford atom radius <= 0' );

      self.invalidatePaint();

      // generate atom image - asynchronous
      self.toImage( function( image, x, y ) {
        self.image = image;
      } );
    };

    // generate proton image - asynchronous
    var protonNode = ParticleNodeFactory.proton();
    protonNode.toImage( function( image, x, y ) {
      self.protonImage = image;
      updateAtomImage();
    } );

    // generate neutron image - asynchronous
    var neutronNode = ParticleNodeFactory.neutron();
    neutronNode.toImage( function( image, x, y ) {
      self.neutronImage = image;
      updateAtomImage();
    } );

    // update atom image when proton count changes
    model.protonCountProperty.link( function( propertyValue ) {
      self.numberOfProtons = propertyValue;
      self.renderAtomOutline = self.model.userInteractionProperty.value;  // Only render the outline when interacting
      updateAtomImage();
    } );

    // update atom image when neutron count changes
    model.neutronCountProperty.link( function( propertyValue ) {
      self.numberOfNeutrons = propertyValue;
      self.renderAtomOutline = self.model.userInteractionProperty.value; // Only render the outline when interacting
      updateAtomImage();
    } );

    // update atom image when user interaction stops
    model.userInteractionProperty.link( function( propertyValue ) {
      if( self.renderAtomOutline ) {
        self.renderAtomOutline = false;
        updateAtomImage();
      }
    } );

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'RutherfordAtomNode', RutherfordAtomNode );

  return inherit( CanvasNode, RutherfordAtomNode, {

    /**
     * Renders the Rutherford atom either as a radius outline or as a detailed proton/neutron atom
     * @param {CanvasRenderingContext2D} context
     * @private
     */
    paintCanvas: function( context ) {

      var bounds = this.canvasBounds;

      // clear
      context.clearRect(bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight());

      // outline rendering
      if ( this.renderAtomOutline ) {
        context.beginPath();
        context.lineWidth = OUTLINE_LINE_WIDTH;
        context.strokeStyle = OUTLINE_STROKE_COLOR;
        context.arc( this.centerX, this.centerY, this.radius, 0, 2*Math.PI );
        context.stroke();
      }
      else {  // Detailed rendering

        // Slight chance the images used are not loaded. In that case, return & try again on next frame
        if( this.protonImage === null || this.neutronImage === null ) {
          return;
        }

        // Randomly place protons and neutrons inside a circle
        var maxProtonRadius = this.radius - ( this.protonImage.width / 2 );
        var maxNeutronRadius = this.radius - ( this.neutronImage.width / 2 );
        var maxParticles = Math.max( this.numberOfProtons, this.numberOfNeutrons );
        for ( var i = 0; i < maxParticles; i++ ) {

          // protons
          if ( i < this.numberOfProtons ) {
            var dP = maxProtonRadius * Math.sqrt( Math.random() ); // random from center distance
            var thetaP = 2 * Math.PI * Math.random(); // random angle around center
            var xP = ( this.centerX - this.protonImage.width / 2 ) + ( dP * Math.cos( thetaP ) );
            var yP = ( this.centerY - this.protonImage.height / 2 ) + ( dP * Math.sin( thetaP ) );
            context.drawImage( this.protonImage, xP, yP, this.protonImage.width, this.protonImage.height );
          }

          // neutrons
          if ( i < this.numberOfNeutrons ) {
            var dN = maxNeutronRadius * Math.sqrt( Math.random() );  // random from center distance
            var thetaN = 2 * Math.PI * Math.random();  // random angle around center
            var xN = ( this.centerX - this.neutronImage.width / 2 ) + ( dN * Math.cos( thetaN ) );
            var yN = ( this.centerY - this.neutronImage.height / 2 ) + ( dN * Math.sin( thetaN ) );
            context.drawImage( this.neutronImage, xN, yN, this.neutronImage.width, this.neutronImage.height );
          }
        }
      }
    }

  } ); // inherit

} ); // define
