const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, emailId, age, password, photoUrl } = req.body;
  if (!firstName || firstName === "") {
    throw new Error("First name is required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error(emailId, " is not a valid email.");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Use a Strong password.");
  } else if (age < 18 || age > 100) {
    throw new Error("Age must be between 18 and 100");
  } else if (!validator.isURL(photoUrl)) {
    throw new Error("Photo url is not a valid Url.");
  }
};

const validateLogin = (req) => {
  const { emailId } = req.body;

  if (!validator.isEmail(emailId)) {
    throw new Error(emailId, " is not a valid email.");
  }
};

const validateProfileEdit = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "about",
    "gender",
    "photoUrl",
    "age",
  ];
  const isFieldValid = Object.keys(req.body).every((k) =>
    allowedFields.includes(k)
  );
  return isFieldValid;
};

const validateNewPassword = (req) => {
  if (!validator.isStrongPassword(req)) {
    throw new Error("Not a Strong Password.");
  }
};

module.exports = {
  validateSignUp,
  validateLogin,
  validateProfileEdit,
  validateNewPassword,
};
