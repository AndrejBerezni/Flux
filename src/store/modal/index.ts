import { createSlice } from '@reduxjs/toolkit'

interface IModalState {
  showModal: boolean
  modalType: string
}

const initialState: IModalState = {
  showModal: false,
  modalType: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.showModal = true
      state.modalType = action.payload
    },
    hideModal: () => initialState,
  },
})

export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer
