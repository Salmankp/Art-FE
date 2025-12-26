import React, { useState } from 'react';
import Slider from 'react-slick';
import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import styles from '../styles/Everscapes/Featured.module.scss';

import {
  featured1,
  featured2,
  featured3,
  greg,
  dropnewbg,
} from '../../../assets/index';

const images = [
  {
    name: 'Frank Frazetta',
    image: featured1,
  },
  {
    name: 'Juan Giménez',
    image: featured2,
  },
  {
    name: 'Sanjulián',
    image: featured3,
  },
  {
    name: 'Greg Hildebrandt',
    image: greg,
  },
];

const CardComp: React.FC<{ img: string; name: string }> = ({ img, name }) => {
  return (
    <div className={styles.CardItem}>
      <img src={img} alt="img" />
      <h1 className={styles.text}>{name}</h1>
    </div>
  );
};

const Featured: React.FC = () => {
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
  return (
    <>
      <div className={styles.border} />
      <div className={styles.imgOverlayWrap}>
        <div>
          <img className={styles.featurebg} src={dropnewbg} />
        </div>
        <div className={styles.overlayNew} />
        <div className={styles.textWrapper}>
          <div className={styles.overlayHeading}>
            Featured
            <span className={styles.creatorText}>Creators</span>
          </div>
          <div className={styles.overlayDesc}>
            AUTHENTIC LICENSED NFTS FROM THE MASTERS OF FANTASY, SCI FI & HORROR
          </div>
        </div>
      </div>
      <div className={styles.Featured}>
        <div className={styles.Main}>
          <div className={styles.carouselContainer}>
            <Slider {...settings}>
              {images.map((item, idx) => {
                return <CardComp img={item.image} key={idx} name={item.name} />;
              })}
            </Slider>
          </div>
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Featured;
