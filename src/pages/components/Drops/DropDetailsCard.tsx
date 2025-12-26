import React, { useState } from 'react';
import { maticLogo } from 'utils/helpers';
import styles from '../styles/Drops/DropDetailsCard.module.scss';
import {
  DropInter,
  DropStatus,
  DropType,
  Time,
} from '../../../utils/interfaces';
import {
  infoImg,
  classicDrop,
  legendaryDrop,
  masterpieceDrop,
  rareDrop,
  uniqueDrop,
} from '../../../assets';

interface ItemProps {
  data: number;
  showImg: boolean;
  text: string;
}

interface CustomButtonProps {
  text: string;
  padding: string;
  status: DropStatus;
  clickHandler?: ((data: any) => void) | null;
}

const Item = ({ data, showImg, text }: ItemProps) => {
  return (
    <div className={styles.Item}>
      <div className={styles.left}>
        <p>{data >= 10 ? data : `0${data}`}</p>
        <p>
          {text}
          {data > 1 && 's'}
        </p>
      </div>
      {showImg && <p className={styles.img}>:</p>}
    </div>
  );
};

const CustomButton = ({
  padding,
  status,
  text,
  clickHandler,
}: CustomButtonProps) => {
  return (
    <button
      className={status === 'finished' ? styles.FinishedBtn : styles.NormalBtn}
      style={{ padding, cursor: 'pointer' }}
      onClick={clickHandler!}
    >
      {text}
    </button>
  );
};

