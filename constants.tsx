
import { ProfileData, Post } from './types';

const generatePosts = (prefix: string, count: number, isVideo = false): Post[] => 
  Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i}`,
    imageUrl: `https://picsum.photos/seed/${prefix}-${i}/600/600`,
    isVideo: isVideo,
    isPinned: i < 3 && prefix.includes('public-grid'),
    viewsCount: isVideo ? `${(Math.random() * 10 + 1).toFixed(1)}M` : undefined
  }));

export const PUBLIC_PROFILE_DATA: ProfileData = {
  username: "dorisjocelynn",
  fullName: "DORIS JOCELYN",
  isVerified: true,
  isPrivate: false,
  postCount: 506,
  followerCount: "5.8 mill.",
  followingCount: 1778,
  category: "Artista",
  bio: "🇲🇽 Maquillaje & Transformación\nMGMT @stayonsocial",
  links: ["threads.net/@dorisjocelynn"],
  profilePicUrl: "https://picsum.photos/seed/doris_public/300/300",
  highlights: [
    { id: 'h1', label: 'Makeup', imageUrl: 'https://picsum.photos/seed/m1/150/150' },
    { id: 'h2', label: 'Tutorials', imageUrl: 'https://picsum.photos/seed/m2/150/150' },
    { id: 'h3', label: 'Events', imageUrl: 'https://picsum.photos/seed/m3/150/150' },
    { id: 'h4', label: 'Awards', imageUrl: 'https://picsum.photos/seed/m4/150/150' },
    { id: 'h5', label: 'Trends', imageUrl: 'https://picsum.photos/seed/m5/150/150' },
  ],
  posts: generatePosts('public-grid', 12),
  reels: generatePosts('public-reels', 12, true),
  tagged: generatePosts('public-tagged', 12)
};

export const PERSONAL_PROFILE_DATA: ProfileData = {
  username: "doris_j",
  fullName: "Doris Jocelyn",
  isVerified: false,
  isPrivate: true,
  postCount: 42,
  followerCount: "840",
  followingCount: 610,
  category: "",
  bio: "Cuenta personal ✨\nSolo amigos y familia 🤍\nAmante de los perritos 🐾",
  links: [],
  profilePicUrl: "https://picsum.photos/seed/doris_personal/300/300",
  highlights: [
    { id: 'hp1', label: 'Familia', imageUrl: 'https://picsum.photos/seed/f1/150/150' },
    { id: 'hp2', label: 'Viajes', imageUrl: 'https://picsum.photos/seed/v1/150/150' },
    { id: 'hp3', label: 'Food', imageUrl: 'https://picsum.photos/seed/v2/150/150' },
  ],
  posts: generatePosts('private-grid', 12),
  reels: generatePosts('private-reels', 12, true),
  tagged: generatePosts('private-tagged', 12)
};
