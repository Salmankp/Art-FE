import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NFT } from 'pages/components/DropNew/DropDetails';
import { removeAllTrailingSlashes } from 'utils/helper';
import { DropsAPI } from 'api/dropsAPI';
import { dropPaintings } from 'utils/interfaces';

import ScreenJson from 'pages/Drops/constants/screenJson';
import ToolTypes from 'pages/Drops/constants/Enums';
import DropMaker from 'pages/Drops/DropScripts/DropMaker';
import Generic from 'pages/Drops/constants/DropJson/Generic';

type stackType = 'everscapes' | 'artefy' | 'classic-club';
const Main: React.FC = () => {
  const history = useHistory();
  const [nftsData, setNftsData] = useState<NFT[]>([]);
  const [DropData, setDropDate] = useState<any>([]);
  const [autoRerender, setIsAutoRerender] = useState<number>(0);
  const [dropApiDetails, setDropDetails] = useState<dropPaintings>();

  useEffect(() => {
    const slug = removeAllTrailingSlashes(location.pathname);
    const fetchDropsData = async () => {
      try {
        await DropsAPI.getDropsBySlug(slug).then((nft: any) => {
          if (!nft?.data?.paintings?.length) return history.push('/404page');

          const dropData = ScreenJson.find(
            (dropData) => dropData.slug === slug,
          );
          if (dropData || Generic) {
            const HeaderData = {
              world: location.pathname as stackType,
              description: nft.data?.dropDesc || '',
              dropName: nft.data?.dropName?.toUpperCase() || '',
              subTitle: nft.data?.subTitle || '',
              details: [
                `${
                  nft.data?.dropPainting === 1
                    ? `${nft.data?.dropPainting} Collectable`
                    : `${nft.data?.dropPainting} Collectables`
                }`,
                `${
                  nft.data?.dropArtist === 1
                    ? `${nft.data?.dropArtist} Artist`
                    : `${nft.data?.dropArtist} Artists`
                }`,
                `${
                  nft.data?.dropCollection === 1
                    ? `${nft.data?.dropCollection} Collection`
                    : `${nft.data?.dropCollection} Collections`
                }`,
                'Direct Sale',
              ],
            };

            const Details = {
              nftsData: nft.data.paintings,
              location: window.location,
              autoRerender,
              payableModalHandler: () => {},
              setIsAutoRerender,
            };

            const GridData = {
              nftsData: nft.data.paintings,
              autoRerender,
              type: location.pathname as stackType,
            };
            if (dropData) {
              dropData.drop = dropDataUpdate(
                HeaderData,
                Details,
                GridData,
                dropData.drop,
              );
              setDropDate(dropData);
            } else if (Generic) {
              Generic.drop = dropDataUpdate(
                HeaderData,
                Details,
                GridData,
                Generic.drop,
                nft?.data?.logo,
                nft?.data?.backgroundImage,
              );
              setDropDate(Generic);
            }
          }
          setNftsData(nft.data.paintings);
          setDropDetails(nft.data);
        });
      } catch (e) {
        return history.push('/404page');
      }
    };
    fetchDropsData();
  }, [autoRerender]);

  const dropDataUpdate = (
    HeaderData,
    Details,
    GridData,
    drop,
    logo?,
    backgroundImage?,
  ) => {
    return drop.map((item) => {
      if (item.toolType === ToolTypes.TOOL_TYPE_HEADER) {
        item.data = HeaderData;
      }
      if (item.toolType === ToolTypes.TOOL_TYPE_HEADERV2) {
        item.data = HeaderData;
        if (backgroundImage) item.backgroundImage = backgroundImage;
        if (logo) item.logo = logo;
      }
      if (item.toolType === ToolTypes.TOOL_TYPE_DETAIL_SECTION) {
        item.data = Details;
      }
      if (item.toolType === ToolTypes.TOOL_TYPE_GRID_SECTION) {
        item.data = GridData;
      }
      return item;
    });
  };

  if (nftsData.length === 0) return null;

  return (
    <>
      {DropData && DropData.drop.length > 0 && (
        <DropMaker screenJson={DropData.drop} />
      )}
    </>
  );
};

export default Main;
