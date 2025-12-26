import React, { useState, useEffect } from 'react';
import Box from 'pages/components/dashboard/Box';

const BoxWraper: React.FC<{
  paintings: any;
  currentPage: number;
  paintingsLimit: number;
  isDashboard: boolean;
  isUnlist: boolean;
  isMyAsset: boolean;
  isMarketplaceListings: boolean;
  handleReact?: (data: any) => void;
}> = ({
  paintings,
  currentPage,
  paintingsLimit,
  isUnlist,
  isDashboard,
  isMyAsset,
  isMarketplaceListings,
  handleReact,
}) => {
  const [listArry, setListArray] = useState<any>([]);

  const getPaginatedData = () => {
    const startIndex = currentPage * paintingsLimit - paintingsLimit;
    const endIndex = startIndex + paintingsLimit;
    return paintings.slice(startIndex, endIndex);
  };

  useEffect(() => {
    setListArray(getPaginatedData());
  }, [currentPage, paintings]);

  return (
    <>
      {listArry.map((d) => (
        <Box
          owned={null}
          key={d?._id}
          mint={d}
          showMinimalInfo
          isUnList={isUnlist}
          isDashboard={isDashboard}
          isMyAsset={isMyAsset}
          isMarketplaceListings={isMarketplaceListings}
          handleReact={handleReact}
        />
      ))}
    </>
  );
};
export default BoxWraper;
BoxWraper.defaultProps = {
  handleReact: undefined,
};
