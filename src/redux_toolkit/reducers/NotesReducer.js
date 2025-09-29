import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [
    {
      _id: "default_1",

      title: "Sample Note 1",
      description: "Sample descripttion",
      userId: "no_one",
      createdOn: "July 23 2025",
      updatedOn: new Date().toISOString(),
    },
  ],
};

const addNewNote = createAsyncThunk("create", async (newObj) => {
  try {
    const response = await fetch("", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify(newObj),
      headers: {
        "content-type": "pplication/json",
      },
    });

    const data = await response.json();
    if (data.success) {
      return {
        success: true,
        newNote: data.newNote,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
});

const updateNote = createAsyncThunk("update", async (updatedData) => {
  try {
    const response = await fetch("", {
      credentials: "include",
      body: JSON.stringify(updatedData),
      headers: {
        "content-type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        updatedNote: updateNote.data,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
});

const deleteNote = createAsyncThunk("delete", async ({ _id }) => {
  try {
    const response = await fetch("", {
      credentials: true,
    });
    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        _id,
      };
    }
  } catch (error) {
    console.log(error);
  }
});
const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewNote.fulfilled, (state, action) => {
        const { newNote, success } = action.payload;
        if (success) state.notes.push(newNote);
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const { success, updatedNote } = action.payload;
        if (success) {
          const idx = state.notes.findIndex(
            (ele) => ele._id === updatedNote._id
          );
          if (idx < 0) return;
          state.notes[idx] = updatedNote;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        if (action.payload.success) {
          const { _id } = action.payload;
          const idx = state.notes.findIndex((ele) => ele._id === _id);
          if (idx < 0) return;

          state.notes.splice(idx, 1);
        }
      });
  },
});

const notesReducer = notesSlice.reducer;

const notesActions = notesSlice.actions;

const notesSelector = (state) => state.notes;

export {
  notesActions,
  notesReducer,
  notesSelector,
  addNewNote,
  updateNote,
  deleteNote,
};
