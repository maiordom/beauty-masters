// @flow

import i18n from '../../i18n';
import type { TServiceManicure } from '../../types/MasterEditor';

const commonCategoryKey = 'manicure';
const extensionCategoryKey = 'extension';
const removingCategoryKey = 'removing';

const manicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'Manicure',
  isCategory: true,
  title: i18n.manicure,
}: TServiceManicure);

const classicManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ClassicManicure',
  categoryDictionaryKey: 'ManicureTreatment',
  title: i18n.filters.classic,
}: TServiceManicure);

const hardwareManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HardwareManicure',
  categoryDictionaryKey: 'ManicureTreatment',
  title: i18n.filters.hardware,
}: TServiceManicure);

const europeanManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'EuropeanManicure',
  categoryDictionaryKey: 'ManicureTreatment',
  title: i18n.filters.european,
}: TServiceManicure);

const combinedManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'CombinedManicure',
  categoryDictionaryKey: 'ManicureTreatment',
  title: i18n.filters.combined,
}: TServiceManicure);

const expressManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ExpressManicure',
  categoryDictionaryKey: 'ManicureTreatment',
  title: i18n.filters.express,
}: TServiceManicure);

const hotManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HotManicure',
  categoryDictionaryKey: 'ManicureTreatment',
  title: i18n.filters.hot,
}: TServiceManicure);

const spaManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'SPAManicure',
  categoryDictionaryKey: 'ManicureTreatment',
  title: i18n.filters.spa,
}: TServiceManicure);

const applyingShellacManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureShellac',
  categoryDictionaryKey: 'ManicureCoating',
  title: i18n.filters.applyingShellac,
}: TServiceManicure);

const applyingBioGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureBiogel',
  categoryDictionaryKey: 'ManicureCoating',
  title: i18n.filters.applyingBioGel,
}: TServiceManicure);

const applyingNailPolishManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureNailPolish',
  categoryDictionaryKey: 'ManicureCoating',
  title: i18n.filters.applyingNailPolish,
}: TServiceManicure);

const applyingOfAnotherNailGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureOtherGel',
  categoryDictionaryKey: 'ManicureCoating',
  title: i18n.filters.applyingOfAnotherNailGel,
}: TServiceManicure);

const designManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureDesign',
  isCategory: true,
  title: i18n.filters.nailDesign,
}: TServiceManicure);

const frenchManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureFrench',
  categoryDictionaryKey: 'ManicureDesign',
  title: i18n.filters.french,
}: TServiceManicure);

const moonManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureReverseFrench',
  categoryDictionaryKey: 'ManicureDesign',
  title: i18n.filters.moon,
}: TServiceManicure);

const reverseMoonManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicReverseMoon',
  categoryDictionaryKey: 'ManicureDesign',
  title: i18n.filters.reverseMoon,
}: TServiceManicure);

const stencilManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureStencil',
  categoryDictionaryKey: 'ManicureDesign',
  title: i18n.filters.stencil,
}: TServiceManicure);

const artDesignManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureArtDesign',
  categoryDictionaryKey: 'ManicureDesign',
  title: i18n.filters.artDesign,
}: TServiceManicure);

const gradientManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureGradient',
  categoryDictionaryKey: 'ManicureDesign',
  title: i18n.filters.gradientManicure,
}: TServiceManicure);

const extensionManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtension',
  isCategory: true,
  title: i18n.filters.nailExtension,
}: TServiceManicure);

const extensionTipsAcrilycManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionTipsAcrilyc',
  categoryDictionaryKey: 'ManicureExtension',
  title: i18n.filters.extensionTipsAcrilyc,
}: TServiceManicure);

const extensionFormsAcrilycManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionFormsAcrilyc',
  categoryDictionaryKey: 'ManicureExtension',
  title: i18n.filters.extensionFormsAcrilyc,
}: TServiceManicure);

const extensionTipsGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionTipsGel',
  categoryDictionaryKey: 'ManicureExtension',
  title: i18n.filters.extensionTipsGel,
}: TServiceManicure);

const extensionAcrilycGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionAcrilycGel',
  categoryDictionaryKey: 'ManicureExtension',
  title: i18n.filters.extensionAcrilycGel,
}: TServiceManicure);

const removingNailPolishManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingNailPolish',
  categoryDictionaryKey: 'ManicureRemoving',
  title: i18n.filters.removingNailPolish,
}: TServiceManicure);

const removingShellacManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingShellac',
  categoryDictionaryKey: 'ManicureRemoving',
  title: i18n.filters.removingShellac,
}: TServiceManicure);

const removingBioGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingBioGel',
  categoryDictionaryKey: 'ManicureRemoving',
  title: i18n.filters.bioGel.gen,
}: TServiceManicure);

const removingGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingGel',
  categoryDictionaryKey: 'ManicureRemoving',
  title: i18n.filters.removingGel,
}: TServiceManicure);

const removingNailsManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingNails',
  categoryDictionaryKey: 'ManicureRemoving',
  title: i18n.filters.removingNails.gen,
}: TServiceManicure);

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
  designManicure,
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
  removingGelManicure,
  removingNailsManicure,
};
