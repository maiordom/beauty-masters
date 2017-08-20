/* @flow */

type Service = {
  id: number,
  key: string,
  title: string,
  description: string,
  categoryKey: number
}

export type ServiceDictionary = {
  [id: number]: Service
}
