import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import Input from "../components/input";
import { useDispatch, useSelector } from "react-redux";
import {
  removeStudentInfo,
  saveStudentInfo,
  updateStudentInfo,
} from "../redux/studentSlice";
import { validationSchema } from "../utils/zod.js";
import { Link } from "react-router";
import { path } from "../constants/path.js";
import Search from "../components/search.jsx";
import { toast } from "react-toastify";

export default function Form() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);
  const [searchTerm, setSearchTerm] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentStudent, setCurrentStudent] = useState({});

  const formik = useFormik({
    initialValues: {
      studentId: "",
      name: "",
      phoneNumber: "",
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(saveStudentInfo(values));
      formik.resetForm();
      toast.success("Thêm sinh viên thành công!");
    },
  });

  useEffect(() => {
    if (editMode) {
      formik.setValues(currentStudent);
    }
  }, [editMode, currentStudent]);

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (item) => {
    setSearchTerm(item);
  };

  const handleEdit = (student) => {
    setEditMode(true);
    setCurrentStudent(student);
  };

  const handleSubmitEdit = () => {
    if (editMode) {
      dispatch(updateStudentInfo(formik.values));
      setEditMode(false);
      formik.resetForm();

      setCurrentStudent({});
      toast.success("Update thành công!");
    }
  };
  const handleDelete = (student) => {
    dispatch(removeStudentInfo(student.studentId));
    toast.success("Xóa sinh viên thành công!");
  };

  return (
    <div>
      <div className="py-8 bg-[#31373d]">
        <div className="max-w-[80rem] px-4 mx-auto flex items-center justify-between">
          <div className="text-2xl text-white font-bold ">
            Thông tin sinh viên
          </div>
          <div className="flex items-center gap-4 text-white">
            <Link to={path.home} className="hover:text-red-400">
              Home
            </Link>
            <Link to={path.bookMovieTickets} className="hover:text-red-400">
              Đặt vé Phim
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-[80rem] px-4 mx-auto py-6">
        <Search onSearch={handleSearch} />
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4 text-gray-700">
            <div className="col-span-1">
              <label htmlFor="student-id">Mã SV</label>
              <Input
                id="student-id"
                name="studentId"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={"mb-4"}
                value={formik.values.studentId}
                error={formik.touched.studentId && formik.errors.studentId}
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="name">Họ tên</label>
              <Input
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={"mb-4"}
                value={formik.values.name}
                error={formik.touched.name && formik.errors.name}
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="phone-number">Số điện thoại</label>
              <Input
                id="phone-number"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={"mb-4"}
                value={formik.values.phoneNumber}
                error={formik.touched.phoneNumber && formik.errors.phoneNumber}
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={"mb-4"}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
              />
            </div>
          </div>
          {!editMode ? (
            <button
              type="submit"
              className="bg-green-400 text-white px-4 py-3 rounded-sm hover:opacity-70 min-w-1.5 hover:cursor-pointer"
            >
              Thêm sinh viên
            </button>
          ) : (
            <button
              type="submit"
              onClick={() => {
                handleSubmitEdit(formik.values);
              }}
              className="bg-blue-400 text-white min-w-1.5 hover px-4 py-3 rounded-sm hover:opacity-70 hover:cursor-pointer"
            >
              Chỉnh sửa
            </button>
          )}
        </form>

        <div className="mt-8 overflow-x-auto">
          {students.length ? (
            <table className="w-full">
              <thead className="bg-[#31373d] text-white font-bold  ">
                <tr>
                  <th className="py-8 px-4">Mã SV</th>
                  <th className="py-8 px-4 ">Họ tên</th>
                  <th className="py-8 px-4 ">Số điện thoại</th>
                  <th className="py-8 px-4">Email</th>
                  <th className="py-8 px-4">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="py-8 px-4 text-center truncate">
                      {student.studentId}
                    </td>
                    <td className="py-8 px-4 text-center truncate">
                      {student.name}
                    </td>
                    <td className="py-8 px-4 text-center truncate">
                      {student.phoneNumber}
                    </td>
                    <td className="py-8 px-4 text-center truncate">
                      {student.email}
                    </td>
                    <td className="py-12 flex  item-center justify-center gap-4">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer "
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        onClick={() => handleDelete(student)}
                        className="text-red-500 hover:text-red-700 cursor-pointer "
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-full text-center">
              <div className="text-2xl capitalize font-bold">
                ... Danh sách trống ...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
