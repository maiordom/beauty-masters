/* @flow */

export type TMasterCard = {
    addresses: Array<any>,
    email: string,
    id: number,
    isMain: boolean,
    isSalon: boolean,
    masterPhotos: Array<any>,
    masterServices: Array<any>,
    phone: string,
    salonName: string,
    username: string,
}

export type TProfileData = {
  email: string,
  userId: number,
  masterCards: Array<TMasterCard>
}
