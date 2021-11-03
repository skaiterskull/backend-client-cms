import UserSchema from "./userSchema.js";

export const addUser = (obj) => {
  return UserSchema(obj).save();
};

export const addRefreshJwt = ({ _id, refreshJWT }) => {
  return UserSchema.findByIdAndUpdate(_id, { refreshJWT });
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

export const getUserById = (_id) => {
  return UserSchema.findById(_id);
};
