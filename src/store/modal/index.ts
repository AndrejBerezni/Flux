import { createSlice } from '@reduxjs/toolkit'

interface IModalState {
  modalType: string
  outerType: 'visible' | 'invisible' | ''
  secondaryModal: string
  error: string
}

const initialState: IModalState = {
  modalType: '',
  outerType: '',
  secondaryModal: '',
  error: '',
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
    showSecondaryModal: (state, action) => {
      state.secondaryModal = action.payload.secondaryModal
      state.outerType = action.payload.outerType
    },
    hideSecondaryModal: (state) => {
      state.secondaryModal = ''
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  showModal,
  hideModal,
  showSecondaryModal,
  hideSecondaryModal,
  setError,
} = modalSlice.actions

export default modalSlice.reducer
