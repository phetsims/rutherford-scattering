// Copyright 2016-2022, University of Colorado Boulder

/**
 * Control panel to adjust the number of protons and neutrons used in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 */

import DerivedProperty from '../../../../axon/js/DerivedProperty.js';
import Property from '../../../../axon/js/Property.js';
import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import Utils from '../../../../dot/js/Utils.js';
import merge from '../../../../phet-core/js/merge.js';
import NumberControl from '../../../../scenery-phet/js/NumberControl.js';
import { Text, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import RSColors from '../../common/RSColors.js';
import RSConstants from '../../common/RSConstants.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringStrings from '../../RutherfordScatteringStrings.js';

// constants
const atomString = RutherfordScatteringStrings.atom;
const numberOfNeutronsString = RutherfordScatteringStrings.numberOfNeutrons;
const numberOfProtonsString = RutherfordScatteringStrings.numberOfProtons;
const atomSettingsString = RutherfordScatteringStrings.a11y.atomSettings;

// TODO: make these template vars again when working on descriptions
const protonsValuePatternString = RutherfordScatteringStrings.a11y.protonsValuePattern;
const protonSliderDescriptionString = RutherfordScatteringStrings.a11y.protonSliderDescription;
const neutronsValuePatternString = RutherfordScatteringStrings.a11y.neutronsValuePattern;
const neutronSliderDescriptionString = RutherfordScatteringStrings.a11y.neutronSliderDescription;

// global, tracking where fingers are for multitouch support
// must persist beyond lifetime of the panel so that fingers are tracked when new
// panels are created for scene or color profile changes
const FINGER_TRACKER = {};

// specific interaction properties for the rutherford atom portion, for multitouch
// Not specific to an instance of an AtomPropertiesPanel, values of the interaction state Properties should
// persist beyond when scene or color profile changes
const interactionPropertyGroup = {
  leftProtonButtonInteractionProperty: new Property( false ),
  rightProtonButtonInteractionProperty: new Property( false ),
  protonSliderInteractionProperty: new Property( false ),
  leftNeutronButtonInteractionProperty: new Property( false ),
  rightNeutronButtonInteractionProperty: new Property( false ),
  neutronSliderInteractionProperty: new Property( false )
};

class AtomPropertiesPanel extends Panel {
  /**
   * @param {AtomPropertiesPanelContent} content - Content contained by the panel
   * @param {Object} [options]
   */
  constructor( content, options ) {

    // Add the title of the panel content
    const atomPropertiesText = new Text( atomString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelTitleColorProperty,
      maxWidth: 225
    } );

    const panelBox = new VBox( {
      children: [ atomPropertiesText, content ],
      align: 'left',
      spacing: RSConstants.PANEL_CHILD_SPACING
    } );

    options = merge( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: 10,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'center',
      resize: false,
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,

      tagName: 'div',
      labelTagName: 'h3',
      labelContent: atomSettingsString
    }, options );

    super( panelBox, options );

    // ensure that panel is eligible for garbage collection, a panel is created and destroyed every time
    // scene or color scheme changes so it si important that everything is disposed
    // @private
    this.disposeAtomPropertiesPanel = () => {
      content.dispose();
    };
  }

  /**
   * create content for the panel
   *
   * @param model
   * @returns {Node}
   * @public
   */
  static createPanelContent( model, options ) {
    return new AtomPropertiesPanelContent( model, options );
  }

  /**
   * Dispose this panel - this panel can be created and destroyed frequently so
   * it is important to dispose of all panel elements.
   *
   * @public
   * @override
   */
  dispose() {
    super.dispose();
    this.disposeAtomPropertiesPanel();
  }
}

class AtomPropertiesPanelContent extends VBox {
  /**
   * Create the content for the AtomPropertiesPanel. This does not include the panel title.
   *
   * @param  {Property.<boolean>} protonInteractionProperty
   * @param  {Property.<boolean>} neutronInteractionProperty
   * @param  {Property.<number>} protonCountProperty
   * @param  {Property.<number>} neutronCountProperty
   * @param  {Object} [options]
   */
  constructor( model, options ) {

    options = merge( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      resize: false,
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty
    }, options );

