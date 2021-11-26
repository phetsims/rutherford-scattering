// Copyright 2016-2021, University of Colorado Boulder

/**
 * Visual representation of a Rutherford atom
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import { CanvasNode } from '../../../../scenery/js/imports.js';
import RSColors from '../../common/RSColors.js';
import RSConstants from '../../common/RSConstants.js';
import ParticleNodeFactory from '../../common/view/ParticleNodeFactory.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordNucleus from '../model/RutherfordNucleus.js';

// constants
const MIN_NUCLEUS_RADIUS = 20; // view coordinates
const OUTLINE_LINE_WIDTH = 1.5;
const OUTLINE_LINE_DASH = [ 2, 3 ];
const MIN_PARTICLE_COUNT = RSConstants.MIN_PROTON_COUNT + RSConstants.MIN_NEUTRON_COUNT;
const MAX_PARTICLE_COUNT = RSConstants.MAX_PROTON_COUNT + RSConstants.MAX_NEUTRON_COUNT;
const PARTICLE_COUNT_EXP = 0.333;

class RutherfordNucleusNode extends CanvasNode {

  /**
   * The Rutherford atom is build by randomly drawing proton & neutron images to a CanvasNode. This canvas is then
   * rendered to an Image.
   *
   * @param {Property.<boolean>} userInteractionProperty - is the user changing the model
   * @param {Property.<boolean>} protonCountProperty
   * @param {Property.<boolean>} neutronCountProperty
   * @param {Object} [options]
   */
  constructor( userInteractionProperty, protonCountProperty, neutronCountProperty, rutherfordNucleus, options ) {

    // max radius of an atom with MAX protons & neutrons
    const maxRadius = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP ) *
                      Math.pow( MAX_PARTICLE_COUNT, PARTICLE_COUNT_EXP );

    // set canvasBounds based on max radius of atom
    options = options || {};
    options.canvasBounds = new Bounds2( 0, 0, 2 * maxRadius, 2 * maxRadius );

    super( options );

    // @private
    this.userInteractionProperty = userInteractionProperty;

    // @private
    this.rutherfordNucleus = rutherfordNucleus;

    // @private - switch to render the outline or full atom
    this.renderAtomOutline = false;

    // @private - the final rendered Rutherford atom
    this.image = null;

    // @private - the image to use as the proton
    this.protonImage = null;

    // @private - the image to use as the neutron
    this.neutronImage = null;

    // @private
    this.radius = MIN_NUCLEUS_RADIUS;

    // @private
    this.numberOfProtons = RSConstants.MIN_PROTON_COUNT;

    // @private
    this.numberOfNeutrons = RSConstants.MIN_NEUTRON_COUNT;

    // @private - flags that track when it is time to redraw the nucleus
    this.isDirty = false;
    this.timeSinceDirty = 0; // ms

    // generate proton image - asynchronous
    const protonNode = ParticleNodeFactory.createProton();
    protonNode.toImage( ( image, x, y ) => {
      this.protonImage = image;
      this.updateAtomImage();
      this.timeSinceDirty = 0;
    } );

    // generate neutron image - asynchronous
    const neutronNode = ParticleNodeFactory.createNeutron();
    neutronNode.toImage( ( image, x, y ) => {
      this.neutronImage = image;
      this.updateAtomImage();
      this.timeSinceDirty = 0;
    } );

    // update atom image when proton count changes
    const protonCountListener = propertyValue => {
      this.numberOfProtons = propertyValue;
      this.renderAtomOutline = this.userInteractionProperty.value;  // Only render the outline when interacting
      this.updateAtomImage();
      this.timeSinceDirty = 0;
    };
    protonCountProperty.link( protonCountListener );

    // update atom image when neutron count changes
    const neutronCountListener = propertyValue => {
      this.numberOfNeutrons = propertyValue;
      this.renderAtomOutline = this.userInteractionProperty.value; // Only render the outline when interacting
      this.updateAtomImage();
      this.timeSinceDirty = 0;
    };
    neutronCountProperty.link( neutronCountListener );

    // update atom image when user interaction stops
    const userInteractionListener = userInteraction => {
      if ( this.renderAtomOutline ) {
        this.renderAtomOutline = false;
        this.updateAtomImage();
        this.timeSinceDirty = 0;
      }
    };
    userInteractionProperty.link( userInteractionListener );

    // @private - paint function for the Nucleus, bound to this CanvasNode
    this.boundPaintNucleus = paintNucleusIcon.bind( this );

    this.invalidatePaint();

    // @private
    this.disposeRutherfordNucleusNode = () => {
      protonCountProperty.unlink( protonCountListener );
      neutronCountProperty.unlink( neutronCountListener );
      userInteractionProperty.unlink( userInteractionListener );
    };
  }

  /**
   * Make this node eligible for garbage collection
   * @public
   */
  dispose() {
    this.disposeRutherfordNucleusNode();
  }

  /**
   * renders a new atom image based on proton/neutron counts
   * @private
   */
  updateAtomImage() {

    // Calculate the radius of the nucleus
    const currentParticles = this.numberOfProtons + this.numberOfNeutrons;
    const C = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP );
    this.radius = C * Math.pow( currentParticles, PARTICLE_COUNT_EXP );
    assert && assert( this.radius > 0, 'Rutherford atom radius <= 0' );

    this.invalidatePaint();

    // generate atom image - asynchronous
    this.toImage( ( image, x, y ) => {
      // @public (read-only)
      this.image = image;
    } );
  }

  /**
   * Renders the Rutherford atom either as a simple radius outline or as a detailed proton/neutron atom
   * @param {CanvasRenderingContext2D} context
   * @private
   */
  paintCanvas( context ) {

    const bounds = this.canvasBounds;

    // clear
    context.clearRect( bounds.getX(), bounds.getY(), bounds.getWidth(), bounds.getHeight() );
    this.renderAtomOutline = this.userInteractionProperty.value;

    // outline rendering
    if ( this.renderAtomOutline ) {
      context.beginPath();
      context.lineWidth = OUTLINE_LINE_WIDTH;
      context.setLineDash( OUTLINE_LINE_DASH );
      context.strokeStyle = RSColors.nucleusOutlineColorProperty.get().toCSS();
      context.arc( this.centerX, this.centerY, this.radius, 0, 2 * Math.PI );
      context.stroke();
    }
    else {  // Detailed rendering

      // Slight chance the images used are not loaded. In that case, return & try again on next frame
      if ( this.protonImage === null || this.neutronImage === null ) {
        return;
      }

      this.boundPaintNucleus( this.rutherfordNucleus, bounds, context, 'canvasImage' );

      // notify as dirty so that the nucleus gets redrawn
      this.isDirty = true;
    }
  }


  /**
   * Create an icon of the Rutherford Nucleus with the desired number of protons and neutrons.
   *
   * @param {number} protonCount
   * @param {number} neutronCount
   * @public
   */
  static RutherfordNucleusIcon( protonCount, neutronCount ) {

    // create static properties and nucleus for the icon
    const protonCountProperty = new Property( protonCount );
    const neutronCountProperty = new Property( neutronCount );
    const nucleus = new RutherfordNucleus( protonCountProperty, neutronCountProperty );

    return new IconCanvasNode( nucleus );
  }
}

