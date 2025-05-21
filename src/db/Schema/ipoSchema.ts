import mongoose, { Document, Model } from "mongoose";

export interface IIPODocument extends Document {
  name: string;
  logo: {
    original: string;
    medium?: string;
    thumbnail?: string;
  };
  dates: {
    open: string;
    close: string;
    listing: string;
  };
  category: string; // "mainboard" | "sme"
  offerPrice: string;
  lotSize: string;
  subscription: string;
  exPremium: string;
  status: string; // "pre" | "apply" | "closed"
  linkedPostsId?: string[];
  ipoPhase: string; // 'current' | 'upcoming' | 'listed'
  allotmentLink?: string;
  allotmentStatus: boolean;
  createdBy: {
    userName: string;
    userId: string;
  };
}

const ipoSchema: mongoose.Schema<IIPODocument> =
  new mongoose.Schema<IIPODocument>({
    name: {
      type: String,
      required: true,
    },
    logo: {
      original: {
        type: String,
        required: true,
      },
      medium: {
        type: String,
        required: false,
      },
      thumbnail: {
        type: String,
        required: false,
      },
    },
    dates: {
      open: {
        type: String,
        required: true,
      },
      close: {
        type: String,
        required: true,
      },
      listing: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String, // "mainboard" | "sme"
      required: true,
    },
    offerPrice: {
      type: String,
      required: true,
    },
    lotSize: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      required: true,
    },
    exPremium: {
      type: String,
      required: true,
    },
    status: {
      type: String, // "pre" | "apply" | "closed"
      required: true,
    },
    linkedPostsId: {
      type: [String],
      required: false,
    },
    ipoPhase: {
      type: String, // 'current' | 'upcoming' | 'listed'
      required: true,
    },
    allotmentLink: {
      type: String,
      required: false,
    },
    allotmentStatus: {
      type: Boolean,
      required: true,
    },
    createdBy: {
      userName: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
    },
  });

const IPOModel: Model<IIPODocument> =
  mongoose.models.IPO || mongoose.model<IIPODocument>("IPO", ipoSchema);

export default IPOModel;
