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
  var Property = require( 'AXON/Property' );
  var RutherfordNucleus = require( 'RUTHERFORD_SCATTERING/rutherfordatom/model/RutherfordNucleus' );

  // constants
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
  function RutherfordNucleusNode( userInteractionProperty, protonCountProperty, neutronCountProperty, rutherfordNucleus, options ) {

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

    // @private
    this.rutherfordNucleus = rutherfordNucleus;

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

  inherit( CanvasNode, RutherfordNucleusNode, {

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
        // @public (read-only)
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

        var boundPaintNucleus = paintNucleusIcon.bind( this, this.rutherfordNucleus, bounds, context, 'canvasImage' );
        boundPaintNucleus();

      }
    }

  }, {

    /**
     * Create an icon of the Rutherford Nucleus with the desired number of protons and neutrons.
     *
     * @param {number} protonCount
     * @param {number} neutronCount
     * @public
     */
    RutherfordNucleusIcon: function( protonCount, neutronCount ) {

      // create static properties and nucleus for the icon
      var protonCountProperty = new Property( protonCount );
      var neutronCountProperty = new Property( neutronCount );
      var nucleus = new RutherfordNucleus( protonCountProperty, neutronCountProperty );

      return new IconCanvasNode( nucleus );
    }

  } ); // inherit

  /**
   * Constructor for an icon representation of the Rutherford Nucleus.  This has no attached listeners,
   * and is a static representation of the nucleus.
   *
   * @param  {RutherfordNucleus} nucleus
   * @param  {Object} options
   * @constructor
   */
  function IconCanvasNode( nucleus, options ) {

    // @private
    this.nucleus = nucleus;

    // max radius of an atom with MAX protons & neutrons
    var numberOfParticles = nucleus.protonCount + nucleus.neutronCount;
    var maxRadius = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP ) *
                    Math.pow( numberOfParticles, PARTICLE_COUNT_EXP );

    // @private - used to center elements drawn in the context
    this.nucleusBounds = new Bounds2( 0, 0, 2 * maxRadius, 2 * maxRadius );

    // set canvasBounds based on max radius of atom
    options = options || {};
    options.canvasBounds = this.nucleusBounds;
    CanvasNode.call( this, options );

    this.invalidatePaint();
  }

  inherit( CanvasNode, IconCanvasNode, {

    /**
     * Paint function for the canvas node
     *
     * @param  {CanvasRenderingContext2D} context
     * @protected @override
     */
    paintCanvas: function( context ) {
      // paint the nucleus with canvas arcs - slower than image, but better resolution for icons
      paintNucleusIcon( this.nucleus, this.nucleusBounds, context, 'canvasArc' );
    }
} );

  /**
   * Paint a nucleus icon with canvas.  A 'render method' is used to determine the style of rendering.
   * render options are 'canvasArc' and 'canvasImage'.  'canvasArc' is a slower option, but has better
   * resolution, and is good for icons.  'canvasImage' is faster and is good for dynamic elements that
   * need to change frequenly, but it tends to have poor resolution at larger scales.
   *
   * @param  {RutherfordNucleus} nucleus
   * @param  {Bounds2} nucleusBounds description
   * @param  {CanvasRenderingContext2D} context
   * @param  {string} render - 'canvasArc' | 'canvasImage', determines rendering method, see above
   */
  var paintNucleusIcon = function( nucleus, nucleusBounds, context, render ) {
    var protons = nucleus.protons.getArray().slice( 0 );
    var neutrons = nucleus.neutrons.getArray().slice( 0 );
    var nucleons = protons.concat( neutrons );

    // get the number of layers in the particle
    var zLayer = 0;
    nucleons.forEach( function( nucleon ) {
      if ( nucleon.zLayer > zLayer ) {
        zLayer = nucleon.zLayer;
      }
    } );

    // add the layers, starting from the largest which is in the back
    var self = this;
    for ( var i = zLayer; i  >= 0; i-- ) {
      nucleons.forEach( function( nucleon ) {
        if ( nucleon.zLayer === i ) {
          var xN = nucleon.position.x;
          var yN = nucleon.position.y;

          if ( render === 'canvasArc' ) {
            // drawing with arcs is a little slower, but the result is less pixilated, so
            // this method is good for drawing icons

            // if using canvas arcs to render the nucleus, offset by center of bounds
            xN += nucleusBounds.centerX;
            yN += nucleusBounds.centerY;
            if ( nucleon.type === 'neutron' ) {
              ParticleNodeFactory.drawNeutronWithCanvas( xN, yN, context );
            }
            else {
              ParticleNodeFactory.drawProtonWithCanvas( xN, yN, context );
            }
          }
          else if ( render === 'canvasImage' ) {
            // drawing with image is a bit faster but the result can be pixilated when scaled, so this
            // should be used when rendering a nucleus that should change frequently and rapidly

            // if drawing with images, offset by bounds of the image
            xN += ( self.center.x - self.neutronImage.width / 2 );
            yN += ( self.center.y - self.neutronImage.height / 2 );

            if ( nucleon.type === 'neutron' ) {
              context.drawImage( self.neutronImage, xN, yN, self.neutronImage.width, self.neutronImage.height );
            }
            else {
              context.drawImage( self.protonImage, xN, yN, self.protonImage.width, self.protonImage.height );
            }
          }
        }
      } );
    }
  };

  return RutherfordNucleusNode;

} ); // define
