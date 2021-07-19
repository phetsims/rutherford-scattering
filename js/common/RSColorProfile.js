// Copyright 2016-2021, University of Colorado Boulder

/**
 * Location for all colors, especially those that must change for projector mode.
 * There are two profiles 'default' and 'projector' which can enhance visibility when using a projector.
 *
 * @author Jesse Greenberg
 */

import FocusHighlightPath from '../../../scenery/js/accessibility/FocusHighlightPath.js';
import Color from '../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import rutherfordScattering from '../rutherfordScattering.js';

// Initial colors for each profile, by string key.  If a projector color is not defined, it will take
// the 'default' value provided.
// NOTE: This is NOT provided to clients directly, but each of these are passed to the Property constructor,
// see ColorProfile.js
const RSColorProfile = {
  backgroundColorProperty: new ProfileColorProperty( 'backgroundColor', {
    default: new Color( 0, 0, 0 ),
    projector: new Color( 255, 255, 255 )
  } ),
  panelColorProperty: new ProfileColorProperty( 'panelColor', {
    default: new Color( 0, 0, 0 ),
    projector: new Color( 255, 255, 255 )
  } ),
  radioButtonBorderColorProperty: new ProfileColorProperty( 'radioButtonBorderColor', {
    default: new Color( 200, 200, 95 ),
    projector: new Color( 49, 193, 221 )
  } ),
  panelBorderColorProperty: new ProfileColorProperty( 'panelBorderColor', {
    default: new Color( 128, 128, 128 ),
    projector: new Color( 128, 128, 128 )
  } ),
  panelTitleColorProperty: new ProfileColorProperty( 'panelTitleColor', {
    default: new Color( 200, 200, 95 ),
    projector: new Color( 0, 0, 0 )
  } ),
  panelLabelColorProperty: new ProfileColorProperty( 'panelLabelColor', {
    default: new Color( 210, 210, 210 ),
    projector: new Color( 0, 0, 0 )
  } ),
  protonsLabelColorProperty: new ProfileColorProperty( 'protonsLabelColor', {
    default: new Color( 185, 50, 8 ),
    projector: new Color( 185, 50, 8 )
  } ),
  neutronsLabelColorProperty: new ProfileColorProperty( 'neutronsLabelColor', {
    default: new Color( 160, 160, 160 ),
    projector: new Color( 125, 125, 125 )
  } ),
  atomBeamColorProperty: new ProfileColorProperty( 'atomBeamColor', {
    default: new Color( 143, 143, 143, 0.4 ),
    projector: new Color( 143, 143, 143, 0.4 )
  } ),
  nucleusBeamColorProperty: new ProfileColorProperty( 'nucleusBeamColor', {
    default: new Color( 143, 143, 143 ),
    projector: new Color( 163, 163, 163 )
  } ),
  nucleusColorProperty: new ProfileColorProperty( 'nucleusColor', {
    default: new Color( 200, 200, 95 ),
    projector: new Color( 128, 128, 0 )
  } ),
  panelSliderLabelColorProperty: new ProfileColorProperty( 'panelSliderLabelColor', {
    default: new Color( 180, 180, 180 ),
    projector: new Color( 0, 0, 0 )
  } ),
  screenIconFillColorProperty: new ProfileColorProperty( 'screenIconFillColor', {
    default: new Color( 0, 0, 0 ),
    projector: new Color( 0, 0, 0 )
  } ),
  nucleusOutlineColorProperty: new ProfileColorProperty( 'nucleusOutlineColor', {
    default: new Color( 255, 255, 255 ),
    projector: new Color( 0, 0, 0 )
  } ),
  innerGroupHighlightColorProperty: new ProfileColorProperty( 'innerGroupHighlightColor', {
    default: FocusHighlightPath.INNER_DARK_GROUP_FOCUS_COLOR,
    projector: FocusHighlightPath.INNER_LIGHT_GROUP_FOCUS_COLOR
  } ),
  outerGroupHighlightColorProperty: new ProfileColorProperty( 'outerGroupHighlightColor', {
    default: FocusHighlightPath.OUTER_DARK_GROUP_FOCUS_COLOR,
    projector: FocusHighlightPath.OUTER_LIGHT_GROUP_FOCUS_COLOR
  } )
};

rutherfordScattering.register( 'RSColorProfile', RSColorProfile );

export default RSColorProfile;