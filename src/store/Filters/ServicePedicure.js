/* @flow */

import i18n from '../../i18n';
import type { ServicePedicure } from '../../types/MasterEditor';

const parentServiceId = 33;
const parentServiceIdExtension = 1001;
const parentServiceIdRemoving = 1002;

const pedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'Pedicure',
  id: 33,
  parentServiceId: 0,
  title: i18n.pedicure,
}: ServicePedicure);

const classicPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ClassicPedicure',
  id: 35,
  parentServiceId,
  title: i18n.filters.classic,
}: ServicePedicure);

const hardwarePedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'HardwarePedicure',
  id: 36,
  parentServiceId,
  title: i18n.filters.hardware,
}: ServicePedicure);

const europeanPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'EuropeanPedicure',
  id: 37,
  parentServiceId,
  title: i18n.filters.european,
}: ServicePedicure);

const combinedPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'CombinedPedicure',
  id: 38,
  parentServiceId,
  title: i18n.filters.combined,
}: ServicePedicure);

const expressPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'ExpressPedicure',
  id: 39,
  parentServiceId,
  title: i18n.filters.express,
}: ServicePedicure);

const hotPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'HotPedicure',
  id: 40,
  parentServiceId,
  title: i18n.filters.hot,
}: ServicePedicure);

const spaPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'SPAPedicure',
  id: 41,
  parentServiceId,
  title: i18n.filters.spa,
}: ServicePedicure);

const applyingShellacPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureShellac',
  id: 44,
  parentServiceId,
  title: i18n.filters.applyingShellac,
}: ServicePedicure);

const applyingBioGelPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureBiogel',
  id: 45,
  parentServiceId,
  title: i18n.filters.applyingBioGel,
}: ServicePedicure);

const applyingNailPolishPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureNailPolish',
  id: 43,
  parentServiceId,
  title: i18n.filters.applyingNailPolish,
}: ServicePedicure);

const applyingOfAnotherNailGelPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureOtherGel',
  id: 46,
  parentServiceId,
  title: i18n.filters.applyingOfAnotherNailGel,
}: ServicePedicure);

const frenchPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureFrench',
  id: 47,
  parentServiceId,
  title: i18n.filters.french,
}: ServicePedicure);

const moonPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureReverseFrench',
  id: 48,
  parentServiceId,
  title: i18n.filters.moon,
}: ServicePedicure);

const reverseMoonPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureReverseMoon',
  id: 49,
  parentServiceId,
  title: i18n.filters.reverseMoon,
}: ServicePedicure);

const stencilPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureStencil',
  id: 51,
  parentServiceId,
  title: i18n.filters.stencil,
}: ServicePedicure);

const artDesignPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureArtDesign',
  id: 52,
  parentServiceId,
  title: i18n.filters.artDesign,
}: ServicePedicure);

const gradientPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureGradient',
  id: 53,
  parentServiceId,
  title: i18n.filters.gradientPedicure,
}: ServicePedicure);

const extensionPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureExtension',
  id: 54,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.nailExtension,
}: ServicePedicure);

const extensionTipsAcrilycPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureExtensionTipsAcrilyc',
  id: 55,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.extensionTipsAcrilyc,
}: ServicePedicure);

const extensionFormsAcrilycPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureExtensionFormsAcrilyc',
  id: 56,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.extensionFormsAcrilyc,
}: ServicePedicure);

const extensionTipsGelPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureExtensionTipsGel',
  id: 57,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.extensionTipsGel,
}: ServicePedicure);

const extensionAcrilycGelPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureExtensionAcrilycGel',
  id: 58,
  parentServiceId: parentServiceIdExtension,
  title: i18n.filters.extensionAcrilycGel,
}: ServicePedicure);

const removingNailPolishPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureRemovingNailPolish',
  id: 60,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.removingNailPolish,
}: ServicePedicure);

const removingShellacPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureRemovingShellac',
  id: 61,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.removingShellac,
}: ServicePedicure);

const removingBioGelPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureRemovingBioGel',
  id: 62,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.bioGel.gen,
}: ServicePedicure);

const removingGePedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureRemovingGe',
  id: 63,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.removingGe,
}: ServicePedicure);

const removingNailsPedicure = (isActive: boolean) => ({
  active: isActive,
  dictionaryKey: 'PedicureRemovingNails',
  id: 64,
  parentServiceId: parentServiceIdRemoving,
  title: i18n.filters.removingNails.gen,
}: ServicePedicure);

export default {
  pedicure,
  classicPedicure,
  hardwarePedicure,
  europeanPedicure,
  combinedPedicure,
  expressPedicure,
  hotPedicure,
  spaPedicure,
  applyingShellacPedicure,
  applyingBioGelPedicure,
  applyingNailPolishPedicure,
  applyingOfAnotherNailGelPedicure,
  frenchPedicure,
  moonPedicure,
  reverseMoonPedicure,
  stencilPedicure,
  artDesignPedicure,
  gradientPedicure,
  extensionPedicure,
  extensionTipsAcrilycPedicure,
  extensionFormsAcrilycPedicure,
  extensionTipsGelPedicure,
  extensionAcrilycGelPedicure,
  removingNailPolishPedicure,
  removingShellacPedicure,
  removingBioGelPedicure,
  removingGePedicure,
  removingNailsPedicure,
};
