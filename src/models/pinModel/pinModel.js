import PinSchema from "./pinSchema.js";

export const createPin = (obj) => {
  return PinSchema(obj).save();
};

export const checkPinAndDelete = (filter) => {
  return PinSchema.findOneAndDelete(filter);
};
