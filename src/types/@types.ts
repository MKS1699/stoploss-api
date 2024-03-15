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
  postCreated?: Date | string;
  postUpdated?: Date | string;
  postImage: IMAGE;
  hasImage: boolean;
  postParagraphs: PARAGRAPH[];
  postTags: string[];
  postDescription: string;
  postInfo: {
    upcomingIPO: boolean;
    ipoName: string;
  };
  createdBy: string;
}

// Paragraph Types of the post
export interface PARAGRAPH {
  paraHeading?: string;
  paraSubHeading?: string;
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
    medium?: string;
    thumbnail?: string;
  };
  caption: string;
}

// Table Types for the post
export type TABLE = string[][];
