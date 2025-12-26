import {
  firstGrid,
  secondGrid,
  thirdGrid,
  fourthGrid,
} from '../../../../assets';

export const Collections = [
  {
    data: {
      name: 'Princess Mars',
      artist: 'Frank Frazetta',
      value: 50,
      genre: 'Fantasy',
      latestSalePrice: 9900,
      rarity: 'Pop Cult',
      image: firstGrid,
    },
    type: 'available',
    hasOverlay: false,
    favorites: false,
  },
  {
    data: {
      name: 'Cyclops',
      artist: 'Frank Frazetta',
      value: 200,
      genre: 'Sci-Fi',
      latestSalePrice: 9900,
      rarity: 'Masterpiece',
      image: secondGrid,
    },
    type: 'available',
    hasOverlay: false,
    favorites: false,
  },
  {
    data: {
      name: 'Android',
      artist: 'Frank Frazetta',
      value: '#008 of 50',
      genre: 'Fantasy',
      latestSalePrice: 9900,
      rarity: 'Pop Cult',
      image: thirdGrid,
    },
    // type: "listing",
    hasOverlay: false,
    favorites: false,
  },
  {
    data: {
      name: 'Buck Blaster',
      artist: 'Frank Frazetta',
      value: 50,
      genre: 'Fantasy',
      latestSalePrice: 9900,
      rarity: 'Pop Cult',
      image: fourthGrid,
    },
    type: 'available',
    hasOverlay: false,
    favorites: false,
  },
];
