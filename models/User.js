const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// presaving will run before it saves
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // hashing the password from bcryptjs
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// match password method
userSchema.methods.matchPasswords = async function (password) {
  // will recieve the password and compare it to database
  return await bcrypt.compare(password, this.password); // take password and compare it with this.password
};

/*
to generate randomBytes using require('crypto') run 

node && 
require('crypto').randomBytes(35).toString("hex")
*/
userSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// user model
const User = mongoose.model("User", userSchema);

// export user model
module.exports = User;



