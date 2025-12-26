import Slider from 'react-slick';
import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useRef } from 'react';
import styles from '../styles/Everscapes/VideoSlider.module.scss';

import {
  slider1,
  slider4,
  dracula,
  ThreedNft,
  NFTbg,
  dragonLand,
  pilot300,
  space,
} from '../../../assets';
import { PLAYER_MEDIA_URL } from '../../../utils/constants';

const images = [
  {
    name: 'Preview NFT',
    image: slider1,
    icon: '',
    id: '619351e3d389901607ed7d9a',
  },
  {
    name: 'Preview NFT',
    image: dragonLand,
    icon: '',
    id: '616cee5f0e75020014314160',
  },
  {
    name: 'Preview NFT',
    image: slider4,
    icon: '',
    id: '6193466cd389901607ed7d46',
  },
  {
    name: 'Preview NFT',
    image: pilot300,
    icon: '',
    id: '61949e40d389901607ed7f38',
  },
  {
    name: 'Preview NFT',
    image: space,
    icon: '',
    id: '',
  },
  {
    name: 'Preview NFT',
    image: dracula,
    icon: '',
    id: '617f990cd023e7001357623f',
  },
];

const CardComp: React.FC<{
  img: string;
  name: string;
  icon: string;
  nftId: string;
  data: any;
  parentRef: any;
}> = ({ img, name, icon, nftId, data, parentRef }) => {
  return (
    <div className={styles.CardItem}>
      <img src={img} alt="img" />
      <img src={icon} className={styles.iconRarity} />
      {nftId && (
        <h1
          className={styles.text}
          onClick={() => {
            data(nftId);
            parentRef.current.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {name}
        </h1>
      )}
      {!nftId && <h1 className={styles.textDisabled}>{name}</h1>}
    </div>
  );
};

const VideoSlider: React.FC = (previewNftId) => {
  const [nftPreviewId, setTheNftId] = useState('');
  const [currSlide, setCurrSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    cssEase: 'linear',
    pauseOnHover: true,
    swipeToSlide: true,
    touchThreshold: 100,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    beforeChange: (prev, next) => {
      setCurrSlide(next);
    },
    customPaging: (i) => (
      <div
        className={i === currSlide ? styles.activeDots : styles.customDots}
      />
    ),
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getNftId = (id) => {
    setTheNftId(id);
  };
  const scrollDiv = useRef(null);
  return (
    <div className={styles.Featured}>
      {!nftPreviewId ? (
        <div
          className={styles.gridVideo}
          style={{ backgroundImage: `url(${NFTbg})` }}
          ref={scrollDiv}
          id="3dPreview"
        >
          <img className={styles.nftImage} src={ThreedNft} />
        </div>
      ) : (
        <div className={styles.iframeWraper}>
          <div
            className={`${styles.NFTWrap} ${
              nftPreviewId !== '' && styles.NFT3d
            }`}
          >
            <iframe
              style={{ backgroundImage: `url(${NFTbg})` }}
              title={nftPreviewId}
              height="100%"
              width="100%"
              src={`${PLAYER_MEDIA_URL}${nftPreviewId}`}
            />
          </div>
        </div>
      )}
      <div className={styles.Main}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            {images.map((item, idx) => {
              return (
                <CardComp
                  parentRef={scrollDiv}
                  nftId={item.id}
                  img={item.image}
                  key={idx}
                  name={item.name}
                  icon={item.icon}
                  data={getNftId}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default VideoSlider;
