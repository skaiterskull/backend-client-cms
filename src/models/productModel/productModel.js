import ProductSchema from "./productSchema.js";

export const getCategoryByFilter = (obj) => {
  return ProductSchema.find(obj);
};
