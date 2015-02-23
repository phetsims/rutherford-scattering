// Copyright 2002-2015, University of Colorado Boulder

/**
 * View for the 'Atom Panel'.
 *
 * @author Jake Selig (PhET)
 */
define( function( require ) {
  'use strict';

  // modules
  var constants = require( 'RUTHERFORD_SCATTERING/common/RutherfordScatteringConstants' );
  var ControlSlider = require( 'RUTHERFORD_SCATTERING/common/view/ControlSlider' );
  var HSlider = require( 'SUN/HSlider' );
  var inherit = require( 'PHET_CORE/inherit' );
  var LayoutBox = require( 'SCENERY/nodes/LayoutBox' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Panel = require( 'SUN/Panel' );
  var Property = require( 'AXON/Property' );
  var Text = require( 'SCENERY/nodes/Text' );

  // strings
  var atomString = require( 'string!RUTHERFORD_SCATTERING/atom' );
  var neutronString = require( 'string!RUTHERFORD_SCATTERING/atom.neutrons' );
  var protonString = require( 'string!RUTHERFORD_SCATTERING/atom.protons' );

  function AtomPanel( model, options ) {

    options = _.extend( constants.PANEL_OPTIONS, options );

    var controlOptions = {};

    // TODO: take the property from the model somewhere.
    var protonProperty = new Property( 1 ); // model.numProtons
    var neutronProperty = new Property( 1 ); // model.numNeutrons

    // Text nodes
    var atomText = new Text( atomString, constants.PANEL_TITLE_TEXT_OPTIONS );

    var protonText = new Text( protonString, _.extend( {
      stroke: 'rgb(255,165,0)'
    }, constants.PANEL_ENTRY_TEXT_OPTIONS ) );

    var neutronText = new Text( neutronString, _.extend( {
      stroke: 'rgb(128,128,128)'
    }, constants.PANEL_ENTRY_TEXT_OPTIONS ) );

    var protonController = new ControlSlider( protonText, protonProperty, constants.PROTON_RANGE, 'rgb(255,165,0)', true, controlOptions );
    var neutronController = new ControlSlider( neutronText, neutronProperty, constants.NEUTRON_RANGE, 'rgb(128,128,128)', true, controlOptions );

    var content = new LayoutBox( _.extend( {
      children: [ atomText, protonController, neutronController ]
    }, options ) );

    Panel.call( this, content, options );
  }

  return inherit( Panel, AtomPanel );
} );