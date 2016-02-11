// Copyright 2016, University of Colorado Boulder

/**
 * Control panel for the "Ruthorford Scattering" sim.  Allows the user to adust the energy of alpha particles being simulated.
 *
 * @author Dave Schmitz (Schmitzware)

 */

define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var VBox = require( 'SCENERY/nodes/VBox' );
  var HBox = require( 'SCENERY/nodes/HBox' );
  var HStrut = require( 'SCENERY/nodes/HStrut' );
  var Text = require( 'SCENERY/nodes/Text' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var RSConstants = require( 'RUTHERFORD_SCATTERING/common/RSConstants' );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' );
  var electronString = require( 'string!RUTHERFORD_SCATTERING/electron' );
  var protonString = require( 'string!RUTHERFORD_SCATTERING/proton' );
  var neutronString = require( 'string!RUTHERFORD_SCATTERING/neutron' );
  var alphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );

  /**
   * Constructor for a Atom Properties control panel.
   *
   * @param { } options
   * @constructor
   */
  function ParticlesLegendPanel( options ) {

    options = _.extend( {
      xMargin: 15,
      yMargin: 5,
      align: 'left',
      fill: RSConstants.PANEL_COLOR,
      stroke: RSConstants.PANEL_STROKE
    }, options );

    var legendText = new Text( legendString, { font: RSConstants.PANEL_TITLE_FONT, fontWeight: 'bold', fill: RSConstants.PANEL_TITLE_COLOR } );
    var electronText = new Text( electronString, { font: RSConstants.PANEL_PROPERTY_FONT, fill: 'white' } );
    var protonText = new Text( protonString, { font: RSConstants.PANEL_PROPERTY_FONT, fill: 'white' } );
    var neutronText = new Text( neutronString, { font: RSConstants.PANEL_PROPERTY_FONT, fill: 'white' } );
    var alphaParticleText = new Text( alphaParticleString, { font: RSConstants.PANEL_PROPERTY_FONT, fill: 'white' } );

    var content = new VBox( {
      spacing: 8,
      top: 0,
      right: 0,
      align: 'left',
      children: [ legendText , electronText, protonText, neutronText, alphaParticleText ]
    } );

    Panel.call( this, content, options );
  }

  rutherfordScattering.register( 'ParticlesLegendPanel', ParticlesLegendPanel );

  return inherit( Panel, ParticlesLegendPanel );

} );
