interface Collection {
  _id: string;
  worldID: World | string;
  artists: Artist[];
  paintings: Painting[];
  name: string;
  tagline: string;
  description: string;
  logo: string;
  num: number;
}