const UniqueAuctionType: React.FC<{
  status: DropStatus;
  edition: {
    present: number;
    total: number;
  };
  closeTime?: Time;
  currentBid?: number;
  winningBid?: number;
  clickHandler: (data: any) => void;
}> = (props) => {
  const ButtonSection = (drop: {
    data: DropStatus;
    currentBid?: number;
    winningBid?: number;
  }) => {
    switch (drop.data) {
      case 'upcoming':
        return (
          <CustomButton
            text="REGISTER"
            padding="0.6rem 2.4rem"
            status={props.status}
          />
        );
      case 'live':
        return (
          <div className={styles.buttonSectionLive}>
            <div className={styles.bidValue}>
              <p>Current Bid</p>
              <p className={styles.price}>
                <span>$</span>
                {drop.currentBid?.toLocaleString()}
              </p>
            </div>
            <input placeholder="$ Amount" />
            <CustomButton
              text="Place Bid"
              padding="0.4rem 2.4rem"
              status={props.status}
              clickHandler={props.clickHandler}
            />
          </div>
        );
      case 'finished':
        return (
          <div className={styles.buttonSectionFinished}>
            <div className={styles.bidValue}>
              <p>Winning Bid</p>
              <p className={styles.price}>
                <span>$</span>
                {drop.winningBid && drop.winningBid.toLocaleString()}
              </p>
            </div>
            <CustomButton
              text="SOLD OUT"
              padding="0.4rem 2.7rem"
              status={props.status}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.UniqueAuctionTypeContainer}>
      <div className={styles.topContainer}>
        <p className={styles.headerText}>
          <span>UNIQUE EDITION - </span>
          {props.edition.present}
          of
          {props.edition.total}
        </p>
        {props.status === 'live' && (
          <div className={styles.closingTime}>
            <div className={styles.header}>
              <p>AUCTION</p>
              <p>CLOSES</p>
            </div>
            <Item data={props.closeTime!.day} showImg text="day" />
            <Item data={props.closeTime!.hour} showImg text="hour" />
            <Item data={props.closeTime!.minute} showImg text="minute" />
            <Item
              data={props.closeTime!.second}
              showImg={false}
              text="second"
            />
          </div>
        )}
      </div>
      <div className={styles.biddingInteractionSection}>
        {props.status === 'live' ? (
          <ButtonSection data={props.status} currentBid={props.currentBid} />
        ) : (
          <ButtonSection data={props.status} winningBid={props.winningBid} />
        )}
      </div>
    </div>
  );
};

const OtherAuctionType: React.FC<{
  price: number;
  matic: number;
  edition: number;
  status: DropStatus;
  clickHandler: (data: any) => void;
}> = (props) => {
  const getBtnText = (data: DropStatus) => {
    switch (data) {
      case 'upcoming':
        return 'REGISTER';
      case 'live':
        return 'Buy Now';
      case 'finished':
        return 'SOLD OUT';
      case 'comingsoon':
        return 'COMING SOON';
      default:
        return '';
    }
  };
  const maticBalance = props.matic?.toLocaleString();
  return (
    <div className={styles.OtherAuctionTypeContainer}>
      <p className={styles.editionText}>
        {props.edition}
        EDITIONS
      </p>
      <div className={styles.priceContainer}>
        <p className={styles.dollarText}>
          <span>$</span>
          {props.price?.toLocaleString()}
        </p>
        <div className={styles.borderLine} />
        <p className={styles.maticText}>{maticLogo(maticBalance)}</p>
      </div>
      <CustomButton
        text={getBtnText(props.status)}
        status={props.status}
        padding="0.4rem 2.7rem"
        clickHandler={props.status === 'live' ? props.clickHandler : null}
      />
    </div>
  );
};

const DropDetailsCard: React.FC<{
  data: DropInter;
  modalHandler: (data: any) => void;
}> = ({ data, modalHandler }) => {
  console.log('DATA: ', data);
  const [currentNav, setCurrentNav] = useState<'Art' | 'NFT' | 'Artist'>('Art');
  const [details, setDetails] = useState<string>(data?.artist?.bio);

  const getStatusText = (
    date: string,
    sold: boolean,
    availableMint: number,
  ) => {
    const currentDate = new Date();
    const bidDate = new Date(date);
    if (
      currentDate.getTime() > bidDate.getTime() &&
      !sold &&
      availableMint > 0
    ) {
      return <p className={styles.liveText}>DROP LIVE</p>;
    }

    return <p className={styles.finishedText}>DROP FINISHED</p>;
  };

  const getDropTypeIcon = (type: DropType) => {
    switch (type) {
      case 'Unique':
        return uniqueDrop;
      case 'Masterpiece':
        return masterpieceDrop;
      case 'Classic':
        return classicDrop;
      case 'Legendary':
        return legendaryDrop;
      case 'Rare':
        return rareDrop;
      default:
        return '';
    }
  };

  const getBidStatus = (
    date: string,
    sold: boolean,
    availableMint: number,
  ): DropStatus => {
    const currentDate = new Date();
    const bidDate = new Date(data.dropDate);
    if (
      currentDate.getTime() > bidDate.getTime() &&
      !sold &&
      availableMint > 0
    ) {
      return 'live';
    }
    if (currentDate.getTime() < bidDate.getTime()) {
      return 'upcoming';
    }
    return 'finished';
  };

  // time difference checker
  const currentDate = new Date();
  const bidDate = new Date(data.dropDate);
  return (
    <div className={styles.DropDetailsCard} id={`${data?._id}`}>
      <div className={styles.Main}>
        <div className={styles.leftContainer}>
          <img src={data.image} alt={data?.name} />
          <div className={styles.subData}>
            <div className={styles.collection}>
              <p>Collection</p>
              <div className={styles.divider} />
              <p>Warriors</p>
            </div>
            <div className={styles.imageContainer}>
              {data?.rarity && getDropTypeIcon(data.rarity as DropType) && (
                <img
                  src={data?.rarity && getDropTypeIcon(data.rarity as DropType)}
                  alt={data.rarity}
                />
              )}
              <p>{data.rarity}</p>
            </div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.statusContainer}>
            {currentDate.getTime() < bidDate.getTime() && (
              <div className={styles.timeContainer}>
                <div className={styles.headerContainer}>
                  <p>DROP</p>
                  <p>STARTS</p>
                </div>
                <Item data={bidDate?.getDay()} showImg text="day" />
                <Item data={bidDate?.getHours()} showImg text="hour" />
                <Item data={bidDate.getMinutes()} showImg text="minute" />
                <Item
                  data={bidDate?.getSeconds()}
                  showImg={false}
                  text="second"
                />
              </div>
            )}
            {getStatusText(data.dropDate, data.sold, data.availableMint)}
            <div className={styles.saleTypeContainer}>
              <p className={styles.title}>Sale Type</p>
              <div className={styles.border} />
              <div className={styles.saleText}>
                <p>DIRECT SALE</p>
                <img src={infoImg} alt="info-img" />
              </div>
            </div>
          </div>
          <div className={styles.NameContainer}>
            <p className={styles.author}>{data?.artist?.name}</p>
            <p className={styles.nftName}>{data?.name}</p>
            {data.fractionalOwnership === 'true' && (
              <div className={styles.extraData}>
                Auction includes ownership of original artwork
              </div>
            )}
          </div>
          <div className={styles.interactionSection}>
            <OtherAuctionType
              price={data?.minPrice}
              matic={data?.minCryptoPrice}
              edition={data?.availableMint}
              status={getBidStatus(
                data.dropDate,
                data.sold,
                data.availableMint,
              )}
              clickHandler={() => modalHandler(data)}
            />
          </div>
          <div className={styles.aboutDetailsContainer}>
            <div className={styles.navContainer}>
              <p
                className={currentNav === 'Art' ? styles.activeNav : ''}
                onClick={() => {
                  setCurrentNav('Art');
                  setDetails(data.description);
                }}
              >
                About the Artworks
              </p>
              <div className={styles.borderLine} />
              <p
                className={currentNav === 'NFT' ? styles.activeNav : ''}
                onClick={() => {
                  setCurrentNav('NFT');
                  setDetails(data.about);
                }}
              >
                About the NFT
              </p>
              <div className={styles.borderLine} />
              <p
                className={currentNav === 'Artist' ? styles.activeNav : ''}
                onClick={() => {
                  setCurrentNav('Artist');
                  setDetails(data.artist.bio);
                }}
              >
                About the Artist
              </p>
            </div>
            <div className={styles.dataContainer}>{details}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDetailsCard;
