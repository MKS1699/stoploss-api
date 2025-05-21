import mongoose, { Document, Model } from "mongoose";

export interface IUserDocument extends Document {
  userName: string;
  userPassword: string;
}

const userSchema: mongoose.Schema<IUserDocument> = new mongoose.Schema({
  userPassword: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

const UserModel: Model<IUserDocument> =
  mongoose.models.User || mongoose.model<IUserDocument>("User", userSchema);

export default UserModel;
