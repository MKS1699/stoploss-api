import mongoose from "mongoose";

const postSchema: mongoose.Schema = new mongoose.Schema({
  postTitle: {
    type: String,
    required: true,
  },
  postAuthors: {
    type: [String],
    required: true,
  },
  postType: {
    type: String,
    required: true,
  },
  postCreated: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  postUpdated: {
    type: Date,
    default: Date.now(),
  },
  hasImage: {
    type: Boolean,
    required: true,
  },
  postImage: {
    links: {
      original: {
        type: String,
        required: true,
      },
      medium: {
        type: String,
      },
      thumbnail: {
        type: String,
      },
    },
    caption: {
      type: String,
      required: true,
    },
  },
  postDescription: {
    type: String,
    required: true,
  },
  postInfo: {
    upComingIPO: {
      type: Boolean,
    },
    ipoName: {
      type: String,
    },
  },
  createdBy: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  postParagraphs: [
    {
      paraHeading: {
        type: String,
      },
      paraSubHeading: {
        type: String,
      },
      paraBody: {
        type: String,
      },
      hasImages: {
        type: Boolean,
        required: true,
      },
      paraImages: [
        {
          links: {
            original: {
              type: String,
            },
            medium: {
              type: String,
            },
            thumbnail: {
              type: String,
            },
          },
          caption: {
            type: String,
          },
        },
      ],
      hasTable: {
        type: Boolean,
        required: true,
      },
      paraTable: [[String]],
    },
  ],
});

const PostModel = mongoose.models.Post || mongoose.model("Post", postSchema);

export default PostModel;
