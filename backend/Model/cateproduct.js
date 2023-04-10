import mongoose from "mongoose";
const cateproductShema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: "Products" }],
  },
  { timestamps: true }
);
export default mongoose.model("categorys", cateproductShema);
