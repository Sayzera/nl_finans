import { createSlice } from "@reduxjs/toolkit";

interface MainState {
  searchDate: string;
  actionName?: string;
}

const initialState: MainState = {
  searchDate: "",
  actionName: "Gelir Gider",
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setSearchDate(state, action) {
      state.searchDate = action.payload;
    },
    setActionName(state, action) {
      state.actionName = action.payload;
    },
  },
});

export const { setSearchDate, setActionName } = mainSlice.actions;
export default mainSlice.reducer;

// selectors
export const selectSearchDate = (state: { main: { searchDate: string } }) =>
  state.main.searchDate;

export const selectActionName = (state: { main: { actionName?: string } }) => {
  return state.main.actionName;
};
