/* @flow */

import i18n from '../../i18n';
import type { ServiceManicure } from '../../types';

const parentServiceId = 1;
const parentServiceIdExtension = 1001;
const parentServiceIdRemoving = 1002;

const manicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'Manicure',
  id: 1,
  parentServiceId: 0,
  title: i18n.manicure,
}: ServiceManicure);

const classicManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ClassicManicure',
  id: 3,
  parentServiceId,
  title: i18n.filters.classic,
}: ServiceManicure);

const hardwareManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'HardwareManicure',
  id: 4,
  parentServiceId,
  title: i18n.filters.hardware,
}: ServiceManicure);

const europeanManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'EuropeanManicure',
  id: 5,
  parentServiceId,
  title: i18n.filters.european,
}: ServiceManicure);

const combinedManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'CombinedManicure',
  id: 6,
  parentServiceId,
  title: i18n.filters.combined,
}: ServiceManicure);

const expressManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ExpressManicure',
  id: 7,
  parentServiceId,
  title: i18n.filters.express,
}: ServiceManicure);

const hotManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'HotManicure',
  id: 8,
  parentServiceId,
  title: i18n.filters.hot,
}: ServiceManicure);

const spaManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'SPAManicure',
  id: 9,
  parentServiceId,
  title: i18n.filters.spa,
}: ServiceManicure);

const applyingShellacManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureShellac',
  id: 12,
  parentServiceId,
  title: i18n.filters.applyingShellac,
}: ServiceManicure);

const applyingBioGelManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureBiogel',
  id: 13,
  parentServiceId,
  title: i18n.filters.applyingBioGel,
}: ServiceManicure);

const applyingNailPolishManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureNailPolish',
  id: 11,
  parentServiceId,
  title: i18n.filters.applyingNailPolish,
}: ServiceManicure);

const applyingOfAnotherNailGelManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureOtherGel',
  id: 14,
  parentServiceId,
  title: i18n.filters.applyingOfAnotherNailGel,
}: ServiceManicure);

const frenchManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureFrench',
  id: 16,
  parentServiceId,
  title: i18n.filters.french,
}: ServiceManicure);

const moonManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureReverseFrench',
  id: 17,
  parentServiceId,
  title: i18n.filters.moon,
}: ServiceManicure);

const reverseMoonManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureReverseMoon',
  id: 18,
  parentServiceId,
  title: i18n.filters.reverseMoon,
}: ServiceManicure);

const stencilManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureStencil',
  id: 19,
  parentServiceId,
  title: i18n.filters.stencil,
}: ServiceManicure);

const artDesignManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureArtDesign',
  id: 20,
  parentServiceId,
  title: i18n.filters.artDesign,
}: ServiceManicure);

const gradientManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureGradient',
  id: 21,
  parentServiceId,
  title: i18n.filters.gradientManicure,
}: ServiceManicure);

const extensionManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureExtension',
  id: 22,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.nailExtension,
}: ServiceManicure);

const extensionTipsAcrilycManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureExtensionTipsAcrilyc',
  id: 23,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.extensionTipsAcrilyc,
}: ServiceManicure);

const extensionFormsAcrilycManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureExtensionFormsAcrilyc',
  id: 24,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.extensionFormsAcrilyc,
}: ServiceManicure);

const extensionTipsGelManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureExtensionTipsGel',
  id: 25,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.extensionTipsGel,
}: ServiceManicure);

const extensionAcrilycGelManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureExtensionAcrilycGel',
  id: 26,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.extensionAcrilycGel,
}: ServiceManicure);

const removingNailPolishManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureRemovingNailPolish',
  id: 28,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.removingNailPolish,
}: ServiceManicure);

const removingShellacManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureRemovingShellac',
  id: 29,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.removingShellac,
}: ServiceManicure);

const removingBioGelManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureRemovingBioGel',
  id: 30,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.bioGel.gen,
}: ServiceManicure);

const removingGeManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureRemovingGe',
  id: 31,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.removingGe,
}: ServiceManicure);

const removingNailsManicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ManicureRemovingNails',
  id: 32,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.removingNails.gen,
}: ServiceManicure);

export default {
  manicure,
  classicManicure,
  hardwareManicure,
  europeanManicure,
  combinedManicure,
  expressManicure,
  hotManicure,
  spaManicure,
  applyingShellacManicure,
  applyingBioGelManicure,
  applyingNailPolishManicure,
  applyingOfAnotherNailGelManicure,
  frenchManicure,
  moonManicure,
  reverseMoonManicure,
  stencilManicure,
  artDesignManicure,
  gradientManicure,
  extensionManicure,
  extensionTipsAcrilycManicure,
  extensionFormsAcrilycManicure,
  extensionTipsGelManicure,
  extensionAcrilycGelManicure,
  removingNailPolishManicure,
  removingShellacManicure,
  removingBioGelManicure,
  removingGeManicure,
  removingNailsManicure,
};
