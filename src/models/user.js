const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return validator.isEmail(value) && value.endsWith("@gmail.com");
      },
      message: "Invalid email format ❌",
    },
  },
  password: {
    type: String,
    required: true,
    validate:{
      validator: function (value) {
        return validator.isStrongPassword(value);
      },
      message:"Invalid password..."
    }
  },
  age: {
    type: Number,
    min: 18,
  },
  gendre: {
    type: String,
  },
});

userSchema.methods.getjwt = async function () {
  const user = this;
  const token = jwt.sign({_id:user._id}, "Manas@123");
  return token;
}

module.exports = mongoose.model("User", userSchema);
