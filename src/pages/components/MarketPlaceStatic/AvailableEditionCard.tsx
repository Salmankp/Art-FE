import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Box } from '@material-ui/core';
import { Pause, PlayArrowOutlined } from '@material-ui/icons';
import AvailableEditionCardStyles from '../styles/MarketPlaceStatic/AvailableEditionCard.module.scss';
import Loader from '../common/Loader';
import {
  uniqueDrop,
  legendaryDrop,
  extraordinaryDrop,
  masterpieceDrop,
  classicDrop,
  rareDrop,
  limitedDrop,
  artefyGradientLogo,
  commonDrop,
  noImageAvailable,
} from '../../../assets';

type RarityType =
  | 'Unique'
  | 'Legendary'
  | 'Extraordinary'
  | 'Masterpiece'
  | 'Classic'
  | 'Rare'
  | 'Limited'
  | 'Special'
  | 'Common';
const AvailableEditionCard: React.FC<{
  data: any;
  filterItems: any;
}> = ({ data, filterItems }) => {
  const THUMBNAIL = data?.paintingDetail?.previewImage;
  const [image, setImage] = useState(data?.paintingDetail?.image || '');
  const [isBuffering, setIsBuffering] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [thumbnail, setThumbnail] = useState<any>(THUMBNAIL || false);

  const mintID = data?._id || '';
  const paintingID = data?.paintingDetail?._id || '';
  const mediaType = data?.paintingDetail?.filetype || '';
  const mintsCount = data?.paintingDetail?.mintsCount || '';
  const mintNumber = data?.num || '';
  const currentBuyerName = data?.currentBuyer?.username || 'N/A';
  const marketPlacePrice = (+data?.marketplace?.price).toFixed(2) ?? 0;
  const rarity = data?.paintingDetail.rarity || '';

  const renderRarityIcon = (name: RarityType) => {
    switch (name) {
      case 'Unique':
        return uniqueDrop;
      case 'Legendary':
        return legendaryDrop;
      case 'Extraordinary':
        return extraordinaryDrop;
      case 'Masterpiece':
        return masterpieceDrop;
      case 'Classic':
        return classicDrop;
      case 'Rare':
        return rareDrop;
      case 'Limited':
        return limitedDrop;
      case 'Common':
        return commonDrop;
      case 'Special':
        return artefyGradientLogo;
      default:
    }
  };

  const handleImageError = () => {
    setImage(noImageAvailable);
  };

  const handleToggleVideo = (action) => {
    if (action === 'play') {
      setIsPlay(true);
      setThumbnail(false);
    }
    if (action === 'pause') {
      setIsPlay(false);
    }
  };

  const renderBuffering = (isPlay, isBuffering) => {
    if (isBuffering && isPlay) {
      return (
        <Box className={AvailableEditionCardStyles.bufferingLoader}>
          <Loader />
        </Box>
      );
    }
  };

  return (
    <div className={AvailableEditionCardStyles.griditem}>
      <div className={AvailableEditionCardStyles.gridimg}>
        {mediaType !== 'MP4' ? (
          <img
            className={AvailableEditionCardStyles.paintingImg}
            src={image}
            alt="painting_image"
            onError={handleImageError}
          />
        ) : (
          <div className={`${AvailableEditionCardStyles.player}`}>
            {renderBuffering(isPlay, isBuffering)}
            <ReactPlayer
              className={AvailableEditionCardStyles.videoWrap}
              light={thumbnail}
              url={data?.paintingDetail?.image}
              playing={isPlay}
              controls={false}
              onBuffer={() => {
                setIsBuffering(true);
              }}
              onBufferEnd={() => {
                setIsBuffering(false);
              }}
              onEnded={() => {
                setIsPlay(false);
                setThumbnail(data?.paintingDetail?.previewImage);
              }}
            />
          </div>
        )}
        <div className={AvailableEditionCardStyles.overlay}>
          <h3 className={AvailableEditionCardStyles.editionCount}>
            {`#${mintNumber} of ${mintsCount}`}
          </h3>
          <div className={AvailableEditionCardStyles.ownerWrap}>
            <span className={AvailableEditionCardStyles.key}>
              {`Owner: ${currentBuyerName}`}
            </span>
          </div>
          <h3 className={AvailableEditionCardStyles.price}>
            <span>$</span>
            {marketPlacePrice}
          </h3>
          {/* {!data?.marketplace?.active && (
                    <>
                      <div className={AvailableEditionCardStyles.currentBid}>
                        Current Bid $600
                      </div>
                      <div className={AvailableEditionCardStyles.actionWrap}>
                        <div className={AvailableEditionCardStyles.inputWrap}>
                          <input
                            type="text"
                            className={AvailableEditionCardStyles.input}
                            placeholder="894"
                          />
                        </div>
                        <button className={AvailableEditionCardStyles.bidBtn}>
                          Bid
                        </button>
                      </div>
                    </>
                  )} */}
          <Box className={AvailableEditionCardStyles.videoIcons}>
            {mediaType === 'MP4' && (
              <>
                {!isPlay && (
                  <Box
                    className={AvailableEditionCardStyles.playerIcon}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => {
                      handleToggleVideo('play');
                    }}
                  >
                    <PlayArrowOutlined />
                  </Box>
                )}
                {isPlay && (
                  <Box
                    className={AvailableEditionCardStyles.playerIcon}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    onClick={() => handleToggleVideo('pause')}
                  >
                    <Pause />
                  </Box>
                )}
              </>
            )}
          </Box>
        </div>
        <div className={AvailableEditionCardStyles.badgewrap}>
          <div className={AvailableEditionCardStyles.logoo}>
            <img src={renderRarityIcon(rarity)} alt="logo" />
          </div>
          <div className={AvailableEditionCardStyles.txt}>{rarity}</div>
        </div>
      </div>
      <div className={AvailableEditionCardStyles.titleWrap}>
        <div className={AvailableEditionCardStyles.editionId}>
          {` #${mintNumber}`}
        </div>
        <div className={AvailableEditionCardStyles.bidBuyItemWrap}>
          <div className={AvailableEditionCardStyles.buyItem}>
            <span className={AvailableEditionCardStyles.key}>Buy Now</span>
            <span className={AvailableEditionCardStyles.value}>
              {` $${marketPlacePrice}`}
            </span>
          </div>
          {/*  {!data.marketplace?.active && (
                    <div className={AvailableEditionCardStyles.bidItem}>
                      <span className={AvailableEditionCardStyles.key}>
                        Bid Now
                      </span>
                      <span className={AvailableEditionCardStyles.value}>
                        {` $${data?.marketplace?.price || '0'}`}
                      </span>
                    </div>
                  )} */}
        </div>
      </div>
      <div className={AvailableEditionCardStyles.actionWrap}>
        <button
          onClick={() =>
            filterItems({
              paintingID,
              mintID,
            })
          }
        >
          View Listing
        </button>
      </div>
    </div>
  );
};
export default AvailableEditionCard;
