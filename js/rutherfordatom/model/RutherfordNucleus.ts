// Copyright 2016-2025, University of Colorado Boulder

/* eslint-disable */
// @ts-nocheck

/**
 * Model for the Rutherford Nucleus.  Has Protons, and neutrons which can change in number.
 *
 * @author Dave Schmitz (Schmitzware)
 * @author Jesse Greenberg
 */

import Property from '../../../../axon/js/Property.js';
import Utils from '../../../../dot/js/Utils.js';
import Particle from '../../../../shred/js/model/Particle.js';
import ParticleAtom from '../../../../shred/js/model/ParticleAtom.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import rutherfordScattering from '../../rutherfordScattering.js';

class RutherfordNucleus extends ParticleAtom {

  public constructor( protonCountProperty: Property<number>, neutronCountProperty: Property<number> ) {

    super( {
      nucleonRadius: 3,
      tandem: Tandem.OPT_OUT // opt out until this sim is set up for phet-io
    } );

    let particle;

    // update number of nucleons of a particular type and move all to destination
    const configureNucleus = ( nucleonCount, particleType ) => {
      const particleCount = Utils.toFixedNumber( nucleonCount, 0 );
      const nucleons = particleType === 'proton' ? this.protons : this.neutrons;
      while ( nucleons.length !== particleCount ) {
        if ( particleCount - nucleons.length > 0 ) {
          particle = new Particle( particleType );
          this.addParticle( particle );
        }
        else {
          this.extractParticle( particleType );
          this.reconfigureNucleus();
        }
      }
      this.moveAllParticlesToDestination();
    };

    const protonObserver = protonCount => { configureNucleus( protonCount, 'proton' ); };
    const neutronObserver = neutronCount => { configureNucleus( neutronCount, 'neutron' ); };
    protonCountProperty.link( protonObserver );
    neutronCountProperty.link( neutronObserver );

    // @private
    this.disposeRutherfordNucleus = () => {
      protonCountProperty.unlink( protonObserver );
      neutronCountProperty.unlink( neutronObserver );
    };
  }

  public override dispose(): void {
    this.disposeRutherfordNucleus();
    super.dispose();
  }
}

rutherfordScattering.register( 'RutherfordNucleus', RutherfordNucleus );
export default RutherfordNucleus;