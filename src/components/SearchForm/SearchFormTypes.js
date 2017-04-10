// @flow
export type ServiceToggle = (sectionName: string) => (value: boolean, modelName: string) => void;
export type MasterTypeSelect = (value: number, id: number, modelName: string) => void;
