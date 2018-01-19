/* @flow */

export type TMasterCard = {
    about: string,
    addresses: Array<TMasterAddress>,
    avatar: string,
    email: string,
    id: number,
    isMain: boolean,
    isSalon: boolean,
    masterPhotos: Array<TPhoto>,
    masterServices: Array<TMasterService>,
    phone: string,
    salonName: string,
    status: {
      masterServicesUploaded: boolean,
      addressesUploaded: boolean,
    },
    username: string,
}

export type TPhoto = {
  sizes: {
    l: string,
    m: string,
    s: string,
  },
};

export type TMasterAddress = {
  address: string,
  id: number,
  location: {
    lat: number,
    lng: number,
  },
  name: string,
  schedules: Array<TMasterSchedule>,
  subwayStation: string,
  timeTable: {
    dateStart: string,
    id: number,
    intervalType: number,
    timeEnd: string,
    timeStart: string,
  },
}

export type TMasterSchedule = {
  date: string,
  timeStart: string,
  timeEnd: string,
  isNotWork: number,
}

export type TMasterService = {
  categoryId: number,
  duration: number,
  price: string,
  serviceId: number,
  title: string,
}

export type TProfileData = {
  email: string,
  userId: number,
  masterCards: Array<TMasterCard>
}
