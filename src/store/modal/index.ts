import { createSlice } from '@reduxjs/toolkit'

interface IModalState {
  modalType: string
}

const initialState: IModalState = {
  modalType: '',
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.modalType = action.payload
    },
    hideModal: () => initialState,
  },
})

export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer
