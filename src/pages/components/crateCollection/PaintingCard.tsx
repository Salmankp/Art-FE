import React from 'react';
import PaintingContainer from './Box';

interface PaintingCardProps {
  painting: Painting;
  owned: any;
}

const PaintingCard = ({ painting, owned }: PaintingCardProps) => {
  return (
    <PaintingContainer
      {...{ mint: { paintingID: painting } }}
      showMinimalInfo
      isUnList={false}
      showQuickListButton={false}
      owned={owned}
    />
  );
};

export default PaintingCard;
