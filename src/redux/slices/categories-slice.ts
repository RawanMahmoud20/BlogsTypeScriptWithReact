import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Category from "../../models/Category";

let state = { data: [] as Category[] };;

let categoriesSlice = createSlice({
  name: "categories-slice",
  initialState: state,

  reducers: {
    create(state,  action: PayloadAction<Category>) {
      //  spread of existing array and adding new object
      state.data = [...state.data, action.payload];

    },
    update(state, action: PayloadAction<Category>) {
      const index = state.data.findIndex(
        category => category.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    delete(state, action: PayloadAction<number>) {
      let filteredData = state.data.filter(
        (category) => category.id !== action.payload
      );
      state.data = filteredData;
    },
    read(state, action: PayloadAction<Category[]>) {
      // action.payload صار array من objects
      if (Array.isArray(action.payload)) {
        state.data = action.payload;
      } else {
        state.data = [];
      }
    }


  },
});

export const CategoriesActions = categoriesSlice.actions;
export const CategoriesReducer = categoriesSlice.reducer;
