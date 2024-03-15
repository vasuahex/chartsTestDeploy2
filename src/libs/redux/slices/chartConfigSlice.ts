import { createSlice } from '@reduxjs/toolkit';

interface ChartConfigState {
  keysXArray: string[];
  keysYArray: string[];
  isDialogOpen: boolean;
}

const initialState: ChartConfigState = {
  keysXArray: [],
  keysYArray: [],
  isDialogOpen: false
};

const chartConfigSlice = createSlice({
  name: 'chartConfig',
  initialState,
  reducers: {
    setKeysXArray: (state, action) => {
      state.keysXArray = action.payload;
    },
    setKeysYArray: (state, action) => {
      state.keysYArray = action.payload;
    },
    setDialogOpen: (state, action) => {
      state.isDialogOpen = action.payload
    },
  }
});

export const chartConfigSliceActions = chartConfigSlice.actions;
export default chartConfigSlice.reducer;
