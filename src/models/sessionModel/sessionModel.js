import SessionSchema from "./SessionSchema.js";

export const addAccessJwt = (obj) => {
  return SessionSchema(obj).save();
};

export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};

export const deleteSession = (jwt) => {
  return SessionSchema.findOneAndDelete({ token: jwt });
};
