import { createSlice } from '@reduxjs/toolkit'

interface IModalState {
  modalType: string
  outerType: 'visible' | 'invisible' | ''
  secondaryModal: string
  message: {
    type: 'error' | 'info' | ''
    text: string
  }
}

const initialState: IModalState = {
  modalType: '',
  outerType: '',
  secondaryModal: '',
  message: {
    type: '',
    text: '',
  },
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
    setMessage: (state, action) => {
      state.message = action.payload
    },
    removeMessage: (state) => {
      state.message = { type: '', text: '' }
    },
  },
})

export const {
  showModal,
  hideModal,
  showSecondaryModal,
  hideSecondaryModal,
  setMessage,
  removeMessage,
} = modalSlice.actions

export default modalSlice.reducer
