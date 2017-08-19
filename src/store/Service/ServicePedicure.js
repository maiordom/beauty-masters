// @flow

import i18n from '../../i18n';
import type { ServicePedicure } from '../../types/MasterEditor';

const pedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'Pedicure',
  title: i18n.pedicure,
}: ServicePedicure);

const classicPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'ClassicPedicure',
  title: i18n.filters.classic,
}: ServicePedicure);

const hardwarePedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'HardwarePedicure',
  title: i18n.filters.hardware,
}: ServicePedicure);

const europeanPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'EuropeanPedicure',
  title: i18n.filters.european,
}: ServicePedicure);

const combinedPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'CombinedPedicure',
  title: i18n.filters.combined,
}: ServicePedicure);

const expressPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'ExpressPedicure',
  title: i18n.filters.express,
}: ServicePedicure);

const hotPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'HotPedicure',
  title: i18n.filters.hot,
}: ServicePedicure);

const spaPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'SPAPedicure',
  title: i18n.filters.spa,
}: ServicePedicure);

const applyingShellacPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureShellac',
  title: i18n.filters.applyingShellac,
}: ServicePedicure);

const applyingBioGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureBiogel',
  title: i18n.filters.applyingBioGel,
}: ServicePedicure);

const applyingNailPolishPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureNailPolish',
  title: i18n.filters.applyingNailPolish,
}: ServicePedicure);

const applyingOfAnotherNailGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureOtherGel',
  title: i18n.filters.applyingOfAnotherNailGel,
}: ServicePedicure);

const frenchPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureFrench',
  title: i18n.filters.french,
}: ServicePedicure);

const moonPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureReverseFrench',
  title: i18n.filters.moon,
}: ServicePedicure);

const reverseMoonPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureReverseMoon',
  title: i18n.filters.reverseMoon,
}: ServicePedicure);

const stencilPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureStencil',
  title: i18n.filters.stencil,
}: ServicePedicure);

const artDesignPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureArtDesign',
  title: i18n.filters.artDesign,
}: ServicePedicure);

const gradientPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureGradient',
  title: i18n.filters.gradientPedicure,
}: ServicePedicure);

const extensionPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureExtension',
  title: i18n.filters.nailExtension,
}: ServicePedicure);

const extensionTipsAcrilycPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureExtensionTipsAcrilyc',
  title: i18n.filters.extensionTipsAcrilyc,
}: ServicePedicure);

const extensionFormsAcrilycPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureExtensionFormsAcrilyc',
  title: i18n.filters.extensionFormsAcrilyc,
}: ServicePedicure);

const extensionTipsGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureExtensionTipsGel',
  title: i18n.filters.extensionTipsGel,
}: ServicePedicure);

const extensionAcrilycGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureExtensionAcrilycGel',
  title: i18n.filters.extensionAcrilycGel,
}: ServicePedicure);

const removingNailPolishPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureRemovingNailPolish',
  title: i18n.filters.removingNailPolish,
}: ServicePedicure);

const removingShellacPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureRemovingShellac',
  title: i18n.filters.removingShellac,
}: ServicePedicure);

const removingBioGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureRemovingBioGel',
  title: i18n.filters.bioGel.gen,
}: ServicePedicure);

const removingGePedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureRemovingGel',
  title: i18n.filters.removingGe,
}: ServicePedicure);

const removingNailsPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  dictionaryKey: 'PedicureRemovingNails',
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
