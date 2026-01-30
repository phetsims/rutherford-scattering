// Copyright 2016-2026, University of Colorado Boulder

/**
 * Control panel to adjust the number of protons and neutrons used in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 */

import Dimension2 from '../../../../dot/js/Dimension2.js';
import RangeWithValue from '../../../../dot/js/RangeWithValue.js';
import optionize, { combineOptions, EmptySelfOptions } from '../../../../phet-core/js/optionize.js';
import NumberControl, { NumberControlOptions } from '../../../../scenery-phet/js/NumberControl.js';
import VBox from '../../../../scenery/js/layout/nodes/VBox.js';
import Node from '../../../../scenery/js/nodes/Node.js';
import Text from '../../../../scenery/js/nodes/Text.js';
import Panel, { PanelOptions } from '../../../../sun/js/Panel.js';
import RSColors from '../../common/RSColors.js';
import RSConstants from '../../common/RSConstants.js';
import rutherfordScattering from '../../rutherfordScattering.js';
import RutherfordScatteringFluent from '../../RutherfordScatteringFluent.js';
import RutherfordAtomModel from '../model/RutherfordAtomModel.js';

// constants
const atomStringProperty = RutherfordScatteringFluent.atomStringProperty;
const numberOfNeutronsStringProperty = RutherfordScatteringFluent.numberOfNeutronsStringProperty;
const numberOfProtonsStringProperty = RutherfordScatteringFluent.numberOfProtonsStringProperty;
const atomSettingsStringProperty = RutherfordScatteringFluent.a11y.atomSettingsStringProperty;

//TODO https://github.com/phetsims/rutherford-scattering/issues/178 make these template vars again when working on descriptions
const protonsValuePatternStringProperty = RutherfordScatteringFluent.a11y.protonsValuePatternStringProperty;
const protonSliderDescriptionStringProperty = RutherfordScatteringFluent.a11y.protonSliderDescriptionStringProperty;
const neutronsValuePatternStringProperty = RutherfordScatteringFluent.a11y.neutronsValuePatternStringProperty;
const neutronSliderDescriptionStringProperty = RutherfordScatteringFluent.a11y.neutronSliderDescriptionStringProperty;

type SelfOptions = EmptySelfOptions;

type AtomPropertiesPanelOptions = SelfOptions & PanelOptions;

class AtomPropertiesPanel extends Panel {

  private readonly disposeAtomPropertiesPanel: () => void;

  public constructor( content: Node, providedOptions?: AtomPropertiesPanelOptions ) {

    // Add the title of the panel content
    const atomPropertiesText = new Text( atomStringProperty, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColors.panelTitleColorProperty,
      maxWidth: RSConstants.TEXT_MAX_WIDTH
    } );

    const panelBox = new VBox( {
      children: [ atomPropertiesText, content ],
      align: 'left',
      spacing: RSConstants.PANEL_CHILD_SPACING
    } );

    const options = optionize<AtomPropertiesPanelOptions, SelfOptions, PanelOptions>()( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: 10,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'center',
      resize: false,
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty,

      // pdom
      accessibleHeading: atomSettingsStringProperty
    }, providedOptions );

    super( panelBox, options );

    // ensure that panel is eligible for garbage collection, a panel is created and destroyed every time
    // scene or color scheme changes so it si important that everything is disposed
    this.disposeAtomPropertiesPanel = () => {
      content.dispose();
      atomPropertiesText.dispose();
    };
  }

  /**
   * create content for the panel
   */
  public static createPanelContent( model: RutherfordAtomModel, providedOptions?: AtomPropertiesPanelContentOptions ): Node {
    return new AtomPropertiesPanelContent( model, providedOptions );
  }

  /**
   * Dispose this panel - this panel can be created and destroyed frequently so
   * it is important to dispose of all panel elements.
   */
  public override dispose(): void {
    super.dispose();
    this.disposeAtomPropertiesPanel();
  }
}

type ContentSelfOptions = EmptySelfOptions;

type AtomPropertiesPanelContentOptions = ContentSelfOptions & PanelOptions;

