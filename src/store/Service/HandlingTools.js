// @flow

import type { THandlingTools } from '../../types/MasterEditor';
import i18n from '../../i18n';

const ultraSoundMethod = (isActive: boolean) => ({
  dictionaryKey: 'UltraSound',
  title: i18n.handlingToolMethods.ultrasound,
  value: Boolean(isActive),
}: THandlingTools);

const ultraVioletMethod = (isActive: boolean) => ({
  dictionaryKey: 'UltraViolet',
  title: i18n.handlingToolMethods.ultraviolet,
  value: Boolean(isActive),
}: THandlingTools);

const disinfectionMethod = (isActive: boolean) => ({
  dictionaryKey: 'Disinfection',
  title: i18n.handlingToolMethods.disinfectionWithAlcohol,
  value: Boolean(isActive),
}: THandlingTools);

const glasperlenovySterilizerMethod = (isActive: boolean) => ({
  dictionaryKey: 'Glasperlen',
  title: i18n.handlingToolMethods.glasperlenovySterilizer,
  value: Boolean(isActive),
}: THandlingTools);

const hotSteamMethod = (isActive: boolean) => ({
  dictionaryKey: 'HotSteam',
  title: i18n.handlingToolMethods.hotSteam,
  value: Boolean(isActive),
}: THandlingTools);

const dryHotMethod = (isActive: boolean) => ({
  dictionaryKey: 'DryHot',
  title: i18n.handlingToolMethods.dryHeatMethod,
  value: Boolean(isActive),
}: THandlingTools);

const boilingMethod = (isActive: boolean) => ({
  dictionaryKey: 'Boiling',
  title: i18n.handlingToolMethods.boiling,
  value: Boolean(isActive),
}: THandlingTools);

const sterileOtherMethod = (isActive: boolean) => ({
  dictionaryKey: 'Other',
  placeholder: i18n.handlingToolMethods.enterNameMethod,
  title: i18n.handlingToolMethods.anotherWay,
  value: Boolean(isActive),
}: THandlingTools);

export default {
  ultraSoundMethod,
  ultraVioletMethod,
  disinfectionMethod,
  glasperlenovySterilizerMethod,
  hotSteamMethod,
  dryHotMethod,
  boilingMethod,
  sterileOtherMethod,
};
