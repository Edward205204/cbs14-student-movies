import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const validationSchema = toFormikValidationSchema(
  z.object({
    studentId: z.string().min(1, "Vui lòng nhập mã sinh viên"),
    name: z.string().min(1, "Vui lòng nhập họ tên"),
    phoneNumber: z
      .string()
      .min(10, "Số điện thoại phải có ít nhất 10 số")
      .regex(/^[0-9]+$/, "Số điện thoại chỉ được chứa số"),
    email: z.string().email("Email không hợp lệ"),
  })
);

export const formSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên"),
  numSeats: z
    .number({ invalid_type_error: "Số lượng phải là số" })
    .int("Phải là số nguyên")
    .min(1, "Ít nhất 1 ghế"),
});