class AtomPropertiesPanelContent extends VBox {
  private readonly disposeContent: () => void;

  /**
   * Create the content for the AtomPropertiesPanel. This does not include the panel title.
   */
  public constructor( model: RutherfordAtomModel, providedOptions?: AtomPropertiesPanelContentOptions ) {

    const options = optionize<AtomPropertiesPanelContentOptions, ContentSelfOptions, PanelOptions>()( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      resize: false,
      fill: RSColors.panelColorProperty,
      stroke: RSColors.panelBorderColorProperty
    }, providedOptions );

    const sliderWidth = options.minWidth * 0.75;
    const numberControlOptions: NumberControlOptions = {
      layoutFunction: NumberControl.createLayoutFunction3( {
        ySpacing: 3,
        alignTitle: 'left',
        titleLeftIndent: options.minWidth * 0.05 // indent of the title
      } ),
      titleNodeOptions: {
        font: RSConstants.PANEL_PROPERTY_FONT.copy( { weight: 'bold' } ),
        maxWidth: RSConstants.TEXT_MAX_WIDTH
      },
      numberDisplayOptions: {
        backgroundStroke: 'black',
        textOptions: {
          font: RSConstants.PANEL_VALUE_DISPLAY_FONT
        }
      },
      sliderOptions: {
        trackSize: new Dimension2( sliderWidth, 1 ),
        trackFillEnabled: RSColors.panelSliderLabelColorProperty,
        trackStroke: RSColors.panelSliderLabelColorProperty,
        thumbCenterLineStroke: 'white',
        thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,

        majorTickStroke: RSColors.panelSliderLabelColorProperty,
        majorTickLength: 15,
        tickLabelSpacing: 2,

        startDrag: () => {
          model.userInteractionProperty.value = true;
        },
        endDrag: () => {
          model.userInteractionProperty.value = false;
        },

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

    // Number control for protons
    const protonNumberControlOptions = combineOptions<NumberControlOptions>( {
      titleNodeOptions: {
        fill: RSColors.protonsLabelColorProperty
      },
      sliderOptions: {
        majorTicks: protonMajorTicks,
        thumbFill: 'rgb(220, 58, 10)',
        thumbFillHighlighted: 'rgb(270, 108, 60)'
      },
      // pdom
      accessibleName: protonsValuePatternStringProperty,
      accessibleHelpText: protonSliderDescriptionStringProperty
    }, numberControlOptions );

    const protonNumberControl = new NumberControl( numberOfProtonsStringProperty, model.protonCountProperty, protonCountRange, protonNumberControlOptions );

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

    // Number control for neutrons
    const neutronNumberControlOptions = combineOptions<NumberControlOptions>( {
      titleNodeOptions: { fill: RSColors.neutronsLabelColorProperty },
      sliderOptions: {
        majorTicks: neutronMajorTicks,
        thumbFill: 'rgb(130, 130, 130)',
        thumbFillHighlighted: 'rgb(180, 180, 180)'
      },
      // pdom
      accessibleName: neutronsValuePatternStringProperty,
      accessibleHelpText: neutronSliderDescriptionStringProperty
    }, numberControlOptions );

    const neutronNumberControl = new NumberControl( numberOfNeutronsStringProperty, model.neutronCountProperty, neutronCountRange, neutronNumberControlOptions );

    // main panel content
    super( {
      spacing: RSConstants.PANEL_CHILD_SPACING * 2.1,
      top: 0,
      right: 0,
      align: 'left',
      resize: false,
      children: [ protonNumberControl, neutronNumberControl ]
    } );

    this.disposeContent = () => {
      // dispose number controls
      protonNumberControl.dispose();
      neutronNumberControl.dispose();
    };
  }


  /**
   * Make eligible for garbage collection.
   */
  public override dispose(): void {
    this.disposeContent();
    super.dispose();
  }
}

rutherfordScattering.register( 'AtomPropertiesPanelContent', AtomPropertiesPanelContent );

rutherfordScattering.register( 'AtomPropertiesPanel', AtomPropertiesPanel );
export default AtomPropertiesPanel;