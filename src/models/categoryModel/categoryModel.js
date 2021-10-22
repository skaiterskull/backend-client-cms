import CategorySchema from "./categorySchema.js";

export const getCategory = () => {
  return CategorySchema.find();
};
