import find from 'lodash/find';

export const isSalon = (state) => {
  const cardType = state.masterEditor.cardType;

  if (cardType === 'create') {
    return state.masterEditor.generalSection.isSalonField.value;
  } else {
    return (find(state.profile.masterCards, { isMain: true }) || {}).isSalon;
  }
};
