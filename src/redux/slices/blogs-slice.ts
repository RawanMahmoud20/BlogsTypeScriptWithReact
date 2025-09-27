import { createSlice } from "@reduxjs/toolkit";
import Blog from "../../models/Blog";
//    للحالة
type BlogState = {
  data: Blog[];
  selectedBlog ?: Blog | null;
};

let state: BlogState = {
  data: JSON.parse(localStorage.getItem("blogs") || "[]"),
  selectedBlog: null,
};

let blogsSlice = createSlice({
  name: "blogs-slice",
  initialState: state,

  reducers: {
   create(state, action: { payload: Blog }) {
      state.data.push(action.payload); // إضافة بلوج جديد
        //  localStorage.setItem("blogs", JSON.stringify(state.data));

    },
   update(state, action: { payload: Blog }) {
     const index = state.data.findIndex(
      (cat: Blog) => cat.id === action.payload.id);
     if (index !== -1) {
       state.data[index] = action.payload;
     }
         localStorage.setItem("blogs", JSON.stringify(state.data));

    },
   delete(state, action: { payload: Blog  | number }) {
     let filteredData = state.data.filter(
       (element: Blog) => element.id !== action.payload
     );
     state.data = filteredData;
         localStorage.setItem("blogs", JSON.stringify(state.data));

    },
   read(state, action: { payload: Blog[] }) {
      state.data = action.payload; // لو حبيت تعمل initialize
         localStorage.setItem("blogs", JSON.stringify(state.data));

    },
  setSelectedBlog(state, action: { payload: Blog | null }) {
      state.selectedBlog = action.payload;
      localStorage.setItem("blogs", JSON.stringify(state.data));
  },
  }
}) ;

export const  blogsActions = blogsSlice.actions;
export const  blogsReducer = blogsSlice.reducer;
