import ProductSchema from "./productSchema.js";

export const getProductByFilter = (filter) => {
  return ProductSchema.find(filter);
};
