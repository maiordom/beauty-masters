import i18n from '../../i18n';

const firstNameField = firstName => ({
  queryParam: 'first_name',
  value: firstName || null,
  placeholder: i18n.firstName,
});

const lastNameField = lastName => ({
  queryParam: 'last_name',
  value: lastName || null,
  placeholder: i18n.lastName,
});

const phoneField = phone => ({
  queryParam: 'phone',
  value: phone || null,
  placeholder: i18n.phone,
});

const isSalonField = isSalon => ({
  queryParam: 'is_salon',
  value: isSalon || false,
  title: i18n.salonMaster,
});

const salonNameField = salonName => ({
  queryParam: 'salon_name',
  value: salonName || null,
  placeholder: i18n.salonName,
});

export default {
  firstNameField,
  lastNameField,
  phoneField,
  isSalonField,
  salonNameField,
};
