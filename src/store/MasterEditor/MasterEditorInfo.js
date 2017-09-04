/* @flow */

type PhotosModel = {
  items: Array<string>,
  limit: number,
  queryParam: string,
  queryType: string,
};

const photosQueue = () => ({
  items: [],
});

const workPhotos = () => ({
  items: [],
  limit: 15,
  queryParam: 'work_photos',
  queryType: 'array',
  type: 'portfolio',
}: PhotosModel);

const certificatePhotos = () => ({
  items: [],
  limit: 10,
  queryParam: 'certificates',
  queryType: 'array',
  type: 'certificate',
}: PhotosModel);

const personalPhotos = () => ({
  items: [],
  limit: 5,
  queryParam: 'master_photos',
  queryType: 'array',
  type: 'master',
}: PhotosModel);

export default {
  photosQueue,
  certificatePhotos,
  personalPhotos,
  workPhotos,
};
