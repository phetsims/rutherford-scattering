// Copyright 2016-2019, University of Colorado Boulder

/**
 * Model for the Rutherford Nucleus.  Has Protons, and neutrons which can change in number.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import Utils from '../../../../dot/js/Utils.js';
import inherit from '../../../../phet-core/js/inherit.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import rutherfordScattering from '../../rutherfordScattering.js';

/**
 * @param {Property.<number>} protonCountProperty
 * @param {Property.<number>} neutronCountProperty
 * @constructor
 */
function RutherfordNucleus( protonCountProperty, neutronCountProperty ) {

  ParticleAtom.call( this, {
    nucleonRadius: 3
  } );
  const self = this;
  let particle;

  // update number of nucleons of a particular type and move all to destination
  const configureNucleus = function( nucleonCount, particleType ) {
    const particleCount = Utils.toFixedNumber( nucleonCount, 0 );
    const nucleons = particleType === 'proton' ? self.protons : self.neutrons;
    while ( nucleons.length !== particleCount ) {
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

  const protonObserver = function( protonCount ) { configureNucleus( protonCount, 'proton' ); };
  const neutronObserver = function( neutronCount ) { configureNucleus( neutronCount, 'neutron' ); };
  protonCountProperty.link( protonObserver );
  neutronCountProperty.link( neutronObserver );

  // @private
  this.disposeRutherfordNucleus = function() {
    protonCountProperty.unlink( protonObserver );
    neutronCountProperty.unlink( neutronObserver );
  };
}

rutherfordScattering.register( 'RutherfordNucleus', RutherfordNucleus );

export default inherit( ParticleAtom, RutherfordNucleus, {

  /**
   * Make nucleus eligible for garbage collection.
   */
  dispose: function() {
    this.disposeRutherfordNucleus();
  }
} );