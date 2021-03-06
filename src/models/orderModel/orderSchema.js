import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    userDetails: {
      _id: {
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
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          default: "",
          maxLength: 30,
        },
        title: {
          type: String,
          maxLength: 100,
          required: true,
        },
        slug: {
          type: String,
          maxLength: 120,
          default: "",
          required: true,
        },
        price: {
          type: Number,
          maxLength: 10000,
          required: true,
        },
        qty: {
          type: Number,
          max: 100,
          required: true,
        },
        images: {
          type: String,
          default: null,
        },
        category: {
          type: String,
          max: 30,
          required: true,
        },
      },
    ],
    paymentDetails: {
      method: {
        type: String,
        required: true,
        maxLength: 50,
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
