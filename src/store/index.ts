import { ratesApi } from './api/rates';
import { configureStore } from "@reduxjs/toolkit/";
import { ratesReducer } from "./reducers/ratesReducer";

export const store = configureStore({
  reducer: {
    rates: ratesReducer,
    [ratesApi.reducerPath]: ratesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ratesApi.middleware)
});