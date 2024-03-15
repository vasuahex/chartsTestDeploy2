import { configureStore } from "@reduxjs/toolkit";
import chartConfigSlice from "./slices/chartConfigSlice";
import currentSourceDataSlice from "./slices/currentSourceDataSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      chartConfig: chartConfigSlice,
      currentSource:currentSourceDataSlice
    }
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']