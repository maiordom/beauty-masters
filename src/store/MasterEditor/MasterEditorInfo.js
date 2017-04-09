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
}: PhotosModel);

const passportPhotos = () => ({
  items: [],
  limit: 1,
  queryParam: 'passport',
  queryType: 'string',
}: PhotosModel);

const certificatePhotos = () => ({
  items: [],
  limit: 10,
  queryParam: 'certificates',
  queryType: 'array',
}: PhotosModel);

const personalPhotos = () => ({
  items: [],
  limit: 5,
  queryParam: 'master_photos',
  queryType: 'array',
}: PhotosModel);

export default {
  photosQueue,
  certificatePhotos,
  passportPhotos,
  personalPhotos,
  workPhotos,
};
