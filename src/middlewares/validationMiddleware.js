import Joi from "joi";

export const newUserValidation = (req, res, next) => {
  const schema = Joi.object({
    fname: Joi.string().alphanum().max(30).required(),
    lname: Joi.string().alphanum().max(30).required(),
    email: Joi.string().email({ minDomainSegments: 2 }),
    password: Joi.string().min(8).max(30).required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(422).json({
      status: "error",
      message: "Data is not valid",
    });
  }

  next();
};