    // each element must have a unique interaction property to support multitouch, see #104
    const leftProtonButtonInteractionProperty = interactionPropertyGroup.leftProtonButtonInteractionProperty;
    const rightProtonButtonInteractionProperty = interactionPropertyGroup.rightProtonButtonInteractionProperty;
    const leftNeutronButtonInteractionProperty = interactionPropertyGroup.leftNeutronButtonInteractionProperty;
    const rightNeutronButtonInteractionProperty = interactionPropertyGroup.leftProtonButtonInteractionProperty;
    const protonSliderInteractionProperty = interactionPropertyGroup.protonSliderInteractionProperty;
    const neutronSliderInteractionProperty = interactionPropertyGroup.neutronSliderInteractionProperty;

    // these properties are true when any of the dependencies are true
    const protonPanelInteractionProperty = DerivedProperty.or( [ leftProtonButtonInteractionProperty, rightProtonButtonInteractionProperty, protonSliderInteractionProperty ] );
    const neutronPanelInteractionProperty = DerivedProperty.or( [ leftNeutronButtonInteractionProperty, rightNeutronButtonInteractionProperty, neutronSliderInteractionProperty ] );

    // must be disposed
    const protonInteractionListener = protonInteraction => {
      model.protonInteractionProperty.set( protonInteraction );
    };
    const neutronInteractionListener = neutronInteraction => {
      model.neutronInteractionProperty.set( neutronInteraction );
    };
    protonPanelInteractionProperty.link( protonInteractionListener );
    neutronPanelInteractionProperty.link( neutronInteractionListener );
    // end of multitouch set up

    /**
     * Track fingers for multitouch, adding a finger count to a particular element and setting
     * the interaction properties correctly.
     *
     * @param  {string} sliderID
     * @param  {Property.<boolean>} interactionProperty
     */
    const addFinger = ( sliderID, interactionProperty ) => {
      interactionProperty.set( true );
      if ( !FINGER_TRACKER[ sliderID ] && FINGER_TRACKER[ sliderID ] !== 0 ) {
        FINGER_TRACKER[ sliderID ] = 1; // first time finger is down on this thumb
      }
      else {
        FINGER_TRACKER[ sliderID ]++;
      }
    };

    /**
     * Remove a finger from an element for multitouch support, removing a finger count from a particular element
     * and setting the interaction properties appropriately.
     *
     * @param  {string} sliderID
     * @param  {Property.<boolean>} interactionProperty
     * @param  {Property.<number>} countProperty
     */
    const removeFinger = ( sliderID, interactionProperty, countProperty ) => {
      FINGER_TRACKER[ sliderID ]--;
      assert && assert( FINGER_TRACKER[ sliderID ] >= 0, 'at least 0 fingers must be using the slider' );
      countProperty.set( Utils.roundSymmetric( countProperty.value ) ); // proper resolution for nucleons
      if ( FINGER_TRACKER[ sliderID ] === 0 ) {
        interactionProperty.set( false );
      }
    };

    const sliderWidth = options.minWidth * 0.75;
    const numberControlOptions = {
      layoutFunction: NumberControl.createLayoutFunction3( {
        ySpacing: 3,
        alignTitle: 'left',
        titleLeftIndent: options.minWidth * 0.05 // indent of the title
      } ),
      titleNodeOptions: {
        font: RSConstants.PANEL_PROPERTY_FONT.copy( { weight: 'bold' } ),
        maxWidth: 210
      },
      numberDisplayOptions: {
        backgroundStroke: 'black',
        textOptions: {
          font: RSConstants.PANEL_VALUE_DISPLAY_FONT
        }
      },
      sliderOptions: {
        trackSize: new Dimension2( sliderWidth, 1 ),
        trackFill: RSColors.panelSliderLabelColorProperty,
        trackStroke: RSColors.panelSliderLabelColorProperty,
        thumbCenterLineStroke: 'white',
        thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,

        majorTickStroke: RSColors.panelSliderLabelColorProperty,
        majorTickLength: 15,
        tickLabelSpacing: 2,

        // pdom
        keyboardStep: 5,
        pageKeyboardStep: 10
      }
    };

