import i18n from '../../i18n';

const parentServiceId = '33';

const pedicure = isActive => ({
  active: isActive,
  dictionaryKey: 'Pedicure',
  id: '33',
  parentServiceId: '0',
  title: i18n.pedicure,
});

const classicPedicure = isActive => ({
  active: isActive,
  dictionaryKey: 'ClassicPedicure',
  id: '35',
  parentServiceId,
  title: i18n.filters.classic,
});

const hardwarePedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'HardwarePedicure',
  id: '36',
  parentServiceId,
  title: i18n.filters.hardware,
});

const europeanPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'EuropeanPedicure',
  id: '37',
  parentServiceId,
  title: i18n.filters.european,
});

const combinedPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'CombinedPedicure',
  id: '38',
  parentServiceId,
  title: i18n.filters.combined,
});

const expressPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'ExpressPedicure',
  id: '39',
  parentServiceId,
  title: i18n.filters.express,
});

const hotPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'HotPedicure',
  id: '40',
  parentServiceId,
  title: i18n.filters.hot,
});

const spaPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'SPAPedicure',
  id: '41',
  parentServiceId,
  title: i18n.filters.spa,
});

const applyingShellacPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureShellac',
  id: '44',
  parentServiceId,
  title: i18n.filters.applyingShellac,
});

const applyingBioGelPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureBiogel',
  id: '45',
  parentServiceId,
  title: i18n.filters.applyingBioGel,
});

const applyingNailPolishPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureNailPolish',
  id: '43',
  parentServiceId,
  title: i18n.filters.applyingNailPolish,
});

const applyingOfAnotherNailGelPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureOtherGel',
  id: '46',
  parentServiceId,
  title: i18n.filters.applyingOfAnotherNailGel,
});

const frenchPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureFrench',
  id: '47',
  parentServiceId,
  title: i18n.filters.french,
});

const moonPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureReverseFrench',
  id: '48',
  parentServiceId,
  title: i18n.filters.moon,
});

const reverseMoonPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureReverseMoon',
  id: '49',
  parentServiceId,
  title: i18n.filters.reverseMoon,
});

const stencilPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureStencil',
  id: '51',
  parentServiceId,
  title: i18n.filters.stencil,
});

const artDesignPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureArtDesign',
  id: '52',
  parentServiceId,
  title: i18n.filters.artDesign,
});

const gradientPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureGradient',
  id: '53',
  parentServiceId,
  title: i18n.filters.gradientPedicure,
});

const extensionPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureExtension',
  id: '54',
  parentServiceId,
  title: i18n.filters.nailExtension,
});

const extensionTipsAcrilycPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureExtensionTipsAcrilyc',
  id: '55',
  parentServiceId,
  title: i18n.filters.extensionTipsAcrilyc,
});

const extensionFormsAcrilycPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureExtensionFormsAcrilyc',
  id: '56',
  parentServiceId,
  title: i18n.filters.extensionFormsAcrilyc,
});

const extensionTipsGelPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureExtensionTipsGel',
  id: '57',
  parentServiceId,
  title: i18n.filters.extensionTipsGel,
});

const extensionAcrilycGelPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureExtensionAcrilycGel',
  id: '58',
  parentServiceId,
  title: i18n.filters.extensionAcrilycGel,
});

const removingNailPolishPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureRemovingNailPolish',
  id: '60',
  parentServiceId,
  title: i18n.filters.removingNailPolish,
});

const removingShellacPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureRemovingShellac',
  id: '61',
  parentServiceId,
  title: i18n.filters.removingShellac,
});

const removingBioGelPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureRemovingBioGel',
  id: '62',
  parentServiceId,
  title: i18n.filters.bioGel.gen,
});

const removingGePedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureRemovingGe',
  id: '63',
  parentServiceId,
  title: i18n.filters.removingGe,
});

const removingNailsPedicure = isActive => ({
  active: isActive,
  dictionatyKey: 'PedicureRemovingNails',
  id: '64',
  parentServiceId,
  title: i18n.filters.removingNails.gen,
});

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
