import { FileType } from '../utils/interfaces';

export interface Sale {
  price: number;
  cryptoPrice: number;
  orderID: string;
  captureID: string;
  txnHash: string;
  sold: boolean;
  processing: boolean;
  _id: string;
  active: boolean;
}

export interface Artist {
  _id: string;
  name: string;
  bio: string;
}

export interface PaintingID {
  mints: string[];
  partnerBadge: string;
  dropDate: Date;
  _id: string;
  platform: string;
  theme: string;
  name: string;
  year: number;
  genre: string;
  pointVal: number;
  description: string;
  about: string;
  image: string;
  format: string;
  size: string;
  rarity: string;
  filetype: string;
  fractionalOwnership: string;
  allowStaking: string;
  file?: FileType;
  animationUrl?: string;
  artist: Artist;
  num: number;
  __v: number;
}

export interface NFT {
  pastBuyers: string[];
  currentBuyer: string;
  _id: string;
  name: string;
  tokenId: string;
  sale: Sale;
  paintingID: PaintingID;
  artPieceNumber: string;
  num: number;
}

export interface Mints {
  NFT: NFT;
  minPrice?: number;
  mints?: number;
}
