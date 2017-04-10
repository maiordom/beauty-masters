/* @flow */

type GeneralFieldModel = {
  placeholder?: string,
  queryParam: string,
  title?: string,
  value: string | boolean | null,
};

import i18n from '../../i18n';

const firstNameField = (firstName: string) => ({
  placeholder: i18n.firstName,
  queryParam: 'first_name',
  value: firstName || null,
}: GeneralFieldModel);

const lastNameField = (lastName: string) => ({
  placeholder: i18n.lastName,
  queryParam: 'last_name',
  value: lastName || null,
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
  value: Boolean(salonName),
}: GeneralFieldModel);

export default {
  firstNameField,
  lastNameField,
  phoneField,
  isSalonField,
  salonNameField,
};
