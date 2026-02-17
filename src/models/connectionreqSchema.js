const mongoose = require("mongoose");
// const { applyTimestamps } = require("./user");
const User = require("../models/user");

const connectionrequestSchema = new mongoose.Schema(
  {
    fromUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    toUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["interested", "ignored", "accepted", "rejected"],
        message: `{VALUE} IS INCORRECTED TYPE STATUS...`,
      },
    },
  },
  { timestamps: true },
);

const Connectionrequest = new mongoose.model(
  "Connectionrequest",
  connectionrequestSchema,
);

module.exports = Connectionrequest;
