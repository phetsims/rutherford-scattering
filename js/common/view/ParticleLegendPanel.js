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
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Vector2 = require( 'DOT/Vector2' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );

  // strings
  var legendString = require( 'string!RUTHERFORD_SCATTERING/legend' );
  var electronString = require( 'string!RUTHERFORD_SCATTERING/electron' );
  var protonString = require( 'string!RUTHERFORD_SCATTERING/proton' );
  var neutronString = require( 'string!RUTHERFORD_SCATTERING/neutron' );
  var alphaParticleString = require( 'string!RUTHERFORD_SCATTERING/alphaParticle' );

  /**
   * Constructor for a Atom Properties control panel.
   *
   * @param {Tandem} tandem
   * @param { } options
   * @constructor
   */
  function ParticlesLegendPanel(tandem, options ) {

    options = _.extend( {
      xMargin: 5,
      yMargin: 5,
      align: 'left'
    }, options );

    var font = new PhetFont( 12 );
    var legendText = new Text( legendString, { font: font, fontWeight: 'bold' } );
    var electronText = new Text( electronString, { font: font } );
    var protonText = new Text( protonString, { font: font } );
    var neutronText = new Text( neutronString, { font: font } );
    var alphaParticleText = new Text( alphaParticleString, { font: font } );

    var content = new VBox( {
      spacing: 8,
      top: 0,
      right: 0,
      align: 'left',
      children: [ legendText , electronText, protonText, neutronText, alphaParticleText ]
    } );

    Panel.call( this, content, options );
  }

  // Smitty: do I need this?
  rutherfordScattering.register( 'ParticlesLegendPanel', ParticlesLegendPanel );

  return inherit( Panel, ParticlesLegendPanel );

} );
