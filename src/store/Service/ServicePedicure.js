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
  categoryDictionaryKey: 'PedicureTreatment',
  title: i18n.filters.classic,
}: TServicePedicure);

const hardwarePedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HardwarePedicure',
  categoryDictionaryKey: 'PedicureTreatment',
  title: i18n.filters.hardware,
}: TServicePedicure);

const europeanPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'EuropeanPedicure',
  categoryDictionaryKey: 'PedicureTreatment',
  title: i18n.filters.european,
}: TServicePedicure);

const combinedPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'CombinedPedicure',
  categoryDictionaryKey: 'PedicureTreatment',
  title: i18n.filters.combined,
}: TServicePedicure);

const expressPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ExpressPedicure',
  categoryDictionaryKey: 'PedicureTreatment',
  title: i18n.filters.express,
}: TServicePedicure);

const hotPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HotPedicure',
  categoryDictionaryKey: 'PedicureTreatment',
  title: i18n.filters.hot,
}: TServicePedicure);

const spaPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'SPAPedicure',
  categoryDictionaryKey: 'PedicureTreatment',
  title: i18n.filters.spa,
}: TServicePedicure);

const applyingShellacPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureShellac',
  categoryDictionaryKey: 'PedicureCoating',
  title: i18n.filters.applyingShellac,
}: TServicePedicure);

const applyingBioGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureBiogel',
  categoryDictionaryKey: 'PedicureCoating',
  title: i18n.filters.applyingBioGel,
}: TServicePedicure);

const applyingNailPolishPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureNailPolish',
  categoryDictionaryKey: 'PedicureCoating',
  title: i18n.filters.applyingNailPolish,
}: TServicePedicure);

const applyingOfAnotherNailGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureGelNailPolish',
  categoryDictionaryKey: 'PedicureCoating',
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
  categoryDictionaryKey: 'PedicureDesign',
  title: i18n.filters.french,
}: TServicePedicure);

const moonPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureReverseFrench',
  categoryDictionaryKey: 'PedicureDesign',
  title: i18n.filters.moon,
}: TServicePedicure);

const reverseMoonPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureReverseMoon',
  categoryDictionaryKey: 'PedicureDesign',
  title: i18n.filters.reverseMoon,
}: TServicePedicure);

const stencilPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureStencil',
  categoryDictionaryKey: 'PedicureDesign',
  title: i18n.filters.stencil,
}: TServicePedicure);

const artDesignPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureArtDesign',
  categoryDictionaryKey: 'PedicureDesign',
  title: i18n.filters.artDesign,
}: TServicePedicure);

const gradientPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureGradient',
  categoryDictionaryKey: 'PedicureDesign',
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
  categoryDictionaryKey: 'PedicureExtension',
  title: i18n.filters.extensionTipsAcrilyc,
}: TServicePedicure);

const extensionFormsAcrilycPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionFormsAcrilyc',
  categoryDictionaryKey: 'PedicureExtension',
  title: i18n.filters.extensionFormsAcrilyc,
}: TServicePedicure);

const extensionTipsGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionTipsGel',
  categoryDictionaryKey: 'PedicureExtension',
  title: i18n.filters.extensionTipsGel,
}: TServicePedicure);

const extensionAcrilycGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionAcrilycGel',
  categoryDictionaryKey: 'PedicureExtension',
  title: i18n.filters.extensionAcrilycGel,
}: TServicePedicure);

const removingNailPolishPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingNailPolish',
  categoryDictionaryKey: 'PedicureRemoving',
  title: i18n.filters.removingNailPolish,
}: TServicePedicure);

const removingShellacPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingShellac',
  categoryDictionaryKey: 'PedicureRemoving',
  title: i18n.filters.removingShellac,
}: TServicePedicure);

const removingBioGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingBioGel',
  categoryDictionaryKey: 'PedicureRemoving',
  title: i18n.filters.bioGel.gen,
}: TServicePedicure);

const removingGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingGel',
  categoryDictionaryKey: 'PedicureRemoving',
  title: i18n.filters.removingGel,
}: TServicePedicure);

const removingNailsPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingNails',
  categoryDictionaryKey: 'PedicureRemoving',
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
