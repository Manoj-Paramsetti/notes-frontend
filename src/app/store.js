import { configureStore } from '@reduxjs/toolkit'
import fetchDataReducer from './slices/fetchNotesSlice'

export default configureStore({
  reducer: {
    fetchData: fetchDataReducer
  },
})