// @flow

import i18n from '../../i18n';
import type { ServicePedicure } from '../../types/MasterEditor';

const commonCategoryKey = 'pedicure';
const extensionCategoryKey = 'extension';
const removingCategoryKey = 'removing';

const pedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'Pedicure',
  title: i18n.pedicure,
}: ServicePedicure);

const classicPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ClassicPedicure',
  title: i18n.filters.classic,
}: ServicePedicure);

const hardwarePedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HardwarePedicure',
  title: i18n.filters.hardware,
}: ServicePedicure);

const europeanPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'EuropeanPedicure',
  title: i18n.filters.european,
}: ServicePedicure);

const combinedPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'CombinedPedicure',
  title: i18n.filters.combined,
}: ServicePedicure);

const expressPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ExpressPedicure',
  title: i18n.filters.express,
}: ServicePedicure);

const hotPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HotPedicure',
  title: i18n.filters.hot,
}: ServicePedicure);

const spaPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'SPAPedicure',
  title: i18n.filters.spa,
}: ServicePedicure);

const applyingShellacPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureShellac',
  title: i18n.filters.applyingShellac,
}: ServicePedicure);

const applyingBioGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureBiogel',
  title: i18n.filters.applyingBioGel,
}: ServicePedicure);

const applyingNailPolishPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureNailPolish',
  title: i18n.filters.applyingNailPolish,
}: ServicePedicure);

const applyingOfAnotherNailGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureOtherGel',
  title: i18n.filters.applyingOfAnotherNailGel,
}: ServicePedicure);

const frenchPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureFrench',
  title: i18n.filters.french,
}: ServicePedicure);

const moonPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureReverseFrench',
  title: i18n.filters.moon,
}: ServicePedicure);

const reverseMoonPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureReverseMoon',
  title: i18n.filters.reverseMoon,
}: ServicePedicure);

const stencilPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureStencil',
  title: i18n.filters.stencil,
}: ServicePedicure);

const artDesignPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureArtDesign',
  title: i18n.filters.artDesign,
}: ServicePedicure);

const gradientPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'PedicureGradient',
  title: i18n.filters.gradientPedicure,
}: ServicePedicure);

const extensionPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtension',
  title: i18n.filters.nailExtension,
}: ServicePedicure);

const extensionTipsAcrilycPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionTipsAcrilyc',
  title: i18n.filters.extensionTipsAcrilyc,
}: ServicePedicure);

const extensionFormsAcrilycPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionFormsAcrilyc',
  title: i18n.filters.extensionFormsAcrilyc,
}: ServicePedicure);

const extensionTipsGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionTipsGel',
  title: i18n.filters.extensionTipsGel,
}: ServicePedicure);

const extensionAcrilycGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'PedicureExtensionAcrilycGel',
  title: i18n.filters.extensionAcrilycGel,
}: ServicePedicure);

const removingNailPolishPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingNailPolish',
  title: i18n.filters.removingNailPolish,
}: ServicePedicure);

const removingShellacPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingShellac',
  title: i18n.filters.removingShellac,
}: ServicePedicure);

const removingBioGelPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingBioGel',
  title: i18n.filters.bioGel.gen,
}: ServicePedicure);

const removingGePedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'PedicureRemovingGel',
  title: i18n.filters.removingGe,
}: ServicePedicure);

const removingNailsPedicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
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
