import React from 'react';
import styles from '../styles/Drops/ImageStack.module.scss';
import {
  imageStackEverscapes1,
  imageStackEverscapes2,
  imageStackEverscapes3,
  imageStackEverscapes4,
  imageStackEverscapes5,
  imageStackEverscapes6,
} from '../../../assets/index';

const EverscapesImageStack: any[] = [
  imageStackEverscapes1,
  imageStackEverscapes2,
  imageStackEverscapes3,
  imageStackEverscapes4,
  imageStackEverscapes5,
  imageStackEverscapes6,
];

const ArtefyImageStack: any[] = [];
const ClassicClubImageStack: any[] = [];

type stackType = 'everscapes' | 'artefy' | 'classic-club';

const ImageStack: React.FC<{ type: stackType }> = ({ type }) => {
  const returnImageStack = (data: stackType) => {
    switch (data) {
      case 'everscapes':
        return EverscapesImageStack;
      case 'artefy':
        return ArtefyImageStack;
      case 'classic-club':
        return ClassicClubImageStack;
      default:
        return EverscapesImageStack;
    }
  };

  return (
    <div className={styles.ImageStack}>
      {returnImageStack(type).map((item, index) => (
        <img src={item} key={index} alt="item-stack" />
      ))}
    </div>
  );
};

export default ImageStack;
