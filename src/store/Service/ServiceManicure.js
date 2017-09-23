// @flow

import i18n from '../../i18n';
import type { ServiceManicure } from '../../types/MasterEditor';

const commonCategoryKey = 'manicure';
const extensionCategoryKey = 'extension';
const removingCategoryKey = 'removing';

const manicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'Manicure',
  title: i18n.manicure,
}: ServiceManicure);

const classicManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ClassicManicure',
  title: i18n.filters.classic,
}: ServiceManicure);

const hardwareManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HardwareManicure',
  title: i18n.filters.hardware,
}: ServiceManicure);

const europeanManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'EuropeanManicure',
  title: i18n.filters.european,
}: ServiceManicure);

const combinedManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'CombinedManicure',
  title: i18n.filters.combined,
}: ServiceManicure);

const expressManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ExpressManicure',
  title: i18n.filters.express,
}: ServiceManicure);

const hotManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'HotManicure',
  title: i18n.filters.hot,
}: ServiceManicure);

const spaManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'SPAManicure',
  title: i18n.filters.spa,
}: ServiceManicure);

const applyingShellacManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureShellac',
  title: i18n.filters.applyingShellac,
}: ServiceManicure);

const applyingBioGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureBiogel',
  title: i18n.filters.applyingBioGel,
}: ServiceManicure);

const applyingNailPolishManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureNailPolish',
  title: i18n.filters.applyingNailPolish,
}: ServiceManicure);

const applyingOfAnotherNailGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureOtherGel',
  title: i18n.filters.applyingOfAnotherNailGel,
}: ServiceManicure);

const frenchManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureFrench',
  title: i18n.filters.french,
}: ServiceManicure);

const moonManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureReverseFrench',
  title: i18n.filters.moon,
}: ServiceManicure);

const reverseMoonManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureReverseMoon',
  title: i18n.filters.reverseMoon,
}: ServiceManicure);

const stencilManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureStencil',
  title: i18n.filters.stencil,
}: ServiceManicure);

const artDesignManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureArtDesign',
  title: i18n.filters.artDesign,
}: ServiceManicure);

const gradientManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: commonCategoryKey,
  dictionaryKey: 'ManicureGradient',
  title: i18n.filters.gradientManicure,
}: ServiceManicure);

const extensionManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtension',
  title: i18n.filters.nailExtension,
}: ServiceManicure);

const extensionTipsAcrilycManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionTipsAcrilyc',
  title: i18n.filters.extensionTipsAcrilyc,
}: ServiceManicure);

const extensionFormsAcrilycManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionFormsAcrilyc',
  title: i18n.filters.extensionFormsAcrilyc,
}: ServiceManicure);

const extensionTipsGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionTipsGel',
  title: i18n.filters.extensionTipsGel,
}: ServiceManicure);

const extensionAcrilycGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: extensionCategoryKey,
  dictionaryKey: 'ManicureExtensionAcrilycGel',
  title: i18n.filters.extensionAcrilycGel,
}: ServiceManicure);

const removingNailPolishManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingNailPolish',
  title: i18n.filters.removingNailPolish,
}: ServiceManicure);

const removingShellacManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingShellac',
  title: i18n.filters.removingShellac,
}: ServiceManicure);

const removingBioGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingBioGel',
  title: i18n.filters.bioGel.gen,
}: ServiceManicure);

const removingGelManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingGel',
  title: i18n.filters.removingGel,
}: ServiceManicure);

const removingNailsManicure = (isActive: boolean) => ({
  active: Boolean(isActive),
  categoryKey: removingCategoryKey,
  dictionaryKey: 'ManicureRemovingNails',
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
  removingGelManicure,
  removingNailsManicure,
};
