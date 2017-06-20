/* @flow */

type Service = {
  id: number,
  key: string,
  title: string,
  description: string,
  parentServiceId: number
}

export type ServiceDictionary = {
  [id: number]: Service
}
