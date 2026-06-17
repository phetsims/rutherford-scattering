// Copyright 2016-2026, University of Colorado Boulder

/**
 * Location for all colors, especially those that must change for projector mode.
 * There are two profiles 'default' and 'projector' which can enhance visibility when using a projector.
 *
 * @author Jesse Greenberg
 */

import Color from '../../../scenery/js/util/Color.js';
import ProfileColorProperty from '../../../scenery/js/util/ProfileColorProperty.js';
import rutherfordScattering from '../rutherfordScattering.js';

// Initial colors for each profile, by string key.  If a projector color is not defined, it will take
// the 'default' value provided.
// NOTE: This is NOT provided to clients directly, but each of these are passed to the Property constructor.
const RSColors = {
  backgroundColorProperty: new ProfileColorProperty( rutherfordScattering, 'backgroundColor', {
    default: new Color( 0, 0, 0 ),
    projector: new Color( 255, 255, 255 )
  } ),
  panelColorProperty: new ProfileColorProperty( rutherfordScattering, 'panelColor', {
    default: new Color( 0, 0, 0 ),
    projector: new Color( 255, 255, 255 )
  } ),
  radioButtonBorderColorProperty: new ProfileColorProperty( rutherfordScattering, 'radioButtonBorderColor', {
    default: new Color( 200, 200, 95 ),
    projector: new Color( 0, 162, 194 )
  } ),
  panelBorderColorProperty: new ProfileColorProperty( rutherfordScattering, 'panelBorderColor', {
    default: new Color( 128, 128, 128 ),
    projector: new Color( 128, 128, 128 )
  } ),
  panelTitleColorProperty: new ProfileColorProperty( rutherfordScattering, 'panelTitleColor', {
    default: new Color( 200, 200, 95 ),
    projector: new Color( 0, 0, 0 )
  } ),
  panelLabelColorProperty: new ProfileColorProperty( rutherfordScattering, 'panelLabelColor', {
    default: new Color( 210, 210, 210 ),
    projector: new Color( 0, 0, 0 )
  } ),
  protonsLabelColorProperty: new ProfileColorProperty( rutherfordScattering, 'protonsLabelColor', {
    default: new Color( 220, 58, 11 ),
    projector: new Color( 220, 58, 11 )
  } ),
  neutronsLabelColorProperty: new ProfileColorProperty( rutherfordScattering, 'neutronsLabelColor', {
    default: new Color( 160, 160, 160 ),
    projector: new Color( 125, 125, 125 )
  } ),
  atomBeamColorProperty: new ProfileColorProperty( rutherfordScattering, 'atomBeamColor', {
    default: new Color( 143, 143, 143, 0.7 ),
    projector: new Color( 103, 103, 103, 0.7 )
  } ),
  nucleusBeamColorProperty: new ProfileColorProperty( rutherfordScattering, 'nucleusBeamColor', {
    default: new Color( 143, 143, 143 ),
    projector: new Color( 103, 103, 103 )
  } ),
  nucleusColorProperty: new ProfileColorProperty( rutherfordScattering, 'nucleusColor', {
    default: new Color( 200, 200, 95 ),
    projector: new Color( 128, 128, 0 )
  } ),
  panelSliderLabelColorProperty: new ProfileColorProperty( rutherfordScattering, 'panelSliderLabelColor', {
    default: new Color( 180, 180, 180 ),
    projector: new Color( 0, 0, 0 )
  } ),
  screenIconFillColorProperty: new ProfileColorProperty( rutherfordScattering, 'screenIconFillColor', {
    default: new Color( 0, 0, 0 ),
    projector: new Color( 0, 0, 0 )
  } ),
  nucleusOutlineColorProperty: new ProfileColorProperty( rutherfordScattering, 'nucleusOutlineColor', {
    default: new Color( 255, 255, 255 ),
    projector: new Color( 0, 0, 0 )
  } ),
  plumPuddingTraceColorProperty: new ProfileColorProperty( rutherfordScattering, 'plumPuddingTraceColor', {
    default: new Color( '#C4C4C4' ),
    projector: new Color( '#212121' )
  } ),
  laserPointerTopColorProperty: new ProfileColorProperty( rutherfordScattering, 'laserPointerTopColor', {
    default: new Color( 217, 153, 89 )
  } ),
  laserPointerHighlightColorProperty: new ProfileColorProperty( rutherfordScattering, 'laserPointerHighlightColor', {
    default: new Color( 236, 204, 172 )
  } ),
  laserPointerBottomColorProperty: new ProfileColorProperty( rutherfordScattering, 'laserPointerBottomColor', {
    default: new Color( 198, 140, 83 )
  } ),
  laserPointerButtonColorProperty: new ProfileColorProperty( rutherfordScattering, 'laserPointerButtonColor', {
    default: new Color( 255, 0, 0 )
  } )
};

export default RSColors;
