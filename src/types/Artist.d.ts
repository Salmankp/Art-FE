interface Artist {
  _id: string;
  worldID: string;
  paintings: Painting[] | string[];
  name: string;
  tagline: string;
  banner: string;
  profileImage: string;
  bio: string;
  tags: string;
}
