// Copyright 2016-2019, University of Colorado Boulder

/**
 * Location for all colors, especially those that must change for projector mode.
 * There are two profiles 'default' and 'projector' which can enhance visibility when using a projector.
 *
 * @author Jesse Greenberg
 */

define( require => {
  'use strict';

  // modules
  const Color = require( 'SCENERY/util/Color' );
  const ColorProfile = require( 'SCENERY_PHET/ColorProfile' );
  const FocusHighlightPath = require( 'SCENERY/accessibility/FocusHighlightPath' );
  const rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // Initial colors for each profile, by string key.  If a projector color is not defined, it will take
  // the 'default' value provided.
  // NOTE: This is NOT provided to clients directly, but each of these are passed to the Property constructor,
  // see ColorProfile.js
  var RSColorProfile = new ColorProfile( [ 'default', 'projector' ], {
    backgroundColor: {
      default: new Color( 0, 0, 0 ),
      projector: new Color( 255, 255, 255 )
    },
    panelColor: {
      default: new Color( 0, 0, 0 ),
      projector: new Color( 255, 255, 255 )
    },
    radioButtonBorderColor: {
      default: new Color( 200, 200, 95 ),
      projector: new Color( 49, 193, 221 )
    },
    panelBorderColor: {
      default: new Color( 128, 128, 128 ),
      projector: new Color(128, 128, 128  )
    },
    panelTitleColor: {
      default: new Color(200, 200, 95 ),
      projector: new Color( 0, 0, 0  )
    },
    panelLabelColor: {
      default: new Color( 210, 210, 210 ),
      projector: new Color( 0, 0, 0 )
    },
    protonsLabelColor: {
      default: new Color( 185, 50, 8 ),
      projector: new Color( 185, 50, 8 )
    },
    neutronsLabelColor: {
      default: new Color( 160, 160, 160 ),
      projector: new Color( 125, 125, 125 )
    },
    atomBeamColor: {
      default: new Color( 143, 143, 143, 0.4 ),
      projector: new Color( 143, 143, 143, 0.4 )
    },
    nucleusBeamColor: {
      default: new Color( 143, 143, 143 ),
      projector: new Color( 163, 163, 163 )
    },
    nucleusColor: {
      default: new Color( 200, 200, 95 ),
      projector: new Color( 128, 128, 0 )
    },
    panelSliderLabelColor: {
      default: new Color( 180, 180, 180 ),
      projector: new Color( 0, 0, 0 )
    },
    screenIconFillColor: {
      default: new Color( 0, 0, 0 ),
      projector: new Color( 0, 0, 0 )
    },
    nucleusOutlineColor: {
      default: new Color( 255, 255, 255 ),
      projector: new Color( 0, 0, 0 )
    },
    innerGroupHighlightColor: {
      default: FocusHighlightPath.INNER_DARK_GROUP_FOCUS_COLOR,
      projector: FocusHighlightPath.INNER_LIGHT_GROUP_FOCUS_COLOR
    },
    outerGroupHighlightColor: {
      default: FocusHighlightPath.OUTER_DARK_GROUP_FOCUS_COLOR,
      projector: FocusHighlightPath.OUTER_LIGHT_GROUP_FOCUS_COLOR
    }
  } );

  rutherfordScattering.register( 'RSColorProfile', RSColorProfile );

  return RSColorProfile;
} );
