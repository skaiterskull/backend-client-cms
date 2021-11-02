import UserSchema from "./userSchema.js";

export const addUser = (obj) => {
  return UserSchema(obj).save();
};

export const updateVerifiedUser = (email) => {
  return UserSchema.findOneAndUpdate(email, {
    $set: {
      isEmailConfirmed: true,
      status: "active",
    },
  });
};

export const updateUserByFilter = (filter, toUpdate) => {
  return UserSchema.findOneAndUpdate(filter, toUpdate);
};

export const getUser = (filter) => {
  return UserSchema.findOne(filter);
};
