// Copyright 2016, University of Colorado Boulder

/**
 * Location for all colors, especially those that must change for projector mode.
 * There are two profiles 'default' and 'projector' which can enhance visibility when using a projector.
 *
 * @author Jesse Greenberg
 */

define( function( require ) {
  'use strict';

  // modules
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var extend = require( 'PHET_CORE/extend' );
  var Color = require( 'SCENERY/util/Color' );
  var PropertySet = require( 'AXON/PropertySet' );

  // Initial colors for each profile, by string key.  If a projector color is not defined, it will take
  // the 'default' value provided.
  // NOTE: This is NOT provided to clients directly, but is passed to the PropertySet constructor.
  var colors = {
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
    panelSilderColor: {
      default: new Color( 180, 180, 180 ),
      projector: new Color( 0, 0, 0 )
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
    particleSpecularHighlightColor: {
      default: new Color( 200, 200, 200 ),
      projector: new Color( 200, 200, 200 )
    },
    alphaNucleusTraceColor: {
      default: new Color( 128, 128, 128 ),
      projector: new Color( 128, 128, 128 )
    },
    electronColor: {
      default: new Color( 135, 135, 135 ),
      projector: new Color( 135, 135, 205 )
    },
    protonColor: {
      default: new Color( 255, 69, 0 ),
      projector: new Color( 255, 69, 0 )
    },
    neutronColor: {
      default: new Color( 192, 192, 192 ),
      projector: new Color(192, 192, 192 )
    },
    particleColor: {
      default: new Color(255, 0, 255 ),
      projector: new Color( 255, 0, 255 )
    },
    nucleusColor: {
      default: new Color( 200, 200, 95 ),
      projector: new Color( 128, 128, 0 )
    },
    energyLevelColor: {
      default: new Color( 128, 128, 128 ),
      projector: new Color(128, 128, 128 )
    },
    materialFrontColor: {
      default: new Color( 214, 203, 134 ),
      projector: new Color( 214, 203, 134 )
    },
    materialBackColor: {
      default: new Color( 140, 126, 41 ),
      projector: new Color( 140, 126, 41 )
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
    }
  };

  // initial properties object, to load into PropertySet (so reset works nicely)
  var initialProperties = {};
  for ( var key in colors ) {
    initialProperties[ key ] = colors[ key ].default;
  }

  var RSColors = extend( new PropertySet( initialProperties ), {

    /**
     * Applies all colors for the specific named color scheme, ingoring colors that aren't sepcified for it.
     *
     * @param  {string} profileName - one of 'default' or 'projector'
     */
    applyProfile: function( profileName ) {
      assert && assert( profileName === 'default' || profileName === 'projector' );

      for ( var key in colors ) {
        if ( profileName in colors[ key ] ) {
          var oldColor = this[ key ];
          var newColor = colors[ key ][ profileName ];
          if ( !newColor.equals( oldColor ) ) {
            this[ key ] = newColor;
          }
        }
      }
    }
  } );

  rutherfordScattering.register( 'RSColors', RSColors );

  return RSColors;
} );
