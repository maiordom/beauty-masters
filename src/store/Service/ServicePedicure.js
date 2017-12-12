// @flow

import i18n from '../../i18n';
import type { TServicePedicure } from '../../types/MasterEditor';

const commonCategoryKey = 'pedicure';
const extensionCategoryKey = 'extension';
const removingCategoryKey = 'removing';

const pedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'Pedicure',
  isCategory: true,
  title: i18n.pedicure,
}: TServicePedicure);

const classicPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ClassicPedicure',
  title: i18n.filters.classic,
}: TServicePedicure);

const hardwarePedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HardwarePedicure',
  title: i18n.filters.hardware,
}: TServicePedicure);

const europeanPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'EuropeanPedicure',
  title: i18n.filters.european,
}: TServicePedicure);

const combinedPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'CombinedPedicure',
  title: i18n.filters.combined,
}: TServicePedicure);

const expressPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ExpressPedicure',
  title: i18n.filters.express,
}: TServicePedicure);

const hotPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HotPedicure',
  title: i18n.filters.hot,
}: TServicePedicure);

const spaPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'SPAPedicure',
  title: i18n.filters.spa,
}: TServicePedicure);

const applyingShellacPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureShellac',
  title: i18n.filters.applyingShellac,
}: TServicePedicure);

const applyingBioGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureBiogel',
  title: i18n.filters.applyingBioGel,
}: TServicePedicure);

const applyingNailPolishPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureNailPolish',
  title: i18n.filters.applyingNailPolish,
}: TServicePedicure);

const applyingOfAnotherNailGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureGelNailPolish',
  title: i18n.filters.applyingOfAnotherNailGel,
}: TServicePedicure);

const designPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureDesign',
  isCategory: true,
  title: i18n.filters.nailDesign,
}: TServicePedicure);

const frenchPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureFrench',
  title: i18n.filters.french,
}: TServicePedicure);

const moonPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureReverseFrench',
  title: i18n.filters.moon,
}: TServicePedicure);

const reverseMoonPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureReverseMoon',
  title: i18n.filters.reverseMoon,
}: TServicePedicure);

const stencilPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureStencil',
  title: i18n.filters.stencil,
}: TServicePedicure);

const artDesignPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureArtDesign',
  title: i18n.filters.artDesign,
}: TServicePedicure);

const gradientPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureGradient',
  title: i18n.filters.gradientPedicure,
}: TServicePedicure);

const extensionPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtension',
  isCategory: true,
  title: i18n.filters.nailExtension,
}: TServicePedicure);

const extensionTipsAcrilycPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionTipsAcrilyc',
  title: i18n.filters.extensionTipsAcrilyc,
}: TServicePedicure);

const extensionFormsAcrilycPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionFormsAcrilyc',
  title: i18n.filters.extensionFormsAcrilyc,
}: TServicePedicure);

const extensionTipsGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionTipsGel',
  title: i18n.filters.extensionTipsGel,
}: TServicePedicure);

const extensionAcrilycGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionAcrilycGel',
  title: i18n.filters.extensionAcrilycGel,
}: TServicePedicure);

const removingNailPolishPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingNailPolish',
  title: i18n.filters.removingNailPolish,
}: TServicePedicure);

const removingShellacPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingShellac',
  title: i18n.filters.removingShellac,
}: TServicePedicure);

const removingBioGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingBioGel',
  title: i18n.filters.bioGel.gen,
}: TServicePedicure);

const removingGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingGel',
  title: i18n.filters.removingGel,
}: TServicePedicure);

const removingNailsPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingNails',
  title: i18n.filters.removingNails.gen,
}: TServicePedicure);

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
  designPedicure,
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
  removingGelPedicure,
  removingNailsPedicure,
};
