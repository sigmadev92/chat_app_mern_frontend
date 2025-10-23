import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { askReducer } from "./reducers/AskReducer";
import { notesReducer } from "./reducers/NotesReducer";
import { chatReducer } from "./reducers/chatReducer";
import { themeReducer } from "./reducers/themeReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ask: askReducer,
    notes: notesReducer,
    chat: chatReducer,
    theme: themeReducer,
  },
});

export default store;
