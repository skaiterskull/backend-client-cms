import mongoose from "mongoose";

const PinSchema = mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Reset_pin", PinSchema);
