import { get } from 'lodash'

import { RootState } from '..'

export const getModalInfo = (store: RootState) =>
  get(store, 'modal', { modalType: '', outerType: '' })
