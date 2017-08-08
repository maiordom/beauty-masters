/* @flow */

import type { HandlingTools } from '../../types/MasterEditor';
import i18n from '../../i18n';

const parentServiceId = 65;

const ultraSoundMethod = (isActive: boolean) => ({
  dictionaryKey: 'UltraSound',
  id: 66,
  parentServiceId,
  title: i18n.handlingToolMethods.ultrasound,
  value: Boolean(isActive),
}: HandlingTools);

const ultraVioletMethod = (isActive: boolean) => ({
  dictionaryKey: 'UltraViolet',
  id: 67,
  parentServiceId,
  title: i18n.handlingToolMethods.ultraviolet,
  value: Boolean(isActive),
}: HandlingTools);

const disinfectionMethod = (isActive: boolean) => ({
  dictionaryKey: 'DisinfectionWithAlcohol',
  id: 68,
  parentServiceId,
  title: i18n.handlingToolMethods.disinfectionWithAlcohol,
  value: Boolean(isActive),
}: HandlingTools);

const glasperlenovySterilizerMethod = (isActive: boolean) => ({
  dictionaryKey: 'Glasperlen',
  id: 69,
  parentServiceId,
  title: i18n.handlingToolMethods.glasperlenovySterilizer,
  value: Boolean(isActive),
}: HandlingTools);

const hotSteamMethod = (isActive: boolean) => ({
  dictionaryKey: 'HotSteam',
  id: 70,
  parentServiceId,
  title: i18n.handlingToolMethods.hotSteam,
  value: Boolean(isActive)
}: HandlingTools);

const dryHotMethod = (isActive: boolean) => ({
  dictionaryKey: 'DryHot',
  id: 71,
  parentServiceId,
  title: i18n.handlingToolMethods.dryHeatMethod,
  value: Boolean(isActive),
}: HandlingTools);

const boilingMethod = (isActive: boolean) => ({
  dictionaryKey: 'Boiling',
  id: 72,
  parentServiceId,
  title: i18n.handlingToolMethods.boiling,
  value: Boolean(isActive),
}: HandlingTools);

const sterileOtherMethod = (isActive: boolean) => ({
  dictionaryKey: 'SterileOther',
  id: 73,
  parentServiceId,
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
