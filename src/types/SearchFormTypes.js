// @flow

// $FlowFixMe
export type ServiceToggleType = (sectionName: string) => (value: boolean, modelName: string) => void;
export type MasterTypeSelectType = (value: number, id: number, modelName: string) => void;
export type SelectCalendarDateType = (selectedDate: string) => void;

export type SearchMastersParamsType = {
  type?: string,
  coordinates?: Array<number>,
  master_type?: number,
  radius?: number,
  schedule?: Array<number>,
  services?: Array<number>,
};
