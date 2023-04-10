import mongoose from "mongoose";
const productShema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },

    img: String,

    cateId: {
      type: mongoose.Types.ObjectId,
      ref: "categorys",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Product", productShema);
