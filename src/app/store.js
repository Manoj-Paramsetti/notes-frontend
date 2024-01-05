import { configureStore } from '@reduxjs/toolkit'
import fetchDataReducer from './slices/fetchNotesSlice'
import fetchSharedDataReducer from './slices/fetchSharedNotesSlice'
import userDataReducer from './slices/userSlice'

export default configureStore({
  reducer: {
    fetchData: fetchDataReducer,
    fetchSharedData: fetchSharedDataReducer,
    userData: userDataReducer,
  },
})