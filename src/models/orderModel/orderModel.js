import OrderSchema from "./orderSchema.js";

export const addOrder = (obj) => {
  return OrderSchema(obj).save();
};
