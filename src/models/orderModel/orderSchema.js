import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    userDetails: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: "",
        maxLength: 30,
      },
      fname: {
        type: String,
        required: true,
        default: "",
        maxLength: 30,
      },
      lname: {
        type: String,
        required: false,
        default: "",
        maxLength: 30,
      },
      email: {
        type: String,
        required: true,
        maxLength: 50,
      },
      phone: {
        type: String,
        default: "",
        maxLength: 15,
      },
    },
    cartDetails: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          default: "",
          maxLength: 30,
        },
        title: {
          type: String,
          maxLength: 100,
          require: true,
        },
        slug: {
          type: String,
          maxLength: 120,
          default: "",
          require: true,
          unique: true,
          index: 1,
        },
        price: {
          type: Number,
          maxLength: 120,
          require: true,
        },
        qty: {
          type: Number,
          max: 10000,
          require: true,
        },
        images: {
          type: String,
          default: null,
        },
      },
    ],
    paymentDetails: {
      method: {
        type: String,
        required: true,
        maxLength: 10,
      },
      transactionId: {
        type: String,
        default: "",
      },
      status: {
        type: String,
        default: "pending",
        maxLength: 10,
      },
      totalPaid: {
        type: Number,
        required: true,
        max: 10000,
      },
    },
    invoiceDetails: {
      tax: {
        type: Number,
        required: true,
        max: 1000,
      },
      total: {
        type: Number,
        required: true,
        max: 10000,
      },
      totalNet: {
        type: Number,
        required: true,
        max: 10000,
      },
    },
    shippingAddressDetails: {
      fname: {
        type: String,
        required: true,
        default: "",
        maxLength: 30,
      },
      lname: {
        type: String,
        required: false,
        default: "",
        maxLength: 30,
      },
      city: {
        type: String,
        default: "",
        maxLength: 50,
      },
      state: {
        type: String,
        default: "",
        maxLength: 20,
      },
      unit: {
        type: String,
        default: "",
        maxLength: 5,
      },
      street: {
        type: String,
        default: "",
        maxLength: 100,
      },
      postalCode: {
        type: String,
        default: "",
        maxLength: 4,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", OrderSchema);
