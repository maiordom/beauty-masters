/* @flow */

import i18n from '../../i18n';

type GeneralFieldModel = {
  placeholder?: string,
  queryParam: string,
  title?: string,
  value: string | boolean | null,
};

const usernameField = (username: string) => ({
  placeholder: i18n.username,
  queryParam: 'full_name',
  value: username || null,
}: GeneralFieldModel);

const phoneField = (phone: string) => ({
  placeholder: i18n.phone,
  queryParam: 'phone',
  value: phone || null,
}: GeneralFieldModel);

const isSalonField = (isSalon: boolean) => ({
  queryParam: 'is_salon',
  title: i18n.salonMaster,
  value: isSalon || false,
}: GeneralFieldModel);

const salonNameField = (salonName: string) => ({
  placeholder: i18n.salonName,
  queryParam: 'salon_name',
  value: salonName || null,
}: GeneralFieldModel);

export default {
  usernameField,
  phoneField,
  isSalonField,
  salonNameField,
};
