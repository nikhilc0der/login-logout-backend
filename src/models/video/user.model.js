import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
const salt = bcrypt.genSaltSync(10);

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    confirmPassword: {
      type: String,
      required: [false, "Please confirm your password."],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hashSync(this.password, salt);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("confirmPassword")) return next();
  this.confirmPassword = await bcrypt.hashSync(this.confirmPassword, salt);
  next();
});

userSchema.methods.generatePasswordResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  const expires = Date.now() + 3600000;
  this.passwordResetToken = token;
  this.passwordResetExpires = expires;
  return token;
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
