const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: [
        // Password must be at least 8 characters long and contain at least one number and one letter.
        function (password) {
          return (
            password.length >= 8 &&
            /[0-9]/.test(password) &&
            /[a-zA-Z]/.test(password)
          );
        },
        "Password must be at least 8 characters long and contain at least one number and one letter.",
      ],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: [
        // Email must be in the correct format.
        function (email) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        },
        "Email must be in the correct format.",
      ],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;