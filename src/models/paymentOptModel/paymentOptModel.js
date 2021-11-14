import PaymentOptionSchema from "./paymentOptSchema.js";

export const getPaymentOptions = () => {
  return PaymentOptionSchema.find();
};
