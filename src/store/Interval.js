// @flow

import i18n from '../i18n';

type TIntervalGroupModel = {
  items: Array<{
    id: number,
    key: string,
    label: string,
  }>,
  queryParam: string,
};

export const intervalGroup = () => ({
  items: [
    { label: i18n.schedule.wholeWeek, id: 1, key: 'wholeWeek' },
    { label: i18n.schedule.twoAfterTwo, id: 4, key: 'twoAfterTwo' },
    { label: i18n.schedule.onWeekdays, id: 2, key: 'onWeekdays' },
    { label: i18n.schedule.onWeekends, id: 3, key: 'onWeekends' },
  ],
  queryParam: 'interval_type',
}: TIntervalGroupModel);

export default null;
