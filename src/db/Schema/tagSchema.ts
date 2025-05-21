import mongoose, { Document, Model } from "mongoose";

export interface ITagDocument extends Document {
  tag: string;
  posts: string[];
}

const tagSchema: mongoose.Schema<ITagDocument> =
  new mongoose.Schema<ITagDocument>({
    tag: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: String,
        required: true,
      },
    ],
  });

const TagModel: Model<ITagDocument> =
  mongoose.models.Tag || mongoose.model<ITagDocument>("Tag", tagSchema);

export default TagModel;
