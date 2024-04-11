import mongoose from "mongoose";

const upcomingIPOSchema: mongoose.Schema = new mongoose.Schema({
  ipoName: {
    type: String,
    required: true,
  },
  open: {
    type: String,
    required: true,
  },
  close: {
    type: String,
    required: true,
  },
  linkedPostsId: [{ type: String }],
});

const UpcomingIPOModel =
  mongoose.models.UpcomingIPOList ||
  mongoose.model("UpcomingIPOList", upcomingIPOSchema);

export default UpcomingIPOModel;
