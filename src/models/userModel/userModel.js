import UserSchema from "./userSchema.js";

export const addUser = (obj) => {
  return UserSchema(obj).save();
};
