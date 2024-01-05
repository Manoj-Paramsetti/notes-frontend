import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { getCookie } from '../../misc/CookieManager';

export const fetchAllSharedData = createAsyncThunk('data/fetchAllSharedData', async (page, thunkAPI) => {
  var val = thunkAPI.getState().fetchData;
  if(val.previousOffset+1==page){
    try{
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_HOST}/read/shared/page?page=${page}`,{
      headers: {
          "Authorization": `Bearer ${getCookie("sid_app")}`,
        }   
      })
      return res
    }
    catch(err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
  return thunkAPI.rejectWithValue('No user found');
});

const _initialState = {
  data: [],
  nextpage: false,
  previousOffset: 0,
  offset: 1
};

export const fetchSharedData = createSlice({
    name: 'fetchData',
    initialState: _initialState,
    reducers: {
      increment: (state)=> {
        state.offset +=1
      },
      resetHomeState: (state)=>{
        state.data = [];
        state.nextpage = false;
        state.previousOffset = 0;
        state.offset = 1;
      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAllSharedData.fulfilled, (state, action) => {
        state.data = ([...state.data, ...action.payload.data.data]);
        state.nextpage = action.payload.data.nextpage;
        state.previousOffset +=1
      });
      builder.addCase(fetchAllSharedData.rejected, () => {
        console.log("Failed");
      });;
    }
})

export const {increment, resetHomeState} = fetchSharedData.actions;
export default fetchSharedData.reducer;