// Copyright 2002-2016, University of Colorado Boulder

/**
 * Base object for atoms. Keeps track of active particles within its bounds.
 *
 * @author Dave Schmitz (Schmitzware)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var rutherfordScattering = require( 'RUTHERFORD_SCATTERING/rutherfordScattering' );
  var Bounds2 = require( 'DOT/Bounds2' );

  /**
   * @constructor
   */
  function Atom( position, boundingWidth, options ) {

    // @public (read-only)
    this.position = position;

    // bounds must always be square
    var halfWidth = boundingWidth / 2;
    this.bounds = new Bounds2( position.x - halfWidth, position.y - halfWidth, position.x + halfWidth, position.y + halfWidth );

    // @private - array of particles that are currently in the bounding box of this atom
    this.particles = [];

  }

  rutherfordScattering.register( 'Atom', Atom );

  return inherit( Object, Atom, {

    /**
     * @param {AlphaParticle} alphaParticle
     * @public
     */
    addParticle: function( alphaParticle ) {
      this.particles.push( alphaParticle );
    },

    /**
     * @param {AlphaParticle} alphaParticle
     * @public
     */
    removeParticle: function( alphaParticle ) {
      var index = this.particles.indexOf( alphaParticle );
      if ( index > -1 ) {
        this.particles.splice( index, 1 );
      }
    },

    /**
     * @public
     */
    removeAllParticles: function() {
      this.particles.length = 0;
      this.stepEmitter.emit();
    },

    /**
     * A stub function to be implemented by derived objects. This just makes certain one is implemented.
     * @param {AlphaParticle} alphaParticle
     * @param {number} dt
     * @protected
     */
    moveParticle: function( alphaParticle, dt ) {
      assert && assert( false, 'No moveParticle model function implemented.' );
    },

    /**
     * @param {number} dt
     * @private
     */
    moveParticles: function( dt ) {
      var self = this;
      this.particles.forEach( function( particle ) {
        self.moveParticle( particle, dt );
      } );
    },

    /**
     * Culls alpha particles that have left the bounds of space.
     * @protected
     */
    cullParticles: function() {
      var self = this;
      this.particles.forEach( function( particle ) {
        if ( !self.bounds.containsPoint( particle.position ) ) {
          self.removeParticle( particle );
        }
      } );
    },

    /**
     * {number} dt - time step
     * @public
     */
    step: function( dt ) {
      if ( this.running && !this.userInteraction && dt < 1 ) {
        this.gun.step( dt );
        this.moveParticles( dt );
        this.cullParticles();
      }

      this.stepEmitter.emit();
    },

    /**
     * Step one frame manually.  Assuming 60 frames per second.
     * @public
     */
    manualStep: function() {
      if ( !this.userInteraction ) {
        this.gun.step( this.maunalStepDt );
        this.moveParticles( this.maunalStepDt );
        this.cullParticles();
      }

      this.stepEmitter.emit();
    },

    /**
     * @public
     */
    reset: function() {
      this.gun.onProperty.reset();
      this.removeAllParticles();
      PropertySet.prototype.reset.call( this );
    }

  } ); // inherit

} ); // define