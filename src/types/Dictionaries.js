/* @flow */

type Service = {
  id: number,
  key: string,
  title: string,
  description: string,
  categoryId: number
}

export type ServiceDictionary = {
  [id: number]: Service
}
