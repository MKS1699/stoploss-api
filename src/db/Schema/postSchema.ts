import mongoose, { Document, Model } from "mongoose";

export interface IPostDocument extends Document {
  postTitle: string;
  postAuthors: string[];
  postType: string;
  postCreated?: Date;
  postUpdated?: Date;
  hasImage: boolean;
  postImage: {
    links: {
      original: string;
      medium?: string;
      thumbnail?: string;
    };
    caption: string;
  };
  postDescription: string;
  postInfo?: {
    upComingIPO?: boolean;
  };
  createdBy: {
    id: string;
    name: string;
  };
  postParagraphs: {
    paraHeading?: string;
    paraSubHeading?: string;
    paraBody?: string;
    hasImages: boolean;
    paraImages: {
      links: {
        original?: string;
        medium?: string;
        thumbnail?: string;
      };
      caption?: string;
    }[];
    hasTable: boolean;
    paraTable?: string[][];
  }[];
  postExternalLinks: string[];
}

const postSchema: mongoose.Schema<IPostDocument> =
  new mongoose.Schema<IPostDocument>({
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
      // default: Date.now(),
    },
    postUpdated: {
      type: Date,
      // default: Date.now(),
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
    // postInfo: {
    //   upComingIPO: {
    //     type: Boolean,
    //   },
    // },
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
    postExternalLinks: [String],
  });

const PostModel: Model<IPostDocument> =
  mongoose.models.Post || mongoose.model<IPostDocument>("Post", postSchema);

export default PostModel;
