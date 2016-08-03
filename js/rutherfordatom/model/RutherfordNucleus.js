// Copyright 2002-2016, University of Colorado Boulder

/**
 * Model for the Rutherford Nucleus.  Has Protons, and neutrons which can change in number.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var ParticleAtom = require( 'SHRED/model/ParticleAtom' );
  var Particle = require( 'SHRED/model/Particle' );
  var Util = require( 'DOT/Util' );

  /**
   * @param {Property.<number>} protonCountProperty
   * @param {Property.<number>} neutronCountProperty
   * @constructor
   */
  function RutherfordNucleus( protonCountProperty, neutronCountProperty ) {

    ParticleAtom.call( this, {
      nucleonRadius: 3
    } );
    var self = this;
    var particle;

    // update number of nucleons of a particular type and move all to destination
    var configureNucleus = function( nucleonCount, particleType ) {
      var particleCount = Util.toFixedNumber( nucleonCount, 0 );
      var nucleons = particleType === 'proton' ? self.protons : self.neutrons;
      while( nucleons.length !== particleCount ) {
        if ( particleCount - nucleons.length > 0 ) {
          particle = new Particle( particleType );
          self.addParticle( particle );
        }
        else {
          self.extractParticle( particleType );
          self.reconfigureNucleus();
        }
      }
      self.moveAllParticlesToDestination();
    };

    var protonObserver = function( protonCount ) { configureNucleus( protonCount, 'proton' ); };
    var neutronObserver = function( neutronCount ) { configureNucleus( neutronCount, 'neutron' ); };
    protonCountProperty.link( protonObserver );
    neutronCountProperty.link( neutronObserver );

    // @private
    this.disposeNucleus = function() {
      protonCountProperty.unlink( protonObserver );
      neutronCountProperty.unlink( neutronObserver );
    };
  }

  rutherfordScattering.register( 'RutherfordNucleus', RutherfordNucleus );

  return inherit( ParticleAtom, RutherfordNucleus, {

    /**
     * Make nucleus eligible for garbage collection.
     */
    dispose: function() {
      this.disposeNucleus();
    }
  } );

} ); // define
