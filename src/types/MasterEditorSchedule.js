// @flow

export type TMasterEditorSchedule = {
  timeStartField: { value: string, modelName: string },
  timeEndField: { value: string, modelName: string },
  intervalGroup: Object,
  onIntervalChange: (value: string, id: number, modelName: string) => void,
  onTimeStartChange: (timeStart: string, modelName: string) => void,
  onTimeEndChange: (timeEnd: string, modelName: string) => void,
};
