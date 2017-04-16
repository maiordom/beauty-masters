/* @flow */

import type { HandlingTools } from '../../types';
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

const glasperlenovySterilizerMethod = (isActive: boolean) => ({
  dictionaryKey: 'Glasperlen',
  id: 68,
  parentServiceId,
  title: i18n.handlingToolMethods.glasperlenovySterilizer,
  value: Boolean(isActive),
}: HandlingTools);

const dryHotMethod = (isActive: boolean) => ({
  dictionaryKey: 'DryHot',
  id: 69,
  parentServiceId,
  title: i18n.handlingToolMethods.dryHeatMethod,
  value: Boolean(isActive),
}: HandlingTools);

const sterileOtherMethod = (isActive: boolean) => ({
  dictionaryKey: 'SterileOther',
  id: 70,
  parentServiceId,
  placeholder: i18n.handlingToolMethods.enterNameMethod,
  title: i18n.handlingToolMethods.anotherWay,
  value: Boolean(isActive),
}: HandlingTools);

export default {
  ultraSoundMethod,
  ultraVioletMethod,
  glasperlenovySterilizerMethod,
  dryHotMethod,
  sterileOtherMethod,
};
