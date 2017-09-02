// @flow

type TSchedule = {
  attributes: {
    date: string,
    time_start: string,
    time_end: string,
  },
};

export type TCreateSchedules = {
  timetable_id?: number,
  data: Array<TSchedule>,
};
