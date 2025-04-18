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
      let student = action.payload;
      student = { ...student, id: new Date().toISOString() };
      state.students.push(student);
      localStorage.setItem("students", JSON.stringify(state.students));
    },
    updateStudentInfo: (state, action) => {
      const updateStudent = action.payload;

      const index = state.students.findIndex((student) => {
        return updateStudent.id === student.id;
      });
      if (index !== -1) {
        state.students[index] = updateStudent;
        localStorage.setItem("students", JSON.stringify(state.students));
      }
    },

    removeStudentInfo: (state, action) => {
      const studentId = action.payload;
      state.students = state.students.filter(
        (student) => student.studentId !== studentId
      );
      localStorage.setItem("students", JSON.stringify(state.students));
    },
  },
});

export const { saveStudentInfo, removeStudentInfo, updateStudentInfo } =
  studentSlice.actions;
export default studentSlice.reducer;
