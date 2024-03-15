import mongoose from "mongoose";

const tagSchema: mongoose.Schema = new mongoose.Schema({
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

const TagModel = mongoose.models.Tag || mongoose.model("Tag", tagSchema);

export default TagModel;
