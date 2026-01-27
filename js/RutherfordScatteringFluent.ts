// Copyright 2026, University of Colorado Boulder
// AUTOMATICALLY GENERATED – DO NOT EDIT.
// Generated from rutherford-scattering-strings_en.yaml

/* eslint-disable */
/* @formatter:off */

import FluentLibrary from '../../chipper/js/browser-and-node/FluentLibrary.js';
import FluentConstant from '../../chipper/js/browser/FluentConstant.js';
import FluentContainer from '../../chipper/js/browser/FluentContainer.js';
import type {FluentVariable} from '../../chipper/js/browser/FluentPattern.js';
import FluentPattern from '../../chipper/js/browser/FluentPattern.js';
import rutherfordScattering from './rutherfordScattering.js';
import RutherfordScatteringStrings from './RutherfordScatteringStrings.js';

// This map is used to create the fluent file and link to all StringProperties.
// Accessing StringProperties is also critical for including them in the built sim.
// However, if strings are unused in Fluent system too, they will be fully excluded from
// the build. So we need to only add actually used strings.
const fluentKeyToStringPropertyMap = new Map();

const addToMapIfDefined = ( key: string, path: string ) => {
  const sp = _.get( RutherfordScatteringStrings, path );
  if ( sp ) {
    fluentKeyToStringPropertyMap.set( key, sp );
  }
};

addToMapIfDefined( 'rutherford_scattering_title', 'rutherford-scattering.titleStringProperty' );
addToMapIfDefined( 'rutherfordAtom', 'rutherfordAtomStringProperty' );
addToMapIfDefined( 'plumPuddingAtom', 'plumPuddingAtomStringProperty' );
addToMapIfDefined( 'alphaParticleProperties', 'alphaParticlePropertiesStringProperty' );
addToMapIfDefined( 'energy', 'energyStringProperty' );
addToMapIfDefined( 'atom', 'atomStringProperty' );
addToMapIfDefined( 'numberOfProtons', 'numberOfProtonsStringProperty' );
addToMapIfDefined( 'numberOfNeutrons', 'numberOfNeutronsStringProperty' );
addToMapIfDefined( 'minEnergy', 'minEnergyStringProperty' );
addToMapIfDefined( 'maxEnergy', 'maxEnergyStringProperty' );
addToMapIfDefined( 'showTraces', 'showTracesStringProperty' );
addToMapIfDefined( 'alphaParticle', 'alphaParticleStringProperty' );
addToMapIfDefined( 'alphaParticles', 'alphaParticlesStringProperty' );
addToMapIfDefined( 'positiveCharge', 'positiveChargeStringProperty' );
addToMapIfDefined( 'proton', 'protonStringProperty' );
addToMapIfDefined( 'electron', 'electronStringProperty' );
addToMapIfDefined( 'neutron', 'neutronStringProperty' );
addToMapIfDefined( 'nucleus', 'nucleusStringProperty' );
addToMapIfDefined( 'electronEnergyLevel', 'electronEnergyLevelStringProperty' );
addToMapIfDefined( 'alphaParticleTrace', 'alphaParticleTraceStringProperty' );
addToMapIfDefined( 'legend', 'legendStringProperty' );
addToMapIfDefined( 'a11y_screenSummary', 'a11y.screenSummaryStringProperty' );
addToMapIfDefined( 'a11y_observationWindow', 'a11y.observationWindowStringProperty' );
addToMapIfDefined( 'a11y_atomSpaceDescription', 'a11y.atomSpaceDescriptionStringProperty' );
addToMapIfDefined( 'a11y_nucleusSpaceDescription', 'a11y.nucleusSpaceDescriptionStringProperty' );
addToMapIfDefined( 'a11y_toggleAlphaParticle', 'a11y.toggleAlphaParticleStringProperty' );
addToMapIfDefined( 'a11y_alphaParticlesHelpText', 'a11y.alphaParticlesHelpTextStringProperty' );
addToMapIfDefined( 'a11y_alphaParticleSettings', 'a11y.alphaParticleSettingsStringProperty' );
addToMapIfDefined( 'a11y_energySliderDescription', 'a11y.energySliderDescriptionStringProperty' );
addToMapIfDefined( 'a11y_energy', 'a11y.energyStringProperty' );
addToMapIfDefined( 'a11y_traces', 'a11y.tracesStringProperty' );
addToMapIfDefined( 'a11y_traceCheckboxDescription', 'a11y.traceCheckboxDescriptionStringProperty' );
addToMapIfDefined( 'a11y_atomSettings', 'a11y.atomSettingsStringProperty' );
addToMapIfDefined( 'a11y_protonsValuePattern', 'a11y.protonsValuePatternStringProperty' );
addToMapIfDefined( 'a11y_protonsPerAtomValuePattern', 'a11y.protonsPerAtomValuePatternStringProperty' );
addToMapIfDefined( 'a11y_protonSliderDescription', 'a11y.protonSliderDescriptionStringProperty' );
addToMapIfDefined( 'a11y_neutronsValuePattern', 'a11y.neutronsValuePatternStringProperty' );
addToMapIfDefined( 'a11y_neutronsPerAtomValuePattern', 'a11y.neutronsPerAtomValuePatternStringProperty' );
addToMapIfDefined( 'a11y_neutronSliderDescription', 'a11y.neutronSliderDescriptionStringProperty' );
addToMapIfDefined( 'a11y_atomicScaleView', 'a11y.atomicScaleViewStringProperty' );
addToMapIfDefined( 'a11y_nuclearScaleView', 'a11y.nuclearScaleViewStringProperty' );
addToMapIfDefined( 'a11y_switchScale', 'a11y.switchScaleStringProperty' );
addToMapIfDefined( 'a11y_switchScaleDescription', 'a11y.switchScaleDescriptionStringProperty' );
addToMapIfDefined( 'a11y_otherViewingStreamingOptions', 'a11y.otherViewingStreamingOptionsStringProperty' );
addToMapIfDefined( 'a11y_otherOptionsDescription', 'a11y.otherOptionsDescriptionStringProperty' );

