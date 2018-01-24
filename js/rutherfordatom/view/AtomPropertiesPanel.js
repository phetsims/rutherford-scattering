// Copyright 2016-2017, University of Colorado Boulder

/**
 * Control panel to adjust the number of protons and neutrons used in the sim
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var DerivedProperty = require( 'AXON/DerivedProperty' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var NumberControl = require( 'SCENERY_PHET/NumberControl' );
  var Panel = require( 'SUN/Panel' );
  var RangeWithValue = require( 'DOT/RangeWithValue' );
  var RSColorProfile = require( 'RUTHERFORD_SCATTERING/common/RSColorProfile' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Util = require( 'DOT/Util' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  // strings
  var atomString = require( 'string!RUTHERFORD_SCATTERING/atom' );
  var numberOfNeutronsString = require( 'string!RUTHERFORD_SCATTERING/numberOfNeutrons' );
  var numberOfProtonsString = require( 'string!RUTHERFORD_SCATTERING/numberOfProtons' );

  // global, tracking where fingers are for multitouch support
  // must persist beyond lifetime of the panel so that fingers are tracked when new
  // panels are created for scene or color profile changes
  var FINGER_TRACKER = {};

  /**
   * Constructor for a Atom Properties control panel.
   *
   * @param {AtomPropertiesPanelContent} content - Content contained by the panel
   * @param {Object} [options]
   * @constructor
   */
  function AtomPropertiesPanel( content, options ) {

    options = _.extend( {
      xMargin: RSConstants.PANEL_X_MARGIN,
      yMargin: 10,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      resize: false,
      fill: RSColorProfile.panelColorProperty,
      stroke: RSColorProfile.panelBorderColorProperty
    }, options );

    Panel.call( this, content, options );

    // ensure that panel is eligible for garbage collection, a panel is created and destroyed every time
    // scene or color scheme changes so it si important that everything is disposed
    // @private
    this.disposeAtomPropertiesPanel = function() {
      content.dispose();
    };
  }

  rutherfordScattering.register( 'AtomPropertiesPanel', AtomPropertiesPanel );

  inherit( Panel, AtomPropertiesPanel, {

    /**
     * Dispose this panel - this panel can be created and destroyed frequently so
     * it is important to dispose of all panel elements.
     *
     * @public
     */
    dispose: function() {
      Panel.prototype.dispose.call( this );
      this.disposeAtomPropertiesPanel();
    }
  }, {

    /**
     * create content for the panel
     *
     * @param  {Object} interactionPropertyGroup
     * @param  {Property.<boolean>} protonInteractionProperty
     * @param  {Property.<boolean>} neutronInteractionProperty
     * @param  {Property.<number>} protonCountProperty
     * @param  {Property.<number>} neutronCountProperty
     * @param  {Object} options
     * @public
     */
    createPanelContent: function( interactionPropertyGroup, protonInteractionProperty, neutronInteractionProperty, protonCountProperty, neutronCountProperty, options ) {
      return new AtomPropertiesPanelContent( interactionPropertyGroup, protonInteractionProperty, neutronInteractionProperty, protonCountProperty, neutronCountProperty, options );
    }
  } );

  /**
   * Create the content for the AtomPropertiesPanel.
   *
   * @param  {Object} interactionPropertyGroup - group of Properties for the model tracking interaction with various components
   * @param  {Property.<boolean>} protonInteractionProperty
   * @param  {Property.<boolean>} neutronInteractionProperty
   * @param  {Property.<number>} protonCountProperty
   * @param  {Property.<number>} neutronCountProperty
   * @param  {Object} options
   * @constructor
   */
  function AtomPropertiesPanelContent( interactionPropertyGroup, protonInteractionProperty, neutronInteractionProperty, protonCountProperty, neutronCountProperty, options ) {

    options = _.extend( {
      xMargin: 15,
      yMargin: 8,
      minWidth: RSConstants.PANEL_MIN_WIDTH,
      maxWidth: RSConstants.PANEL_MAX_WIDTH,
      align: 'left',
      resize: false,
      fill: RSColorProfile.panelColorProperty,
      stroke: RSColorProfile.panelBorderColorProperty
    }, options );

    // @private
    this.protonInteractionProperty = protonInteractionProperty;
    this.neutronInteractionProperty = neutronInteractionProperty;
    this.neutronCountProperty = neutronCountProperty;
    this.protonCountProperty = protonCountProperty;

    // each element must have a unique interaction property to support multitouch, see #104
    var leftProtonButtonInteractionProperty = interactionPropertyGroup.leftProtonButtonInteractionProperty;
    var rightProtonButtonInteractionProperty = interactionPropertyGroup.rightProtonButtonInteractionProperty;
    var leftNeutronButtonInteractionProperty = interactionPropertyGroup.leftNeutronButtonInteractionProperty;
    var rightNeutronButtonInteractionProperty = interactionPropertyGroup.leftProtonButtonInteractionProperty;
    var protonSliderInteractionProperty = interactionPropertyGroup.protonSliderInteractionProperty;
    var neutronSliderInteractionProperty = interactionPropertyGroup.neutronSliderInteractionProperty;

    // these properties are true when any of the dependencies are true
    var protonPanelInteractionProperty = DerivedProperty.or( [ leftProtonButtonInteractionProperty, rightProtonButtonInteractionProperty, protonSliderInteractionProperty ] );
    var neutronPanelInteractionProperty = DerivedProperty.or( [ leftNeutronButtonInteractionProperty, rightNeutronButtonInteractionProperty, neutronSliderInteractionProperty ] );

    // must be disposed
    var protonInteractionListener = function( protonInteraction ) {
      protonInteractionProperty.set( protonInteraction );
    };
    var neutronInteractionListener = function( neutronInteraction ) {
      neutronInteractionProperty.set( neutronInteraction );
    };
    protonPanelInteractionProperty.link( protonInteractionListener );
    neutronPanelInteractionProperty.link( neutronInteractionListener );
    // end of multitouch set up


    // Add the title of the panel content
    var atomPropertiesText = new Text( atomString, {
      font: RSConstants.PANEL_TITLE_FONT,
      fontWeight: 'bold',
      fill: RSColorProfile.panelTitleColorProperty,
      maxWidth: 225
    } );


    /**
     * Track fingers for multitouch, adding a finger count to a particular element and setting
     * the interaction properties correctly.
     *
     * @param  {string} sliderID
     * @param  {Property.<boolean>} interactionProperty
     */
    var addFinger = function( sliderID, interactionProperty ) {
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
    var removeFinger = function( sliderID, interactionProperty, countProperty ) {
      FINGER_TRACKER[ sliderID ]--;
      assert && assert( FINGER_TRACKER[ sliderID ] >= 0, 'at least 0 fingers must be using the slider' );
      countProperty.set( Util.roundSymmetric( countProperty.value ) ); // proper resolution for nucleons
      if ( FINGER_TRACKER[ sliderID ] === 0 ) {
        interactionProperty.set( false );
      }
    };

    /**
     * Generalized callback for each arrow button - proton/neutronInteractionProperty
     * should only be set if the new value is in the allowable range
     * @param {Property.<Number>} countProperty
     * @param interactionProperty
     * @param delta
     * @param valueRange
     */
    var arrowButtonStartCallback = function( countProperty, interactionProperty, delta, valueRange ) {
      var newValue = countProperty.value + delta;
      if ( valueRange.contains( newValue ) ) {
        interactionProperty.set( true );
      }
    };

    var sliderWidth = options.minWidth * 0.75;
    var numberControlOptions = {
      layoutFunction: NumberControl.createLayoutFunction3( {
        ySpacing: 3,
        alignTitle: 'left',
        titleLeftIndent: options.minWidth * 0.05 // indent of the title
      } ),
      titleFont: RSConstants.PANEL_PROPERTY_FONT.copy( { weight: 'bold' } ),
      titleMaxWidth: 210,

      valueBackgroundStroke: 'black',
      valueFont: RSConstants.PANEL_VALUE_DISPLAY_FONT,

      trackSize: new Dimension2( sliderWidth, 1 ),
      trackFill: RSColorProfile.panelSliderLabelColorProperty,
      trackStroke: RSColorProfile.panelSliderLabelColorProperty,
      thumbCenterLineStroke: 'white',
      thumbSize: RSConstants.PANEL_SLIDER_THUMB_DIMENSION,

      majorTickStroke: RSColorProfile.panelSliderLabelColorProperty,
      majorTickLength: 15,
      tickLabelSpacing: 2,

      // a11y
      keyboardStep: 5,
      pageKeyboardStep: 10
    };

    // allowable range for proton values
    var protonCountRange = new RangeWithValue( RSConstants.MIN_PROTON_COUNT, RSConstants.MAX_PROTON_COUNT,
      RSConstants.DEFAULT_PROTON_COUNT );

    var protonMajorTicks = [
      {
        value: protonCountRange.min,
        label: new Text( protonCountRange.min, {
          font: RSConstants.PANEL_TICK_FONT,
          fill: RSColorProfile.panelSliderLabelColorProperty,
          pickable: false
        } )
      },
      {
        value: protonCountRange.max,
        label: new Text( protonCountRange.max, {
          font: RSConstants.PANEL_TICK_FONT,
          fill: RSColorProfile.panelSliderLabelColorProperty,
          pickable: false
        } )
      }
    ];

    // Number control for protons
    var protonNumberControl = new NumberControl( numberOfProtonsString, protonCountProperty, protonCountRange, _.extend( numberControlOptions, {
      titleFill: RSColorProfile.protonsLabelColorProperty,
      majorTicks: protonMajorTicks,

      thumbFillEnabled: 'rgb(220, 58, 10)',
      thumbFillHighlighted: 'rgb(270, 108, 60)',

      // Individual callbacks for each component of the NumberControl to support multitouch
      sliderStartCallback: function() { addFinger( 'protonCountSlider', protonSliderInteractionProperty ); },
      sliderEndCallback: function() { removeFinger( 'protonCountSlider', protonSliderInteractionProperty, protonCountProperty ); },
      leftArrowStartCallback: function() { arrowButtonStartCallback( protonCountProperty, leftProtonButtonInteractionProperty, -1, protonCountRange ); },
      leftArrowEndCallback: function() {leftProtonButtonInteractionProperty.set( false ); },
      rightArrowStartCallback: function() { arrowButtonStartCallback( protonCountProperty, rightProtonButtonInteractionProperty, 1, protonCountRange ); },
      rightArrowEndCallback: function() {rightProtonButtonInteractionProperty.set( false ); }
    } ) );


    var neutronCountRange = new RangeWithValue( RSConstants.MIN_NEUTRON_COUNT, RSConstants.MAX_NEUTRON_COUNT,
      RSConstants.DEFAULT_NEUTRON_COUNT );

    var neutronAddedStartCallback = function() {
      arrowButtonStartCallback( neutronCountProperty, rightNeutronButtonInteractionProperty, 1, neutronCountRange );
    };
    var neutronRemovedStartCallback = function() {
      arrowButtonStartCallback( neutronCountProperty, leftNeutronButtonInteractionProperty, -1, neutronCountRange );
    };

    var neutronMajorTicks = [ {
      value: neutronCountRange.min,
      label: new Text( neutronCountRange.min, {
        font: RSConstants.PANEL_TICK_FONT,
        fill: RSColorProfile.panelSliderLabelColorProperty,
        pickable: false
      } )
    },
      {
        value: neutronCountRange.max,
        label: new Text( neutronCountRange.max, {
          font: RSConstants.PANEL_TICK_FONT,
          fill: RSColorProfile.panelSliderLabelColorProperty,
          pickable: false
        } )
      }
    ];


    // Number control for protons
    var neutronNumberControl = new NumberControl( numberOfNeutronsString, neutronCountProperty, neutronCountRange,
      _.extend( numberControlOptions, {
          titleFill: RSColorProfile.neutronsLabelColorProperty,
          majorTicks: neutronMajorTicks,

          thumbFillEnabled: 'rgb(130, 130, 130)',
          thumbFillHighlighted: 'rgb(180, 180, 180)',

          // Individual callbacks for each component of the NumberControl to support multitouch
          sliderStartCallback: function() { addFinger( 'neutronCountSlider', neutronSliderInteractionProperty ); },
          sliderEndCallback: function() { removeFinger( 'neutronCountSlider', neutronSliderInteractionProperty, neutronCountProperty ); },
          leftArrowStartCallback: neutronRemovedStartCallback,
          leftArrowEndCallback: function() { leftNeutronButtonInteractionProperty.set( false ); },
          rightArrowStartCallback: neutronAddedStartCallback,
          rightArrowEndCallback: function() { rightNeutronButtonInteractionProperty.set( false ); }
        }
      ) );

    // main panel content
    VBox.call( this, {
      spacing: RSConstants.PANEL_CHILD_SPACING * 2.1,
      top: 0,
      right: 0,
      align: 'left',
      resize: false,
      children: [ atomPropertiesText, protonNumberControl, neutronNumberControl ]
    } );

    this.disposeContent = function() {
      // NOTE: Disposing arrow buttons causes an assertion failure, see axon #77.
      // However, there is no indication of a memory leak even though these are commented
      // dispose arrow buttons
      // this.protonMinusButton.dispose();
      // this.protonPlusButton.dispose();
      // this.neutronMinusButton.dispose();
      // this.neutronPlusButton.dispose();

      // dispose number controls
      protonNumberControl.dispose();
      neutronNumberControl.dispose();

      // dispose the derived properties
      protonPanelInteractionProperty.dispose();
      neutronPanelInteractionProperty.dispose();
    };
  }

  inherit( VBox, AtomPropertiesPanelContent, {

    /**
     * Make eligible for garbage collection
     *
     * @returns {type}  description
     */
    dispose: function() {
      this.disposeContent();
      VBox.prototype.dispose.call( this );
    }
  } );

  rutherfordScattering.register( 'AtomPropertiesPanelContent', AtomPropertiesPanelContent );

  return AtomPropertiesPanel;
} );
