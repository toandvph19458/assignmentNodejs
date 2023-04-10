import joi from "joi";
export const sigupShema = joi.object({
  username: joi.string().required().messages({
    "String.empty": "Tên không được bỏ trống",
    "any.required": "Trường hợp này bắt buộc",
  }),
  email: joi.string().required().email().messages({
    "String.empty": "Email không được bỏ trống",
    "any.required": "Trường hợp này bắt buộc",
    "String.email": "Email không đúng định dạng",
  }),
  pass: joi.string().required().min(3).messages({
    "String.empty": "mật khẩu không được bỏ trống",
    "any.required": "Trường hợp này bắt buộc",
    "string.min": "mật khẩu ít nhất {#limit} kí tự",
  }),
  repass: joi.string().required().valid(joi.ref("pass")).messages({
    "String.empty": "mật khẩu không được bỏ trống",
    "any.required": "Trường hợp này bắt buộc",
    "any.only": "Mật khẩu không khớp",
  }),
});

export const siginShema = joi.object({
  username: joi.string().required().messages({
    "String.empty": "username không được bỏ trống",
    "any.required": "Trường hợp này bắt buộc",
  }),
  pass: joi.string().required().messages({
    "String.empty": "mật khẩu không được bỏ trống",
    "any.required": "Trường hợp này bắt buộc",
  }),
});
