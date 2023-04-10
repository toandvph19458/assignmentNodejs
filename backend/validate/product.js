import Joi from "joi";
const productShema = Joi.object({
  name: Joi.string().required().messages({
    "String.empty": "không được bỏ trống tên sản phẩm",
    "String.any": "Trường hợp bắt buộc",
  }),
  price: Joi.number().required().messages({
    "Number.empty": "không được bỏ trống số lượng sản phẩm",
    "String.any": "Trường hợp bắt buộc",
  }),
  cateId: Joi.required(),
  img: Joi.required(),
});
export default productShema;
