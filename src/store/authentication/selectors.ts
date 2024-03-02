import { get } from 'lodash'

import { RootState } from '..'

export const getAuthStatus = (store: RootState) =>
  get(store, 'authentication.isAuth', false)

export const getUserName = (store: RootState) =>
  get(store, 'authentication.user.name', '')

export const getUserId = (store: RootState) =>
  get(store, 'authentication.user.uid', '')

export const getUserEmail = (store: RootState) =>
  get(store, 'authentication.user.email', '')

export const getGlobalEmailInput = (store: RootState) =>
  get(store, 'authentication.emailInput', '')