rutherfordScattering.register( 'RutherfordNucleusNode', RutherfordNucleusNode );

class IconCanvasNode extends CanvasNode {

  /**
   * Constructor for an icon representation of the Rutherford Nucleus.  This has no attached listeners,
   * and is a static representation of the nucleus.
   *
   * @param  {RutherfordNucleus} nucleus
   * @param  {Object} options
   */
  constructor( nucleus, options ) {

    // max radius of an atom with MAX protons & neutrons
    const numberOfParticles = nucleus.protonCountProperty.get() + nucleus.neutronCountProperty.get();
    const maxRadius = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP ) *
                      Math.pow( numberOfParticles, PARTICLE_COUNT_EXP );

    // used to center elements drawn in the context
    const nucleusBounds = new Bounds2( 0, 0, 2 * maxRadius, 2 * maxRadius );

    // set canvasBounds based on max radius of atom
    options = options || {};
    options.canvasBounds = nucleusBounds;
    super( options );

    // @private
    this.nucleusBounds = nucleusBounds;
    this.nucleus = nucleus;

    // @private - listener to paint the icon, bound to this CanvasNode
    this.boundPaintNucleusIcon = paintNucleusIcon.bind( this );

    this.invalidatePaint();
  }

  /**
   * Paint function for the canvas node
   *
   * @param  {CanvasRenderingContext2D} context
   * @protected @override
   */
  paintCanvas( context ) {

    // paint the nucleus with canvas arcs - slower than image, but better resolution for icons
    this.boundPaintNucleusIcon( this.nucleus, this.canvasBounds, context, 'canvasArc' );
  }
}

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
const paintNucleusIcon = function( nucleus, nucleusBounds, context, render ) {
  const protons = nucleus.protons.slice();
  const neutrons = nucleus.neutrons.slice();
  const nucleons = protons.concat( neutrons );

  // get the number of layers in the particle
  let zLayer = 0;
  nucleons.forEach( nucleon => {
    if ( nucleon.zLayerProperty.get() > zLayer ) {
      zLayer = nucleon.zLayerProperty.get();
    }
  } );

  // add the layers, starting from the largest which is in the back
  for ( let i = zLayer; i >= 0; i-- ) {
    nucleons.forEach( nucleon => {
      if ( nucleon.zLayerProperty.get() === i ) {
        let xN = nucleon.positionProperty.get().x;
        let yN = nucleon.positionProperty.get().y;

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
          xN += ( this.center.x - this.neutronImage.width / 2 );
          yN += ( this.center.y - this.neutronImage.height / 2 );

          if ( nucleon.type === 'neutron' ) {
            context.drawImage( this.neutronImage, xN, yN, this.neutronImage.width, this.neutronImage.height );
          }
          else {
            context.drawImage( this.protonImage, xN, yN, this.protonImage.width, this.protonImage.height );
          }
        }
      }
    } );
  }
};

export default RutherfordNucleusNode;