import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// Define a custom method to check if the user is an admin
userSchema.methods.isAdmin = function() {
  return this.role === "admin";
};

const User = mongoose.model("User", userSchema);

export default User;
