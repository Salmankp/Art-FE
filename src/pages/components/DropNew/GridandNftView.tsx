import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { DropsAPI } from '../../../api/dropsAPI';
import { NFT } from './DropDetails';
import { AuthenticationStateActions } from '../../../redux/slices/AuthenticationState';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import styles from '../styles/DropNew/GridandNftView.module.scss';
import {
  NFTbg,
  noImage165by165,
  GreenDragonPatronBadge,
  classicDrop,
  legendaryDrop,
  masterpieceDrop,
  rareDrop,
  uniqueDrop,
  blueLogo,
  whiteLogo,
  frazetta3d,
  richeltext,
  yellowGift,
  redGift,
  extraordinaryDrop,
} from '../../../assets/index';
import { DropCardSmallInter, DropType } from '../../../utils/interfaces';
import { getArtistNames } from '../../../utils/helpers';
// import { nftsData } from './DropDetails';

const DropCard: React.FC<{
  parentRef: any;
  type: DropType;
  data: any;
  autoRerender: number;
}> = ({ type, data, parentRef, autoRerender }) => {
  const getDataImage = (_index, _image, _isDropLive, _isDropFinished) => {
    if (_isDropFinished) return _image;
    if (_isDropLive) return _image;
    return _index % 2 === 0 ? redGift : yellowGift;
  };
  const getDropImg = (name: DropType) => {
    switch (name) {
      case 'Classic':
        return classicDrop;
      case 'Legendary':
        return legendaryDrop;
      case 'Masterpiece':
        return masterpieceDrop;
      case 'Rare':
        return rareDrop;
      case 'Unique':
        return uniqueDrop;
      case 'Limited':
        return blueLogo;
      case 'Common':
        return whiteLogo;
      case 'Extraordinary':
        return extraordinaryDrop;
      default:
        return '';
    }
  };
  const isCornerArt = location.pathname === '/drop/corner-4-art';
  const isMetalLaunch = location.pathname === '/drop/heavy-metal-mas';
  const dispatch = useAppDispatch();
  const dropLiveDate = new Date(data.dropDate);
  const dropLiveDuration = moment.duration(
    moment(data.dropDate).diff(moment()),
  );
  const dropLiveHours = dropLiveDuration.asHours() - 2;
  const dropFinishedDuration = moment.duration(
    moment(data.dropEnd).diff(moment()),
  );
  const dropFinishedHours = dropFinishedDuration.asHours();

  const isDropLive = dropLiveHours <= 0 && dropFinishedHours > 0;
  const isDropFinished = dropFinishedHours <= 0;
  data.image = isMetalLaunch
    ? getDataImage(
        data.index,
        data.image,
        isDropLive || dropLiveHours <= 0,
        isDropFinished,
      )
    : data.image;

  const setBackgroundColor = () => {
    if (isCornerArt) return styles.buttonCornerArt;
    if (isMetalLaunch && isDropLive) return styles.green;
    if (isMetalLaunch) return styles.red;
    return '';
  };

  const threeDBox = (id) => {
    document.getElementById('3d-display')?.scrollIntoView({
      behavior: 'smooth',
    });
    dispatch(AuthenticationStateActions.set_dropVideoSrc(id));
  };
  return (
    <div className={styles.griditem}>
      <div className={styles.img}>
        <div className={styles.daysWrap}>
          {!isDropLive && !isDropFinished && `DAY ${data.index + 1}`}
        </div>
        {data.image ? (
          <img src={data.image} alt={data?.name} />
        ) : (
          <img src={noImage165by165} alt={data.art} />
        )}
        {!isMetalLaunch && getDropImg(type) && (
          <div className={styles.badge}>
            <img src={getDropImg(type)} alt="badge" />
          </div>
        )}
        <div className={styles.overlay}>
          <div>
            <div
              className={styles.title1}
              style={{ textTransform: 'capitalize' }}
            >
              {data?.artist}
            </div>
            <div className={styles.title2}>{data.name}</div>
          </div>
          <div>
            {!isMetalLaunch && (
              <div className={styles.edition}>
                {data.edition}
                Editions
              </div>
            )}

            {!isMetalLaunch || isDropLive ? (
              <div className={styles.title3} onClick={() => threeDBox(data.id)}>
                CLICK TO
                <br />
                VIEW NFT
              </div>
            ) : !isDropFinished && !autoRerender ? (
              <div className={styles.title2}>
                <span style={{ color: '#2AB611' }}>DROPPING</span>
                <br />
                <span>{dropLiveDate.getDate()}</span>
                <span style={{ color: '#2AB611' }}>DECEMBER</span>
              </div>
            ) : (
              <div className={styles.title3}>FINISHED</div>
            )}
          </div>
        </div>
      </div>
      <button
        className={setBackgroundColor()}
        onClick={() => {
          if (isDropLive || !isMetalLaunch)
            document.getElementById(data.id)?.scrollIntoView({
              behavior: 'smooth',
            });
        }}
      >
        {(isDropLive && isMetalLaunch) || !isMetalLaunch
          ? 'Go To Drop'
          : isMetalLaunch && !isDropFinished
          ? `DEC ${dropLiveDate.getDate()}`
          : isDropFinished || autoRerender
          ? 'Finished'
          : 'Go To Drop'}
      </button>
    </div>
  );
};
interface dropCardProps {
  type: string;
  nftsData: NFT[];
  autoRerender: number;
}

