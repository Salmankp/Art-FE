interface Sale {
  active: boolean;
  price: number;
  cryptoPrice: number;
  orderID: string;
  captureID: string;
  txnHash: string;
  sold: boolean;
  processing: boolean;
}

// This type is incomplete, missing user props, TODO: implement user props when user type is implemented
interface Mint {
  _id: string;
  paintingID: string | Painting;
  name: string;
  tokenId: string;
  artPieceNumber: string;
  num: number;
  sale: Sale;
}

interface MintWithStatus {
  available: boolean;
  paintingID: string;
  mintID: string;
}
