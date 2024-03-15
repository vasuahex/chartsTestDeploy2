import { createSlice } from '@reduxjs/toolkit';

interface ChartConfigState {
  fileName: string;
  data:any[],
}

const initialState: ChartConfigState = {
  fileName: "",
  data:[]
};

const currentSourceDataSlice = createSlice({
  name: 'currentSourceData',
  initialState,
  reducers: {
    setDataWithSource:(state,action)=>{
        state.fileName=action.payload.fileName,
        state.data=action.payload.data
    }
  }
});

export const currentSourceDataAction = currentSourceDataSlice.actions;
export default currentSourceDataSlice.reducer;