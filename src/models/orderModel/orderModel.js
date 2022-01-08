import OrderSchema from "./orderSchema.js";

export const getOrderByFilter = (filter) => {
  return OrderSchema.find({ "userDetails.email": filter });
};

export const addOrder = (obj) => {
  return OrderSchema(obj).save();
};
