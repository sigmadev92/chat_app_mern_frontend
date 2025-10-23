import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const newTheme = action.payload;
      state.theme = newTheme;
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    },
    toggleTheme: (state, action) => {
      console.log(action.payload);
      const currTheme = state.theme;
      const newTheme = currTheme === "light" ? "dark" : "light";
      state.theme = newTheme;
      localStorage.setItem("f3_theme", newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    },
  },
});

const themeReducer = themeSlice.reducer;
const themeAction = themeSlice.actions;
const themeSelector = (state) => state.theme;

export { themeAction, themeReducer, themeSelector };
