type Format = 'Traditional' | 'Medium' | '3D' | 'Mixed Media' | 'Unspecified';
type Size =
  | 'Small'
  | 'Medium'
  | 'Medium Triptych'
  | 'Grand'
  | 'Grand Triptych'
  | 'Unspecified';
type Rarity =
  | 'Extraordinary'
  | 'Masterpieces'
  | 'Gems'
  | 'Jewels'
  | 'Classics'
  | 'Unspecified';
export type FileType =
  | 'JPG'
  | 'PNG'
  | 'GIF'
  | 'SVG'
  | 'MP4'
  | 'WEBM'
  | 'MP3'
  | 'WAV'
  | 'OGG'
  | 'GLB'
  | 'GLTF'
  | 'WEBGL';

export type DropStatus = 'upcoming' | 'live' | 'finished' | 'comingsoon';
export type DropNftStatus =
  | 'REGISTER'
  | 'BUY NOW'
  | 'SOLD OUT'
  | 'COMING SOON'
  | 'DROP ENDED'
  | 'LOGIN TO BUY';
// type SaleType = "Auction" | "Limited Edition" | "Direct Sale";
// type DropCollectionType = "Frazetta" | "Vulcan" | "Heavy Metal";
export type DropType =
  | 'Unique'
  | 'Rare'
  | 'Masterpiece'
  | 'Legendary'
  | 'Classic'
  | 'Limited'
  | 'Common'
  | 'Extraordinary';

export interface Sale {
  _id: string;
  active: boolean;
  captureID: string;
  cryptoPrice: number;
  orderID: string;
  price: number;
  processing: boolean;
  sold: boolean;
  txnHash: string;
}

export interface MintsInter {
  _id: string;
  sale: Sale;
  tokenId: string;
}

export interface Time {
  day: number;
  hour: number;
  minute: number;
  second: number;
}

export interface CollectionInter {
  name: string;
  image: string;
  description: string;
  artist: string;
  collection: string;
  format: Format;
  size: Size;
  rarity: Rarity;
  fileType: FileType;
  genre: string;
  dropData: string;
  originalPrice: number;
  latestSale: string;
  latestSalePrice: number;
  availableMintings: number;
  mintingList: string[];
  type: string[];
  _id?: string;
}

export interface DropInter {
  status(status: any): import('react').ReactNode;
  _id: string;
  about: string;
  allowStaking: boolean;
  artist: {
    _id: string;
    name: string;
    bio: string;
  };
  description: string;
  dropDate: string;
  fileType: string;
  format: string;
  fractionalOwnership: 'true' | 'false';
  genre: string;
  image: string;
  threeDPreview: string;
  minPrice: number;
  minCryptoPrice: number;
  mints: MintsInter[];
  pieceNumber: number;
  platform: string;
  pointVal: number;
  rarity: string;
  set: number;
  size: string;
  sold: boolean;
  theme: string;
  name: string;
  availableMint: number;
  mintCount: number;
  collection: string;
  saleType: string;
}

export interface DropDetailsInter {
  artists: string[];
  collections: string[];
  description: string;
  logo: string;
  name: string;
  paintings: string[];
  releaseTime: string;
  worldID: string;
  _id: string;
}

export interface DropCardSmallInter {
  art: string;
  name: string;
  edition: number;
  image: string;
  id: number;
  rarity: string;
  artist: string;
}

export interface latestDropPaintingDetails {
  id: string;
  name: string;
  aboutArtWork: string;
  aboutNFT: string;
  aboutArtist: string;
  previewUrl: string;
  preview3DUrl: string;
  gridImg: string;
  authorBadge: string | null;
  collection: string;
  dropDate: string;
  rarity: string;
  artist: string;
  desc: string;
  saleType: string;
  price: number;
  cryptoPrice: number;
  isSold: boolean;
  availableMints: number;
  orientation: string;
  slug: string;
  silverBadge: string;
}
export interface dropPaintings {
  dropName: string;
  dropDesc: string;
  dropArtist: number;
  dropCollection: number;
  dropPainting: number;
  subTitle: string;
}
