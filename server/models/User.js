import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      required: true,
      unique: true,
      type: String,
    },
    profilePicture: {
      type: String, 
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
    cart: [{
      product: { type: Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 }
    }],
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
