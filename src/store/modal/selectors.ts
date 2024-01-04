import { get } from 'lodash'

import { RootState } from '..'

export const getShowModal = (store: RootState) =>
  get(store, 'modal.showModal', false)

export const getModalType = (store: RootState) =>
  get(store, 'modal.modalType', '')
