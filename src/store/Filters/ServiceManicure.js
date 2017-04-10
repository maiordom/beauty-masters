import i18n from '../../i18n';

const parentServiceId = '1';

const manicure = isActive => ({
  active: isActive,
  dictionaryKey: 'Manicure',
  id: '1',
  parentServiceId: '0',
  title: i18n.manicure
});

const classicManicure = isActive => ({
  active: isActive,
  dictionaryKey: 'ClassicManicure',
  id: '3',
  parentServiceId,
  title: i18n.filters.classic
});

const hardwareManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'HardwareManicure',
  id: '4',
  parentServiceId,
  title: i18n.filters.hardware
});

const europeanManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'EuropeanManicure',
  id: '5',
  parentServiceId,
  title: i18n.filters.european
});

const combinedManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'CombinedManicure',
  id: '6',
  parentServiceId,
  title: i18n.filters.combined
});

const expressManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ExpressManicure',
  id: '7',
  parentServiceId,
  title: i18n.filters.express
});

const hotManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'HotManicure',
  id: '8',
  parentServiceId,
  title: i18n.filters.hot
});

const spaManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'SPAManicure',
  id: '9',
  parentServiceId,
  title: i18n.filters.spa
});

const applyingShellacManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureShellac',
  id: '12',
  parentServiceId,
  title: i18n.filters.applyingShellac
});

const applyingBioGelManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureBiogel',
  id: '13',
  parentServiceId,
  title: i18n.filters.applyingBioGel
});

const applyingNailPolishManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureNailPolish',
  id: '11',
  parentServiceId,
  title: i18n.filters.applyingNailPolish
});

const applyingOfAnotherNailGelManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureOtherGel',
  id: '14',
  parentServiceId,
  title: i18n.filters.applyingOfAnotherNailGel
});

const frenchManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureFrench',
  id: '16',
  parentServiceId,
  title: i18n.filters.french
});

const moonManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureReverseFrench',
  id: '17',
  parentServiceId,
  title: i18n.filters.moon
});

const reverseMoonManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureReverseMoon',
  id: '18',
  parentServiceId,
  title: i18n.filters.reverseMoon
});

const stencilManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureStencil',
  id: '19',
  parentServiceId,
  title: i18n.filters.stencil
});

const artDesignManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureArtDesign',
  id: '20',
  parentServiceId,
  title: i18n.filters.artDesign
});

const gradientManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureGradient',
  id: '21',
  parentServiceId,
  title: i18n.filters.gradientManicure
});

const extensionManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureExtension',
  id: '22',
  parentServiceId,
  title: i18n.filters.nailExtension
});

const extensionTipsAcrilycManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureExtensionTipsAcrilyc',
  id: '23',
  parentServiceId,
  title: i18n.filters.extensionTipsAcrilyc
});

const extensionFormsAcrilycManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureExtensionFormsAcrilyc',
  id: '24',
  parentServiceId,
  title: i18n.filters.extensionFormsAcrilyc
});

const extensionTipsGelManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureExtensionTipsGel',
  id: '25',
  parentServiceId,
  title: i18n.filters.extensionTipsGel
});

const extensionAcrilycGelManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureExtensionAcrilycGel',
  id: '26',
  parentServiceId,
  title: i18n.filters.extensionAcrilycGel
});

const removingNailPolishManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureRemovingNailPolish',
  id: '28',
  parentServiceId,
  title: i18n.filters.removingNailPolish
});

const removingShellacManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureRemovingShellac',
  id: '29',
  parentServiceId,
  title: i18n.filters.removingShellac
});

const removingBioGelManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureRemovingBioGel',
  id: '30',
  parentServiceId,
  title: i18n.filters.bioGel.gen
});

const removingGeManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureRemovingGe',
  id: '31',
  parentServiceId,
  title: i18n.filters.removingGe
});

const removingNailsManicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ManicureRemovingNails',
  id: '32',
  parentServiceId,
  title: i18n.filters.removingNails.gen
});

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
  removingNailsManicure
};
