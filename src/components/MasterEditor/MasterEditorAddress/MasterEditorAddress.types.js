// @flow

export type TMasterEditorAddress = {
  addressNumber: number,
  models: Object,
  onAddressChange: () => void,
  onCityChange: () => void,
  onSubwayStationChange: () => void,
  onChange: (value: string, modelName: string) => void,
};
