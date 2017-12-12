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
  title: i18n.filters.classic,
}: TServiceManicure);

const hardwareManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HardwareManicure',
  title: i18n.filters.hardware,
}: TServiceManicure);

const europeanManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'EuropeanManicure',
  title: i18n.filters.european,
}: TServiceManicure);

const combinedManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'CombinedManicure',
  title: i18n.filters.combined,
}: TServiceManicure);

const expressManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ExpressManicure',
  title: i18n.filters.express,
}: TServiceManicure);

const hotManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HotManicure',
  title: i18n.filters.hot,
}: TServiceManicure);

const spaManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'SPAManicure',
  title: i18n.filters.spa,
}: TServiceManicure);

const applyingShellacManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureShellac',
  title: i18n.filters.applyingShellac,
}: TServiceManicure);

const applyingBioGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureBiogel',
  title: i18n.filters.applyingBioGel,
}: TServiceManicure);

const applyingNailPolishManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureNailPolish',
  title: i18n.filters.applyingNailPolish,
}: TServiceManicure);

const applyingOfAnotherNailGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureOtherGel',
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
  title: i18n.filters.french,
}: TServiceManicure);

const moonManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureReverseFrench',
  title: i18n.filters.moon,
}: TServiceManicure);

const reverseMoonManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicReverseMoon',
  title: i18n.filters.reverseMoon,
}: TServiceManicure);

const stencilManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureStencil',
  title: i18n.filters.stencil,
}: TServiceManicure);

const artDesignManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureArtDesign',
  title: i18n.filters.artDesign,
}: TServiceManicure);

const gradientManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureGradient',
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
  title: i18n.filters.extensionTipsAcrilyc,
}: TServiceManicure);

const extensionFormsAcrilycManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionFormsAcrilyc',
  title: i18n.filters.extensionFormsAcrilyc,
}: TServiceManicure);

const extensionTipsGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionTipsGel',
  title: i18n.filters.extensionTipsGel,
}: TServiceManicure);

const extensionAcrilycGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionAcrilycGel',
  title: i18n.filters.extensionAcrilycGel,
}: TServiceManicure);

const removingNailPolishManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingNailPolish',
  title: i18n.filters.removingNailPolish,
}: TServiceManicure);

const removingShellacManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingShellac',
  title: i18n.filters.removingShellac,
}: TServiceManicure);

const removingBioGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingBioGel',
  title: i18n.filters.bioGel.gen,
}: TServiceManicure);

const removingGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingGel',
  title: i18n.filters.removingGel,
}: TServiceManicure);

const removingNailsManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingNails',
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
