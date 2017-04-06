import i18n from '../../i18n';

const parentServiceId = 65;

const ultraSoundMethod = isActive => ({
  value: Boolean(isActive),
  dictionaryKey: 'UltraSound',
  id: '66',
  parentServiceId,
  title: i18n.handlingToolMethods.ultrasound,
});

const ultraVioletMethod = isActive => ({
  value: Boolean(isActive),
  dictionaryKey: 'UltraViolet',
  id: '67',
  parentServiceId,
  title: i18n.handlingToolMethods.ultraviolet,
});

const glasperlenovySterilizerMethod = isActive => ({
  value: Boolean(isActive),
  dictionaryKey: 'Glasperlen',
  id: '68',
  parentServiceId,
  title: i18n.handlingToolMethods.glasperlenovySterilizer,
});

const dryHotMethod = isActive => ({
  value: Boolean(isActive),
  dictionaryKey: 'DryHot',
  id: '69',
  parentServiceId,
  title: i18n.handlingToolMethods.dryHeatMethod,
});

const sterileOtherMethod = isActive => ({
  value: Boolean(isActive),
  dictionaryKey: 'SterileOther',
  id: '70',
  parentServiceId,
  title: i18n.handlingToolMethods.anotherWay,
  placeholder: i18n.handlingToolMethods.enterNameMethod,
});

export default {
  ultraSoundMethod,
  ultraVioletMethod,
  glasperlenovySterilizerMethod,
  dryHotMethod,
  sterileOtherMethod,
};
