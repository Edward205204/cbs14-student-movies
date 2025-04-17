import { useFormik } from "formik";
import React from "react";
import Input from "../components/input";
import { useDispatch, useSelector } from "react-redux";
import { saveStudentInfo } from "../redux/studentSlice";
import { validationSchema } from "../utils/zod.js";
import { Link } from "react-router";
import { path } from "../constants/path.js";

export default function Form() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.student.students);

  console.log("students", students);

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
    },
  });

  return (
    <div>
      <div className="py-8 bg-[#31373d]">
        <div className="max-w-[80rem] px-4 mx-auto flex items-center justify-between">
          <div className="text-2xl text-white font-bold ">
            Thông tin sinh viên
          </div>
          <div className="flex items-center gap-4 text-white">
            <Link to={path.home}>Home</Link>
            <Link to={path.bookMovieTickets}>Đặt vé Phim</Link>
          </div>
        </div>
      </div>
      <div className="max-w-[80rem] px-4 mx-auto py-6">
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
          <button
            type="submit"
            className="bg-green-400 text-white px-4 py-3 rounded-sm hover:opacity-70 hover:cursor-pointer"
          >
            Thêm sinh viên
          </button>
        </form>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#31373d]  text-white font-bold">
              <tr>
                <th className="py-8  px-4">Mã SV</th>
                <th className="py-8  px-4">Họ tên</th>
                <th className="py-8  px-4">Số điện thoại</th>
                <th className="py-8  px-4">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="border-b border-gray-300  ">
                  <td className="py-12 px-4 ">{student.studentId}</td>
                  <td className="py-12">{student.name}</td>
                  <td className="py-12">{student.phoneNumber}</td>
                  <td className="py-12">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
