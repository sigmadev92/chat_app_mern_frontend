import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
});

const notesReducer = notesSlice.reducer;

const notesActions = notesSlice.actions;

const notesSelector = (state) => state.notes;

export { notesActions, notesReducer, notesSelector };
