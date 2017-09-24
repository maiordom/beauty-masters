/* @flow */

export type TSearchQuery = {
  category_service_ids?: Array<number>,
  city?: string,
  dates?: Array<string>,
  is_salon?: number,
  lat?: number,
  lon?: number,
  radius?: number,
  service_ids?: Array<number>,
};
