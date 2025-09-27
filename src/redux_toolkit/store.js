import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { askReducer } from "./reducers/AskReducer";
import { notesReducer } from "./reducers/NotesReducer";
import { chatReducer } from "./reducers/chatReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ask: askReducer,
    notes: notesReducer,
    chat: chatReducer,
  },
});

export default store;
