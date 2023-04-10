import mongoose from "mongoose";
const sigupShema = mongoose.Schema(
  {
    username: String,
    email: {
      type: String,
      require: true,
    },
    pass: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      default: "member",
    },
  },
  { timestamps: true }
);
export default mongoose.model("users", sigupShema);
