import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  opened: false,
  question: "",
};
const askSlice = createSlice({
  name: "ask",
  initialState,
  reducers: {
    setPopup: (state, action) => {
      console.log(action);
      state.opened = true;
      state.question = action.payload;
    },
    closeAskPopup: (state) => {
      state.opened = false;
      state.question = "";
    },
  },
});

const askReducer = askSlice.reducer;
const askActions = askSlice.actions;

const askSelector = (state) => state.ask;

export { askActions, askReducer, askSelector };
