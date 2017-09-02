export const setParam = (action, state) => {
  const { sectionName, modelName, paramValue, paramName } = action;
  const section = state.masterEditor[sectionName];
  const model = section[modelName];

  model[paramName] = paramValue;

  state.masterEditor = { ...state.masterEditor };
  state.masterEditor[sectionName] = { ...section };
  state.masterEditor[sectionName][modelName] = { ...model };
};

export default null;
