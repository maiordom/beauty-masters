import find from 'lodash/find';

export const isSalon = (state) => {
  const { cardType } = state.masterEditor;

  if (cardType === 'create') {
    return state.masterEditor.generalSection.isSalonField.value;
  }

  return (find(state.profile.masterCards, { isMain: true }) || {}).isSalon;
};
