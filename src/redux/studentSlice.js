import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("students");
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Lỗi load localStorage: ", err);
    return [];
  }
};

const initialState = {
  students: loadFromLocalStorage(),
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    saveStudentInfo: (state, action) => {
      state.students.push(action.payload);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
  },
});

export const { saveStudentInfo } = studentSlice.actions;
export default studentSlice.reducer;
