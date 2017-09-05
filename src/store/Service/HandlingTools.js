// @flow

import type { HandlingTools } from '../../types/MasterEditor';
import i18n from '../../i18n';

const ultraSoundMethod = (isActive: boolean) => ({
  dictionaryKey: 'UltraSound',
  title: i18n.handlingToolMethods.ultrasound,
  value: Boolean(isActive),
}: HandlingTools);

const ultraVioletMethod = (isActive: boolean) => ({
  dictionaryKey: 'UltraViolet',
  title: i18n.handlingToolMethods.ultraviolet,
  value: Boolean(isActive),
}: HandlingTools);

const disinfectionMethod = (isActive: boolean) => ({
  dictionaryKey: 'DisinfectionWithAlcohol',
  title: i18n.handlingToolMethods.disinfectionWithAlcohol,
  value: Boolean(isActive),
}: HandlingTools);

const glasperlenovySterilizerMethod = (isActive: boolean) => ({
  dictionaryKey: 'Glasperlen',
  title: i18n.handlingToolMethods.glasperlenovySterilizer,
  value: Boolean(isActive),
}: HandlingTools);

const hotSteamMethod = (isActive: boolean) => ({
  dictionaryKey: 'HotSteam',
  title: i18n.handlingToolMethods.hotSteam,
  value: Boolean(isActive),
}: HandlingTools);

const dryHotMethod = (isActive: boolean) => ({
  dictionaryKey: 'DryHot',
  title: i18n.handlingToolMethods.dryHeatMethod,
  value: Boolean(isActive),
}: HandlingTools);

const boilingMethod = (isActive: boolean) => ({
  dictionaryKey: 'Boiling',
  title: i18n.handlingToolMethods.boiling,
  value: Boolean(isActive),
}: HandlingTools);

const sterileOtherMethod = (isActive: boolean) => ({
  dictionaryKey: 'Other',
  placeholder: i18n.handlingToolMethods.enterNameMethod,
  title: i18n.handlingToolMethods.anotherWay,
  value: Boolean(isActive),
}: HandlingTools);

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
