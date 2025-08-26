// Copyright 2016-2025, University of Colorado Boulder

/**
 * Visual representation of a Rutherford atom
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Property from '../../../../axon/js/Property.js';
import TReadOnlyProperty from '../../../../axon/js/TReadOnlyProperty.js';
import Bounds2 from '../../../../dot/js/Bounds2.js';
import affirm from '../../../../perennial-alias/js/browser-and-node/affirm.js';
import CanvasNode, { CanvasNodeOptions } from '../../../../scenery/js/nodes/CanvasNode.js';
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

/** Intermediate abstract class for nucleus canvas nodes, so they share the paintNucleusIcon method */
abstract class NucleusCanvasNode extends CanvasNode {

  public neutronImage: HTMLImageElement | null = null;
  public protonImage: HTMLImageElement | null = null;

  /**
   * Paint a nucleus icon with canvas.  A 'render method' is used to determine the style of rendering.
   * render options are 'canvasArc' and 'canvasImage'.  'canvasArc' is a slower option, but has better
   * resolution, and is good for icons.  'canvasImage' is faster and is good for dynamic elements that
   * need to change frequenly, but it tends to have poor resolution at larger scales.
   */
  protected paintNucleusIcon( nucleus: RutherfordNucleus, nucleusBounds: Bounds2, context: CanvasRenderingContext2D, render: string ): void {
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

            affirm( this.neutronImage, 'neutron image not loaded' );
            affirm( this.protonImage, 'proton image not loaded' );

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
  }
}

class RutherfordNucleusNode extends NucleusCanvasNode {

  public readonly userInteractionProperty: TReadOnlyProperty<boolean>;
  public readonly rutherfordNucleus: RutherfordNucleus;
  public renderAtomOutline = false;
  public image: HTMLImageElement | null = null;
  public radius: number = MIN_NUCLEUS_RADIUS;
  public numberOfProtons: number = RSConstants.MIN_PROTON_COUNT;
  public numberOfNeutrons: number = RSConstants.MIN_NEUTRON_COUNT;
  public isDirty = false; // accessed from outside, so public
  public timeSinceDirty = 0; // accessed from outside, so public
  public readonly disposeRutherfordNucleusNode: () => void;

  /**
   * The Rutherford atom is build by randomly drawing proton & neutron images to a CanvasNode. This canvas is then
   * rendered to an Image.
   */
  public constructor(
    userInteractionProperty: TReadOnlyProperty<boolean>,
    protonCountProperty: Property<number>,
    neutronCountProperty: Property<number>,
    rutherfordNucleus: RutherfordNucleus,
    options?: CanvasNodeOptions
  ) {

    // max radius of an atom with MAX protons & neutrons
    const maxRadius = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP ) *
                      Math.pow( MAX_PARTICLE_COUNT, PARTICLE_COUNT_EXP );

    // set canvasBounds based on max radius of atom
    options = options || {};
    options.canvasBounds = new Bounds2( 0, 0, 2 * maxRadius, 2 * maxRadius );

    super( options );

    this.userInteractionProperty = userInteractionProperty;
    this.rutherfordNucleus = rutherfordNucleus;

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
    const protonCountListener = ( propertyValue: number ) => {
      this.numberOfProtons = propertyValue;
      this.renderAtomOutline = this.userInteractionProperty.value;  // Only render the outline when interacting
      this.updateAtomImage();
      this.timeSinceDirty = 0;
    };
    protonCountProperty.link( protonCountListener );

    // update atom image when neutron count changes
    const neutronCountListener = ( propertyValue: number ) => {
      this.numberOfNeutrons = propertyValue;
      this.renderAtomOutline = this.userInteractionProperty.value; // Only render the outline when interacting
      this.updateAtomImage();
      this.timeSinceDirty = 0;
    };
    neutronCountProperty.link( neutronCountListener );

    // update atom image when user interaction stops
    const userInteractionListener = () => {
      if ( this.renderAtomOutline ) {
        this.updateAtomImage();
        this.timeSinceDirty = 0;
      }
    };
    userInteractionProperty.link( userInteractionListener );

    this.invalidatePaint();

    this.disposeRutherfordNucleusNode = () => {
      protonCountProperty.unlink( protonCountListener );
      neutronCountProperty.unlink( neutronCountListener );
      userInteractionProperty.unlink( userInteractionListener );
    };
  }

  /**
   * Make this node eligible for garbage collection
   */
  public override dispose(): void {
    this.disposeRutherfordNucleusNode();
  }

  /**
   * renders a new atom image based on proton/neutron counts
   */
  public updateAtomImage(): void {

    // Calculate the radius of the nucleus
    const currentParticles = this.numberOfProtons + this.numberOfNeutrons;
    const C = MIN_NUCLEUS_RADIUS / Math.pow( MIN_PARTICLE_COUNT, PARTICLE_COUNT_EXP );
    this.radius = C * Math.pow( currentParticles, PARTICLE_COUNT_EXP );
    assert && assert( this.radius > 0, 'Rutherford atom radius <= 0' );

    this.invalidatePaint();

    // generate atom image - asynchronous
    this.toImage( ( image: HTMLImageElement ) => {
      this.image = image;
    } );
  }

  /**
   * Renders the Rutherford atom either as a simple radius outline or as a detailed proton/neutron atom
   */
  public paintCanvas( context: CanvasRenderingContext2D ): void {

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

      this.paintNucleusIcon( this.rutherfordNucleus, this.canvasBounds, context, 'canvasArc' );

      // notify as dirty so that the nucleus gets redrawn
      this.isDirty = true;
    }
  }


  /**
   * Create an icon of the Rutherford Nucleus with the desired number of protons and neutrons.
   */
  public static RutherfordNucleusIcon( protonCount: number, neutronCount: number ): IconCanvasNode {

    // create static properties and nucleus for the icon
    const protonCountProperty = new Property( protonCount );
    const neutronCountProperty = new Property( neutronCount );
    const nucleus = new RutherfordNucleus( protonCountProperty, neutronCountProperty );

    return new IconCanvasNode( nucleus );
  }
}

rutherfordScattering.register( 'RutherfordNucleusNode', RutherfordNucleusNode );

class IconCanvasNode extends NucleusCanvasNode {

  private nucleusBounds: Bounds2;
  private nucleus: RutherfordNucleus;

  /**
   * Constructor for an icon representation of the Rutherford Nucleus.  This has no attached listeners,
   * and is a static representation of the nucleus.
   */
  public constructor( nucleus: RutherfordNucleus, options?: CanvasNodeOptions ) {

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

    this.nucleusBounds = nucleusBounds;
    this.nucleus = nucleus;

    this.invalidatePaint();
  }

  /**
   * Paint function for the canvas node
   */
  public override paintCanvas( context: CanvasRenderingContext2D ): void {

    // paint the nucleus with canvas arcs - slower than image, but better resolution for icons
    this.paintNucleusIcon( this.nucleus, this.canvasBounds, context, 'canvasArc' );
  }
}

export default RutherfordNucleusNode;