
export interface Post {
  id: string;
  imageUrl: string;
  isPinned?: boolean;
  isVideo?: boolean;
  viewsCount?: string; // Nueva propiedad para las vistas (ej: "1.2M")
}

export interface Highlight {
  id: string;
  label: string;
  imageUrl: string;
}

export interface Story {
  id: string;
  imageUrl: string;
}

export interface ProfileData {
  username: string;
  fullName: string;
  isVerified: boolean;
  isPrivate: boolean;
  postCount: number | string;
  followerCount: string;
  followingCount: number | string;
  likesCount?: string | number;
  lovesCount?: string | number;
  bio: string;
  category: string;
  links: string[];
  profilePicUrl: string;
  highlights: Highlight[];
  posts: Post[];
  reels: Post[];
  tagged: Post[];
  stories?: Story[];
}