// A function that creates contents for a new Fluent file, which will be needed if any string changes.
const createFluentFile = (): string => {
  let ftl = '';
  for (const [key, stringProperty] of fluentKeyToStringPropertyMap.entries()) {
    ftl += `${key} = ${FluentLibrary.formatMultilineForFtl( stringProperty.value )}\n`;
  }
  return ftl;
};

const fluentSupport = new FluentContainer( createFluentFile, Array.from(fluentKeyToStringPropertyMap.values()) );

const RutherfordScatteringFluent = {
  "rutherford-scattering": {
    titleStringProperty: _.get( RutherfordScatteringStrings, 'rutherford-scattering.titleStringProperty' )
  },
  rutherfordAtomStringProperty: _.get( RutherfordScatteringStrings, 'rutherfordAtomStringProperty' ),
  plumPuddingAtomStringProperty: _.get( RutherfordScatteringStrings, 'plumPuddingAtomStringProperty' ),
  alphaParticlePropertiesStringProperty: _.get( RutherfordScatteringStrings, 'alphaParticlePropertiesStringProperty' ),
  energyStringProperty: _.get( RutherfordScatteringStrings, 'energyStringProperty' ),
  atomStringProperty: _.get( RutherfordScatteringStrings, 'atomStringProperty' ),
  numberOfProtonsStringProperty: _.get( RutherfordScatteringStrings, 'numberOfProtonsStringProperty' ),
  numberOfNeutronsStringProperty: _.get( RutherfordScatteringStrings, 'numberOfNeutronsStringProperty' ),
  minEnergyStringProperty: _.get( RutherfordScatteringStrings, 'minEnergyStringProperty' ),
  maxEnergyStringProperty: _.get( RutherfordScatteringStrings, 'maxEnergyStringProperty' ),
  showTracesStringProperty: _.get( RutherfordScatteringStrings, 'showTracesStringProperty' ),
  alphaParticleStringProperty: _.get( RutherfordScatteringStrings, 'alphaParticleStringProperty' ),
  alphaParticlesStringProperty: _.get( RutherfordScatteringStrings, 'alphaParticlesStringProperty' ),
  positiveChargeStringProperty: _.get( RutherfordScatteringStrings, 'positiveChargeStringProperty' ),
  protonStringProperty: _.get( RutherfordScatteringStrings, 'protonStringProperty' ),
  electronStringProperty: _.get( RutherfordScatteringStrings, 'electronStringProperty' ),
  neutronStringProperty: _.get( RutherfordScatteringStrings, 'neutronStringProperty' ),
  nucleusStringProperty: _.get( RutherfordScatteringStrings, 'nucleusStringProperty' ),
  electronEnergyLevelStringProperty: _.get( RutherfordScatteringStrings, 'electronEnergyLevelStringProperty' ),
  alphaParticleTraceStringProperty: _.get( RutherfordScatteringStrings, 'alphaParticleTraceStringProperty' ),
  legendStringProperty: _.get( RutherfordScatteringStrings, 'legendStringProperty' ),
  pattern: {
    atomicScaleStringProperty: _.get( RutherfordScatteringStrings, 'pattern.atomicScaleStringProperty' ),
    nuclearScaleStringProperty: _.get( RutherfordScatteringStrings, 'pattern.nuclearScaleStringProperty' )
  },
  a11y: {
    screenSummaryStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_screenSummary', _.get( RutherfordScatteringStrings, 'a11y.screenSummaryStringProperty' ) ),
    observationWindowStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_observationWindow', _.get( RutherfordScatteringStrings, 'a11y.observationWindowStringProperty' ) ),
    atomSpaceDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomSpaceDescription', _.get( RutherfordScatteringStrings, 'a11y.atomSpaceDescriptionStringProperty' ) ),
    nucleusSpaceDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_nucleusSpaceDescription', _.get( RutherfordScatteringStrings, 'a11y.nucleusSpaceDescriptionStringProperty' ) ),
    toggleAlphaParticleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_toggleAlphaParticle', _.get( RutherfordScatteringStrings, 'a11y.toggleAlphaParticleStringProperty' ) ),
    alphaParticlesHelpTextStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_alphaParticlesHelpText', _.get( RutherfordScatteringStrings, 'a11y.alphaParticlesHelpTextStringProperty' ) ),
    alphaParticleSettingsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_alphaParticleSettings', _.get( RutherfordScatteringStrings, 'a11y.alphaParticleSettingsStringProperty' ) ),
    energySliderDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energySliderDescription', _.get( RutherfordScatteringStrings, 'a11y.energySliderDescriptionStringProperty' ) ),
    energyStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_energy', _.get( RutherfordScatteringStrings, 'a11y.energyStringProperty' ) ),
    tracesStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_traces', _.get( RutherfordScatteringStrings, 'a11y.tracesStringProperty' ) ),
    traceCheckboxDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_traceCheckboxDescription', _.get( RutherfordScatteringStrings, 'a11y.traceCheckboxDescriptionStringProperty' ) ),
    atomSettingsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomSettings', _.get( RutherfordScatteringStrings, 'a11y.atomSettingsStringProperty' ) ),
    protonsValuePatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_protonsValuePattern', _.get( RutherfordScatteringStrings, 'a11y.protonsValuePatternStringProperty' ) ),
    protonsPerAtomValuePattern: new FluentPattern<{ protons: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_protonsPerAtomValuePattern', _.get( RutherfordScatteringStrings, 'a11y.protonsPerAtomValuePatternStringProperty' ), [{"name":"protons"}] ),
    protonSliderDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_protonSliderDescription', _.get( RutherfordScatteringStrings, 'a11y.protonSliderDescriptionStringProperty' ) ),
    neutronsValuePatternStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_neutronsValuePattern', _.get( RutherfordScatteringStrings, 'a11y.neutronsValuePatternStringProperty' ) ),
    neutronsPerAtomValuePattern: new FluentPattern<{ neutrons: FluentVariable }>( fluentSupport.bundleProperty, 'a11y_neutronsPerAtomValuePattern', _.get( RutherfordScatteringStrings, 'a11y.neutronsPerAtomValuePatternStringProperty' ), [{"name":"neutrons"}] ),
    neutronSliderDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_neutronSliderDescription', _.get( RutherfordScatteringStrings, 'a11y.neutronSliderDescriptionStringProperty' ) ),
    atomicScaleViewStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_atomicScaleView', _.get( RutherfordScatteringStrings, 'a11y.atomicScaleViewStringProperty' ) ),
    nuclearScaleViewStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_nuclearScaleView', _.get( RutherfordScatteringStrings, 'a11y.nuclearScaleViewStringProperty' ) ),
    switchScaleStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_switchScale', _.get( RutherfordScatteringStrings, 'a11y.switchScaleStringProperty' ) ),
    switchScaleDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_switchScaleDescription', _.get( RutherfordScatteringStrings, 'a11y.switchScaleDescriptionStringProperty' ) ),
    otherViewingStreamingOptionsStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_otherViewingStreamingOptions', _.get( RutherfordScatteringStrings, 'a11y.otherViewingStreamingOptionsStringProperty' ) ),
    otherOptionsDescriptionStringProperty: new FluentConstant( fluentSupport.bundleProperty, 'a11y_otherOptionsDescription', _.get( RutherfordScatteringStrings, 'a11y.otherOptionsDescriptionStringProperty' ) )
  }
};

export default RutherfordScatteringFluent;

rutherfordScattering.register('RutherfordScatteringFluent', RutherfordScatteringFluent);
