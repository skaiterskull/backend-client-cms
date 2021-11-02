import PinSchema from "./pinSchema.js";

export const createPin = (obj) => {
  return PinSchema(obj).save();
};

export const checkPinAndDelete = (filter) => {
  return PinSchema.findOneAndDelete(filter);
};

export const checkPin = (filter) => {
  return PinSchema.findOne(filter);
};

export const deletePin = (filter) => {
  return PinSchema.deleteOne(filter);
};
