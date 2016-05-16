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
  var Random = require( 'DOT/Random' );

  // constants
  var RAND = new Random();
  var MIN_NUCLEUS_RADIUS = 20; // view coordinates
  var OUTLINE_LINE_WIDTH = 1.5;
  var OUTLINE_LINE_DASH = [ 2, 3 ];
  var OUTLINE_STROKE_COLOR = 'white';
  var MIN_PARTICLE_COUNT = RSConstants.MIN_PROTON_COUNT + RSConstants.MIN_NEUTRON_COUNT;
  var MAX_PARTICLE_COUNT = RSConstants.MAX_PROTON_COUNT + RSConstants.MAX_NEUTRON_COUNT;
  var PARTICLE_COUNT_EXP = 0.333;

  /**
   * The Rutherford atom is build by randomly drawing proton & neutron images to a CanvasNode. This canvas is then
   * rendered to an Image.
   *
   * @param {Property.<boolean>} userInteractionProperty - is the user changing the model
   * @param {Property.<boolean>} protonCountProperty
   * @param {Property.<boolean>} neutronCountProperty
   * @param {Object} [options]
   * @constructor
   */
  function RutherfordNucleusNode( userInteractionProperty, protonCountProperty, neutronCountProperty, options ) {

    // max radius of an atom with MAX protons & neutrons
    var maxRadius = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP ) *
                    Math.pow( MAX_PARTICLE_COUNT, PARTICLE_COUNT_EXP );

    // set canvasBounds based on max radius of atom
    options = options || {};
    options.canvasBounds = new Bounds2( 0, 0, 2 * maxRadius, 2 * maxRadius );

    CanvasNode.call( this, options );

    var self = this;

    // @private
    this.userInteractionProperty = userInteractionProperty;

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

    // generate proton image - asynchronous
    var protonNode = ParticleNodeFactory.createProton();
    protonNode.toImage( function( image, x, y ) {
      self.protonImage = image;
      self.updateAtomImage();
    } );

    // generate neutron image - asynchronous
    var neutronNode = ParticleNodeFactory.createNeutron();
    neutronNode.toImage( function( image, x, y ) {
      self.neutronImage = image;
      self.updateAtomImage();
    } );

    // update atom image when proton count changes
    var protonCountListener = function( propertyValue ) {
      self.numberOfProtons = propertyValue;
      self.renderAtomOutline = self.userInteractionProperty.value;  // Only render the outline when interacting
      self.updateAtomImage();
    };
    protonCountProperty.link( protonCountListener );

    // update atom image when neutron count changes
    var neutronCountListener = function( propertyValue ) {
      self.numberOfNeutrons = propertyValue;
      self.renderAtomOutline = self.userInteractionProperty.value; // Only render the outline when interacting
      self.updateAtomImage();
    };
    neutronCountProperty.link( neutronCountListener );

    // update atom image when user interaction stops
    var userInteractionListener = function( userInteraction ) {
      if ( self.renderAtomOutline ) {
        self.renderAtomOutline = false;
        self.updateAtomImage();
      }
    };
    userInteractionProperty.link( userInteractionListener );

    this.invalidatePaint();
  }

  rutherfordScattering.register( 'RutherfordNucleusNode', RutherfordNucleusNode );

  return inherit( CanvasNode, RutherfordNucleusNode, {

    /**
     * renders a new atom image based on proton/neutron counts
     * @private
     */
    updateAtomImage: function() {

      // Calculate the radius of the nucleus
      var currentParticles = this.numberOfProtons + this.numberOfNeutrons;
      var C = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP );
      this.radius = C * Math.pow( currentParticles, PARTICLE_COUNT_EXP );
      assert && assert( this.radius > 0, 'Rutherford atom radius <= 0' );

      this.invalidatePaint();

      // generate atom image - asynchronous
      var self = this;
      this.toImage( function( image, x, y ) {
        self.image = image;
      } );
    },

    /**
     * Renders the Rutherford atom either as a simple radius outline or as a detailed proton/neutron atom
     * @param {CanvasRenderingContext2D} context
     * @private
     */
    paintCanvas: function( context ) {

      var bounds = this.canvasBounds;

      // clear
      context.clearRect( bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight() );

      // outline rendering
      if ( this.renderAtomOutline ) {
        context.beginPath();
        context.lineWidth = OUTLINE_LINE_WIDTH;
        context.setLineDash( OUTLINE_LINE_DASH );
        context.strokeStyle = OUTLINE_STROKE_COLOR;
        context.arc( this.centerX, this.centerY, this.radius, 0, 2 * Math.PI );
        context.stroke();
      }
      else {  // Detailed rendering

        // Slight chance the images used are not loaded. In that case, return & try again on next frame
        if ( this.protonImage === null || this.neutronImage === null ) {
          return;
        }

        // Randomly place protons and neutrons inside a circle
        var maxProtonRadius = this.radius - ( this.protonImage.width / 2 );
        var maxNeutronRadius = this.radius - ( this.neutronImage.width / 2 );
        var maxParticles = Math.max( this.numberOfProtons, this.numberOfNeutrons );
        for ( var i = 0; i < maxParticles; i++ ) {

          // protons
          if ( i < this.numberOfProtons ) {
            var dP = maxProtonRadius * Math.sqrt( RAND.random() ); // random from center distance
            var thetaP = 2 * Math.PI * RAND.random(); // random angle around center
            var xP = ( this.centerX - this.protonImage.width / 2 ) + ( dP * Math.cos( thetaP ) );
            var yP = ( this.centerY - this.protonImage.height / 2 ) + ( dP * Math.sin( thetaP ) );
            context.drawImage( this.protonImage, xP, yP, this.protonImage.width, this.protonImage.height );
          }

          // neutrons
          if ( i < this.numberOfNeutrons ) {
            var dN = maxNeutronRadius * Math.sqrt( RAND.random() );  // random from center distance
            var thetaN = 2 * Math.PI * RAND.random();  // random angle around center
            var xN = ( this.centerX - this.neutronImage.width / 2 ) + ( dN * Math.cos( thetaN ) );
            var yN = ( this.centerY - this.neutronImage.height / 2 ) + ( dN * Math.sin( thetaN ) );
            context.drawImage( this.neutronImage, xN, yN, this.neutronImage.width, this.neutronImage.height );
          }
        }
      }
    }

  } ); // inherit

} ); // define
