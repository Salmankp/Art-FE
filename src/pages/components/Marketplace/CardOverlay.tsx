import { maticIcon } from 'assets';
import React from 'react';
import { Tooltip, Box } from '@material-ui/core';
import { Pause, PlayArrowOutlined } from '@material-ui/icons';
import CardStyles from '../styles/Marketplace/Card.module.scss';

const CardOverlay: React.FC<{
  onToggleVideo: (action) => void;
  isPlay?: boolean;
  data: any;
  isDashboard?: boolean;
}> = ({ data, onToggleVideo, isPlay, isDashboard }) => {
  const isAssetOwned = data?.isAssetOwned;
  const name = data?.name || '';
  const dropDate = data?.dropDate || '';
  const originalPrice = data?.orignalPrice || '';
  const latestSale = data?.latestSale || '';
  const floorPrice = data?.floorPrice || '';
  const rarity = data?.rarity || '';
  const rarityIcon = data?.rarityIcon || '';
  const allMintsNames = data?.allMintsNames || '';
  const mintsCount = data?.mintsCount || '';
  const ownedMints = data?.ownedMintsListed || [];
  const editionsCount = data?.editionsCount || '';
  const ownedMintsNotListedCount = data?.ownedMintsNotListedCount || 0;
  const ownedMintsListedCount = data?.ownedMintsListedCount || 0;
  const ownedMintsListedString = data?.ownedMintsListedString || '';
  const ownedMintsNotListedString = data?.ownedMintsNotListedString || '';
  const lastSaleDate = data.lastSaleDate || '';
  const listedPrice = data.listedPrice || '';
  const mediaType = data?.mediaType || '';

  const maticLogo = (price) => {
    return (
      <p>
        {price}
        <Tooltip title="MATIC" placement="top-start" arrow>
          <img
            src={maticIcon}
            alt="logo"
            style={{ width: '12px', height: '12px' }}
          />
        </Tooltip>
      </p>
    );
  };
  return (
    <div
      className={`${CardStyles.overlayContainer} ${
        isDashboard && CardStyles.width_256
      }`}
    >
      <div className={CardStyles.overlayTopContainer}>
        {ownedMints.length > 0 && (
          <p className={`${CardStyles.assetStatusMsg} ${CardStyles.orange}`}>
            Your asset is listed.
          </p>
        )}

        {isAssetOwned && ownedMints.length <= 0 && (
          <p className={`${CardStyles.assetStatusMsg} ${CardStyles.green}`}>
            You own this asset.
          </p>
        )}
        {name && (
          <div className={CardStyles.nameContainer}>
            <p>Name</p>
            <div className={CardStyles.divider} />
            <div className={CardStyles.description}>
              <p>{name}</p>
            </div>
          </div>
        )}
        {dropDate && (
          <div className={CardStyles.artistContainer}>
            <p>Drop Date</p>
            <div className={CardStyles.divider} />
            <p>{dropDate === null ? 'N/A' : dropDate}</p>
          </div>
        )}
        {lastSaleDate && (
          <div className={CardStyles.artistContainer}>
            <p>Last Sale Date</p>
            <div className={CardStyles.divider} />
            <p>{lastSaleDate}</p>
          </div>
        )}
        {originalPrice && (
          <div className={CardStyles.artistContainer}>
            <p>Original Price</p>
            <div className={CardStyles.divider} />
            {originalPrice.split('$')[0] === '' ? (
              <p>{originalPrice}</p>
            ) : (
              maticLogo(originalPrice)
            )}
          </div>
        )}
        {latestSale && (
          <div className={CardStyles.artistContainer}>
            <p>Latest Sale</p>
            <div className={CardStyles.divider} />
            {latestSale.split('$')[0] === '' ? (
              <p>{latestSale}</p>
            ) : (
              maticLogo(latestSale)
            )}
          </div>
        )}
        {floorPrice && (
          <div className={CardStyles.artistContainer}>
            <p>Floor Price</p>
            <div className={CardStyles.divider} />
            {floorPrice.split('$')[0] === '' ? (
              <p>{floorPrice}</p>
            ) : (
              maticLogo(floorPrice)
            )}
          </div>
        )}
        {rarity && (
          <div className={CardStyles.newBadgeContainerWrap}>
            <div className={CardStyles.newBadgeContainer}>
              <div className={CardStyles.badges}>
                <img src={rarityIcon} alt={rarity} />
              </div>
              <p className={CardStyles.rarityText}>{rarity}</p>
            </div>
            <div className={CardStyles.divider} />
            <p className={CardStyles.editions}>{editionsCount}</p>
          </div>
        )}
        {allMintsNames && (
          <div className={CardStyles.minstWrap}>
            <p>{`Available Mints: ${mintsCount}`}</p>
            <div className={CardStyles.mintIds}>{allMintsNames}</div>
          </div>
        )}
        {ownedMintsNotListedString && (
          <div className={CardStyles.minstWrap}>
            <p>
              <div className={CardStyles.dotGreen} />
              {`Owned Mints: ${ownedMintsNotListedCount}`}
            </p>
            <div className={CardStyles.mintIds}>
              {ownedMintsNotListedString}
            </div>
          </div>
        )}
        {listedPrice && (
          <div className={CardStyles.minstWrap}>
            <p className={CardStyles.listedMintsWrapper}>
              {`Listed Price: ${listedPrice}`}
            </p>
          </div>
        )}
        {ownedMintsListedString && (
          <div className={CardStyles.minstWrap}>
            <p>
              <div className={CardStyles.dotOrange} />
              {`Listed Mints: ${ownedMintsListedCount}`}
            </p>
            <div className={CardStyles.mintIds}>{ownedMintsListedString}</div>
          </div>
        )}
      </div>
      <Box className={CardStyles.videoIcons}>
        {mediaType === 'MP4' && (
          <>
            {!isPlay && (
              <Box
                className={CardStyles.playerIcon}
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => onToggleVideo('play')}
              >
                <PlayArrowOutlined />
              </Box>
            )}
            {isPlay && (
              <Box
                className={CardStyles.playerIcon}
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={() => onToggleVideo('pause')}
              >
                <Pause />
              </Box>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default CardOverlay;
