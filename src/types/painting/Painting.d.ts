/**
 * TODO: complete this type, currently only enough data to complete the painting card component
 */

type Genre = 'Fantasy' | 'Sci-Fi' | 'Horror' | 'Unspecified';

type Rarity =
  | 'Unique'
  | 'Legendary'
  | 'Extraordinary'
  | 'Masterpiece'
  | 'Classic'
  | 'Rare'
  | 'Limited'
  | 'Common';

type Format =
  | ''
  | 'Traditional'
  | 'Medium'
  | '3d'
  | 'Mixed Media'
  | 'Unspecified'
  | 'Box';

type MintProgress = 'Minted' | 'Pending' | 'Drafted' | 'Failed';

type FileType = 'MP4' | 'PNG';

interface Painting {
  _id: string;
  artists: Artist;
  theme: Collection;
  name: string;
  about: string;
  description: string;
  image: string;
  year: number;
  genre: Genre;
  pointVal: number;
  rarity: Rarity;
  format: Format;
  num: number;
  platform: string;
  dropId: string;
  mints: string;
  partnerBadge: string;
  dropDate: string;
  createdAt: string;
  mintStatus: MintProgress;
  mintStatusData: MintStatus;
  file: string;
  animation_url: string;
  boxMetadata: BoxMetadata;
  size?: string;
  filetype: FileType;
  fractionalOwnership: boolean;
  allowStaking: boolean;
  size: Size;
}
