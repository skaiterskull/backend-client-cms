import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      default: "inactive",
    },
    fname: {
      type: String,
      required: true,
      default: "",
      maxLength: 30,
    },
    lname: {
      type: String,
      required: false,
      default: "",
      maxLength: 30,
    },
    dob: {
      type: Date,
      default: null,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      unique: true,
      index: 1,
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEmailConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      default: "",
      minLength: 8,
    },
    phone: {
      type: String,
      default: "",
      maxLength: 15,
    },
    address: {
      type: String,
      default: "",
      maxLength: 50,
    },
    gender: {
      type: String,
      default: "",
      maxLength: 6,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    refreshJWT: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
