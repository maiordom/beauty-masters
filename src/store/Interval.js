// @flow

import i18n from '../i18n';

type TItem = {
  active?: boolean;
  id: number,
  key: string,
  label: string,
};

type TIntervalGroupModel = {
  items: Array<TItem>,
  queryParam: string,
  selected: TItem,
};

export const intervalGroup = () => ({
  items: [
    { label: i18n.schedule.wholeWeek, id: 1, key: 'wholeWeek' },
    { label: i18n.schedule.twoAfterTwo, id: 4, key: 'twoAfterTwo' },
    { label: i18n.schedule.onWeekdays, id: 2, key: 'onWeekdays', active: true },
    { label: i18n.schedule.onWeekends, id: 3, key: 'onWeekends' },
  ],
  selected: {
    active: true,
    id: 2,
    key: 'onWeekdays',
    label: i18n.schedule.onWeekdays,
  },
  queryParam: 'interval_type',
}: TIntervalGroupModel);

export default null;
