import { Box } from '@material-ui/core';
import React from 'react';
import { tarnaatag } from '../../../assets';

const IMAGES = {
  taarna: tarnaatag,
};

type ComicCoverImageProps = {
  paintingTitle: string;
};

const ComicCoverImage = ({ paintingTitle }: ComicCoverImageProps) => {
  return (
    <Box padding="20px 0 0 0">
      {paintingTitle ? <img src={paintingTitle} alt="" /> : IMAGES.taarna}
    </Box>
  );
};

export default ComicCoverImage;
