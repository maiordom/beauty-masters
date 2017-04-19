// @flow

export type ServiceToggleType = (sectionName: string) => (value: boolean, modelName: string) => void;
export type MasterTypeSelectType = (value: number, id: number, modelName: string) => void;
export type SelectCalendarDateType = (selectedDate: string) => void;
