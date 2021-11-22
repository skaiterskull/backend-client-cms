import Joi from "joi";

export const orderValidation = (req, res, next) => {
  const schema = Joi.object({
    userDetails: {
      _id: Joi.string().alphanum().max(30).required(),
      fname: Joi.string().alphanum().max(30).required(),
      lname: Joi.string().alphanum().max(30).required(),
      email: Joi.string().email({ minDomainSegments: 2 }),
      phone: Joi.string().allow("").max(15),
    },
    cartDetails: Joi.array().items({
      _id: Joi.string().alphanum().max(30).required(),
      title: Joi.string().max(100).required(),
      slug: Joi.string().max(120).required(),
      price: Joi.number().max(10000).required(),
      qty: Joi.number().max(100).required(),
      images: Joi.string().max(100),
    }),
    paymentDetails: {
      method: Joi.string().max(120).required(),
      transactionId: Joi.string().max(120).allow(""),
      status: Joi.string().alphanum().max(30),
      totalPaid: Joi.number().max(10000).required(),
    },
    invoiceDetails: {
      tax: Joi.number().max(10000).required(),
      total: Joi.number().max(10000).required(),
      totalNet: Joi.number().max(10000).required(),
    },
    shippingAddressDetails: {
      fname: Joi.string().alphanum().max(30).required(),
      lname: Joi.string().alphanum().max(30).required(),
      city: Joi.string().alphanum().max(30).required(),
      state: Joi.string().alphanum().max(30).required(),
      unit: Joi.string().alphanum().max(30).allow(""),
      street: Joi.string().max(120).required(),
      postalCode: Joi.string().alphanum().max(30).allow(""),
    },
  });

  const result = schema.validate(req.body);

  if (result.error) {
    console.log(result.error.message);
    return res.status(422).json({
      status: "error",
      message: "Data is not valid",
    });
  }

  next();
};
