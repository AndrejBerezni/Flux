import { createSlice } from '@reduxjs/toolkit'

interface IModalState {
  modalType: string
  outerType: string
}

const initialState: IModalState = {
  modalType: '',
  outerType: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modalType = action.payload.modalType
      state.outerType = action.payload.outerType
    },
    hideModal: () => initialState,
  },
})

export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer
