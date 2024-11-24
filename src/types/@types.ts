/* Types for the Post */
export interface POST {
  postTitle: string;
  postAuthors: string[];
  postType:
    | "ipo"
    | "news"
    | "tutorial"
    | "blog"
    | "sponsored_post"
    | "company_profile";
  postCreated: string;
  postUpdated: string;
  postImage: IMAGE;
  hasImage: boolean;
  postParagraphs: PARAGRAPH[];
  postTags: string[];
  postDescription: string;
  postInfo: {
    upcomingIPO: boolean;
  };
  createdBy: {
    name: string;
    id: string;
  };
  postExternalLinks: string[];
}

// Paragraph Types of the post
export interface PARAGRAPH {
  paraHeading: string;
  paraSubHeading: string;
  paraBody: string;
  hasImages: boolean;
  paraImages: IMAGE[];
  hasTable: boolean;
  paraTable: TABLE;
}

// Image Types for the post
export interface IMAGE {
  links: {
    original: string;
    medium: string;
    thumbnail: string;
  };
  caption: string;
}

// Table Types for the post
export type TABLE = string[][];

// Upcoming IPO List Types
export interface UPCOMINGIPOLISTTYPES {
  ipoName: string;
  open: string;
  close: string;
  linkedPostsId: string[];
}

// IPO types
export interface IPOTYPES {
  name: string;
  logo: {
    // contains url of the images uploaded at imgbb
    // as of 24-09-2024
    original: string;
    medium: string;
    thumbnail: string;
  };
  dates: {
    open: string;
    close: string;
    listing: string;
  };
  category: "mainboard" | "sme";
  offerPrice: string;
  lotSize: string;
  subscription: string;
  exPremium: string;
  status: "pre-apply" | "apply" | "closed"; // "apply" == "live" will interchanged in frontend
  allotmentLink: string; // will direct to registrar link for checking allotment status
  allotmentStatus: boolean; // this will be used to show check allotment button
  ipoPhase: "current" | "upcoming" | "listed";
  linkedPostsId: string[];
  createdBy: {
    userName: string;
    userId: string;
  };
}
