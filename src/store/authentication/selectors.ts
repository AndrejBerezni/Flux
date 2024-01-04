import { get } from 'lodash'

import { RootState } from '..'

export const getAuthStatus = (store: RootState) =>
  get(store, 'authentication.isAuth', false)

export const getUserName = (store: RootState) =>
  get(store, 'authentication.user.name', '')

export const getUserId = (store: RootState) =>
  get(store, 'authentication.user.uid', '')