const GridandNftView = ({ nftsData, autoRerender }: dropCardProps) => {
  const location = useLocation();
  const isSilverWarriorMedalloion =
    location.pathname === '/drop/silver-warrior-medallion';
  const isSciFi = location.pathname === '/drop/sci-fi-launch';
  const isCornerArt = location.pathname === '/drop/corner-4-art';
  const isMetalMas = location.pathname === '/drop/heavy-metal-mas';
  const isGreg = location.pathname === '/drop/greg-hildebrandt';

  if (isSciFi || isCornerArt)
    nftsData = nftsData.slice(Math.max(nftsData.length - 3, 0));
  const dropDetails = useAppSelector(
    (state) => state.AuthenticationState.dropDetails,
  )?._id;

  const { dropPaintings } = useAppSelector(
    (state) => state.AuthenticationState,
  );

  const videoId = useAppSelector(
    (state) => state.AuthenticationState.dropVideoSrc,
  );

  const dispatch = useAppDispatch();

  const [data, setData] = useState<DropCardSmallInter[]>([]);

  useEffect(() => {
    window.onbeforeunload = function () {
      dispatch(AuthenticationStateActions.set_dropVideoSrc(''));
    };

    dropPaintings &&
      dropPaintings.length > 0 &&
      setData(
        dropPaintings.map((item) => ({
          art: item.title,
          name: item.name,
          edition: item.totalMints || item.mints?.length,
          image: item.image,
          id: item._id,
          rarity: item.rarity,
        })),
      );
  }, [dropPaintings, videoId]);

  if (!dropDetails && !dropPaintings) return null;
  if (nftsData.length === 0) return null;
  console.log('videoId ====', videoId);
  const scrollDiv = useRef(null);
  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.mainWrap}>
          <div className={!isMetalMas ? styles.gridwrap : styles.gridwrap2}>
            {nftsData?.length > 0 &&
              nftsData?.map((item, index) => (
                <DropCard
                  parentRef={scrollDiv}
                  key={item.id}
                  type={item.rarity as DropType}
                  autoRerender={autoRerender}
                  data={{
                    art: item.slug,
                    name: item.name,
                    edition: item.totalMints,
                    image: item.gridImg,
                    id: item.id,
                    rarity: item.rarity,
                    artist: getArtistNames(item?.artist || []),
                    slug: item?.slug,
                    dropDate: item?.dropDate,
                    dropEnd: item?.dropEndDate,
                    index,
                  }}
                />
              ))}
          </div>

          {(isSciFi || isCornerArt) && (
            <div
              className={isCornerArt ? styles.cornerArtText : styles.scifiText}
            >
              SELECT YOUR NFT
              <div>TO VISUALIZE IT IN</div>
              <div className={styles.text2}>REAL TIME 3D BELOW</div>
            </div>
          )}
          {isGreg && (
            <div className={styles.scifiText2}>
              <span>SELECT YOUR NFT</span>
              <span style={{ color: '#fff' }}>
                &nbsp;
                <span>TO VISUALIZE IT</span>
                <br />
                <span>IN</span>
                &nbsp;
              </span>
              <span className={styles.text2}>REAL TIME 3D BELOW</span>
            </div>
          )}
        </div>
        <div
          ref={scrollDiv}
          id="3d-display"
          className={`${isGreg ? styles.NFTWrap2 : styles.NFTWrap} ${
            videoId !== '' && styles.NFT3d
          }`}
          style={{ backgroundImage: `url(${NFTbg})` }}
        >
          {!videoId && !location?.hash ? (
            <>
              <div className={styles.img}>
                <img
                  src={
                    isSilverWarriorMedalloion
                      ? frazetta3d
                      : GreenDragonPatronBadge
                  }
                  alt={videoId}
                />
              </div>
              {isGreg ? (
                <></>
              ) : (
                <div className={styles.scifiText}>
                  SELECT YOUR NFT ABOVE
                  <div>TO VISUALIZE IT IN</div>
                  <div className={styles.text2}>REAL TIME 3D HERE</div>
                </div>
              )}
            </>
          ) : (
            <iframe
              title={videoId}
              height="100%"
              width="100%"
              src={
                !videoId && location?.hash === '#3d-display'
                  ? `https://player.artefy.io/?media-id=616e6d2911530700143ffb88`
                  : `https://player.artefy.io/?media-id=${videoId}`
              }
            />
          )}
        </div>
      </div>
    </>
  );
};

export default GridandNftView;