    // allowable range for proton values
    const protonCountRange = new RangeWithValue( RSConstants.MIN_PROTON_COUNT, RSConstants.MAX_PROTON_COUNT,
      RSConstants.DEFAULT_PROTON_COUNT );

    const protonMajorTicks = [
      {
        value: protonCountRange.min,
        label: new Text( protonCountRange.min, {
          font: RSConstants.PANEL_TICK_FONT,
          fill: RSColors.panelSliderLabelColorProperty,
          pickable: false
        } )
      },
      {
        value: protonCountRange.max,
        label: new Text( protonCountRange.max, {
          font: RSConstants.PANEL_TICK_FONT,
          fill: RSColors.panelSliderLabelColorProperty,
          pickable: false
        } )
      }
    ];

    // will track whether we are pressing and holding arrow buttons down
    let rightProtonButtonDown = false;
    let leftProtonButtonDown = false;

    // Number control for protons
    const protonNumberControlOptions = merge( {}, numberControlOptions );
    protonNumberControlOptions.titleNodeOptions = merge( {},
      numberControlOptions.titleNodeOptions, { fill: RSColors.protonsLabelColorProperty } );
    protonNumberControlOptions.arrowButtonOptions = {
      leftStart: () => {
        leftProtonButtonDown = true;
      },
      leftEnd: () => {
        leftProtonButtonInteractionProperty.set( false );
        leftProtonButtonDown = false;
        model.removeAllParticles();
      },
      rightStart: () => {
        rightProtonButtonDown = true;
      },
      rightEnd: () => {
        rightProtonButtonInteractionProperty.set( false );
        rightProtonButtonDown = false;
        model.removeAllParticles();
      }
    };
    protonNumberControlOptions.sliderOptions = merge( {},
      numberControlOptions.sliderOptions, {
        majorTicks: protonMajorTicks,

        thumbFill: 'rgb(220, 58, 10)',
        thumbFillHighlighted: 'rgb(270, 108, 60)',

        // Individual callbacks for each component of the NumberControl to support multitouch
        startDrag: () => { addFinger( 'protonCountSlider', protonSliderInteractionProperty ); },
        endDrag: () => { removeFinger( 'protonCountSlider', protonSliderInteractionProperty, this.protonCountProperty ); },

        // pdom
        labelContent: protonsValuePatternString,
        labelTagName: 'label',
        descriptionContent: protonSliderDescriptionString,
        containerTagName: 'div'
      } );
    const protonNumberControl = new NumberControl( numberOfProtonsString, model.protonCountProperty, protonCountRange, protonNumberControlOptions );

    function protonCountListener() {

      // if we are still pressing the arrow buttons while neutron count is changing, we are pressing and holding -
      // update the interaction Properties so that the dashed circle appears
      if ( leftProtonButtonDown ) {
        leftProtonButtonInteractionProperty.set( true );
      }
      if ( rightProtonButtonDown ) {
        rightProtonButtonInteractionProperty.set( true );
      }
    }

    model.protonCountProperty.link( protonCountListener );

    const neutronCountRange = new RangeWithValue( RSConstants.MIN_NEUTRON_COUNT, RSConstants.MAX_NEUTRON_COUNT,
      RSConstants.DEFAULT_NEUTRON_COUNT );

    const neutronMajorTicks = [ {
      value: neutronCountRange.min,
      label: new Text( neutronCountRange.min, {
        font: RSConstants.PANEL_TICK_FONT,
        fill: RSColors.panelSliderLabelColorProperty,
        pickable: false
      } )
    },
      {
        value: neutronCountRange.max,
        label: new Text( neutronCountRange.max, {
          font: RSConstants.PANEL_TICK_FONT,
          fill: RSColors.panelSliderLabelColorProperty,
          pickable: false
        } )
      }
    ];

