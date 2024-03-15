import mongoose from "mongoose";

const userSchema: mongoose.Schema = new mongoose.Schema({
  userPassword: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
