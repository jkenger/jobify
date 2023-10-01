import mongoose from "mongoose";
import { UserRole } from "../utils/constants.js";

import bcrypt from "bcryptjs";
import { UnautheticatedError } from "../errors/customErrors.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Please provide an email"],
      maxlength: [50, "Email cannot be more than 50 characters"],
      unique: [true],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [8, "Password cannot be less than 8 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Please provide a last name"],
      maxlength: [50, "Last name cannot be more than 50 characters"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
      maxlength: [50, "Location cannot be more than 50 characters"],
    },
    role: {
      type: [
        {
          type: String,
          lowercase: true,
          enum: Object.values(UserRole),
        },
      ],
      default: [UserRole.USER],
    },
    avatar: String,
    avatarPublicId: String,
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

UserSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new UnautheticatedError("Invalid email or password");
  }
  const auth = await bcrypt.compare(password, user.password);
  return [auth, user];
};

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model("User", UserSchema);

export default User;
