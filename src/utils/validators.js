const validator = require("validator");

const validationSignupData = (req) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName) {
    throw new Error("Invalid firstName or lastName...");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid...");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password is not valid...., Please enter a strong password",
    );
  }
};

module.exports = { validationSignupData };
