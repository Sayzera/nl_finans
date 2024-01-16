import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./main-slice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
});
