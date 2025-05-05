import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true, // Valid usage of trim
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true, // Valid usage of trim
      match: [/.+@.+\..+/, "Please enter a valid email address"],
      index: true,
    },
    fullname: {
      type: String,
      trim: true, // Valid usage of trim
      index: true,
    },
    avatar: {
      type: String,
      default: "https://i.imgur.com",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    refreshToken: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: "Hello, I am using this app",
      trim: true, // Valid usage of trim
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//if condition is used that the password is only encrypted when the password is updated or saved. if any other info is changed then password nend not to be encrypted again.
//next moves towards the next middleware.

//Now create a function to check if the password entered is correct is not. for that we need to create a meathod.
userSchema.methods.isPasswordCorrect = async function (password) {
  console.log(password);
  console.log(this.password);
  
  return await bcrypt.compare(password, this.password);
};

//jwt tokens
userSchema.methods.generateAccessTokens = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    console.log("Access Token:", token); // Debugging
    return token;
  } catch (error) {
    console.error("Error generating access token:", error);
    throw error;
  }
};

userSchema.methods.generateRefreshTokens = async function () {
  try {
    const token = await jwt.sign(
      { _id: this._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    console.log("Refresh Token:", token); // Debugging
    return token;
  } catch (error) {
    console.error("Error generating refresh token:", error);
    throw error;
  }
};


export const User = mongoose.model("User", userSchema);