    // will track whether we are pressing and holding arrow buttons down
    let leftNeutronButtonDown = false;
    let rightNeutronButtonDown = false;

    // Number control for protons
    const neutronNumberControlOptions = merge( {}, numberControlOptions );
    neutronNumberControlOptions.titleNodeOptions = merge( {},
      numberControlOptions.titleNodeOptions, { fill: RSColors.neutronsLabelColorProperty }
    );
    neutronNumberControlOptions.sliderOptions = merge( {},
      numberControlOptions.sliderOptions, {
        majorTicks: neutronMajorTicks,

        thumbFill: 'rgb(130, 130, 130)',
        thumbFillHighlighted: 'rgb(180, 180, 180)',

        // Individual callbacks for each component of the NumberControl to support multitouch
        startDrag: () => { addFinger( 'neutronCountSlider', neutronSliderInteractionProperty ); },
        endDrag: () => { removeFinger( 'neutronCountSlider', neutronSliderInteractionProperty, this.neutronCountProperty ); },

        // pdom
        labelContent: neutronsValuePatternString,
        labelTagName: 'label',
        descriptionContent: neutronSliderDescriptionString,
        containerTagName: 'div'
      }
    );

    neutronNumberControlOptions.arrowButtonOptions = {
      leftEnd: () => {
        leftNeutronButtonInteractionProperty.set( false );
        leftNeutronButtonDown = false;
        model.removeAllParticles();
      },
      rightEnd: () => {
        rightNeutronButtonInteractionProperty.set( false );
        rightNeutronButtonDown = false;
        model.removeAllParticles();
      },
      leftStart: () => {
        leftNeutronButtonDown = true;
      },
      rightStart: () => {
        rightNeutronButtonDown = true;
      }
    };
    const neutronNumberControl = new NumberControl( numberOfNeutronsString, model.neutronCountProperty, neutronCountRange, neutronNumberControlOptions );

    function neutronCountListener() {

      // if we are still pressing the arrow buttons while neutron count is changing, we are pressing and holding -
      // update the interaction Properties so that the dashed circle appears
      if ( leftNeutronButtonDown ) {
        leftNeutronButtonInteractionProperty.set( true );
      }
      if ( rightNeutronButtonDown ) {
        rightNeutronButtonInteractionProperty.set( true );
      }
    }

    // main panel content
    super( {
      spacing: RSConstants.PANEL_CHILD_SPACING * 2.1,
      top: 0,
      right: 0,
      align: 'left',
      resize: false,
      children: [ protonNumberControl, neutronNumberControl ]
    } );

    // @private
    this.protonInteractionProperty = model.protonInteractionProperty;
    this.neutronInteractionProperty = model.neutronInteractionProperty;
    this.neutronCountProperty = model.neutronCountProperty;
    this.protonCountProperty = model.protonCountProperty;

    this.neutronCountProperty.link( neutronCountListener );

    this.disposeContent = () => {
      // NOTE: Disposing arrow buttons causes an assertion failure, see axon #77.
      // However, there is no indication of a memory leak even though these are commented
      // dispose arrow buttons
      // this.protonMinusButton.dispose();
      // this.protonPlusButton.dispose();
      // this.neutronMinusButton.dispose();
      // this.neutronPlusButton.dispose();

      // dispose listeners attached to proton/neutron count Properties
      this.neutronCountProperty.unlink( neutronCountListener );
      this.protonCountProperty.unlink( protonCountListener );

      // dispose number controls
      protonNumberControl.dispose();
      neutronNumberControl.dispose();

      // dispose the derived properties
      protonPanelInteractionProperty.dispose();
      neutronPanelInteractionProperty.dispose();
    };
  }


  /**
   * Make eligible for garbage collection.
   * @public
   */
  dispose() {
    this.disposeContent();
    super.dispose();
  }
}

rutherfordScattering.register( 'AtomPropertiesPanelContent', AtomPropertiesPanelContent );

rutherfordScattering.register( 'AtomPropertiesPanel', AtomPropertiesPanel );
export default AtomPropertiesPanel;