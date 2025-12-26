interface World {
  _id: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  artists: Artist[] | string[];
  //   drops: Drop[] | string[]; TODO: uncomment when drop types have been implemented
  collections: Collection[] | string[];
}
