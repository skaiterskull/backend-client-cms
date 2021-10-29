import PinSchema from "./pinSchema.js";

export const createPin = (obj) => {
  return PinSchema(obj).save();
};
