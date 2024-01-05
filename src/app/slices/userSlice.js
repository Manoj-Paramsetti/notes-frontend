import { createSlice } from '@reduxjs/toolkit'

const _initialState = {
  user: {},
  email: "",
};

export const userData = createSlice({
    name: 'userData',
    initialState: _initialState,
    reducers: {
      pushData: (state, payload)=> {
        console.log(payload.payload);
        state.user = payload.payload;
        state.email = payload.payload.email; 
      },
      resetUserData: (state)=>{
        state.user = {};
      }
    }
})

export const {pushData, resetHomeState} = userData.actions;
export default userData.reducer;