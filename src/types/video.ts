// Thumbnail node
export interface ThumbnailNode {
  altText: string;
  uri: string;
}

// Custom video fields
export interface VideoFields {
  __typename: 'VideoFields';
  projectSlug: string;
  videoUrl: string;
  thumbnail: {
    node: ThumbnailNode;
  };
}

// Creator summary (nested inside a video)
export interface CreatorSummary {
  name: string;
  slug: string;
  id: string;
}

// A single video + related creators
export interface VideoNode {
  id: string;
  videoFields: VideoFields;
  creators: {
    nodes: CreatorSummary[];
  };
}

// Video connection (list of videos)
export interface VideoConnection {
  nodes: VideoNode[];
}

// Creator type
export interface Creator {
  name: string;
  slug: string;
  videos: VideoConnection;
}

// Root query response for a single creator
export interface GetVideosByCreatorResponse {
  creator: Creator;
}

// Root query response for all creator slugs
export interface GetAllCreatorSlugsResponse {
  creators: {
    nodes: { slug: string }[];
  };
}
