import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { useHistory } from 'react-router-dom';
import styles from '../styles/Everscapes/Carousel.module.scss';
import {
  newbg,
  riseevermobile,
  everscapesCauroselInfinite,
  everscapesCarousel3,
  everscapesCarouselLarry,
  mobileCarousel2,
  mobileCarousel3,
  mobileCarouselElmore,
  valentineCarouselLive,
  exploringCarouselLive,
  dropheavy,
} from '../../../assets/index';

const Images = [
  // {
  //   img: newbg,
  //   route: '/crate/loot-rise',
  // },
  {
    img: everscapesCauroselInfinite,
    route: '/drop/infinite-worlds',
  },
  {
    img: everscapesCarousel3,
    route: '/marketplace',
  },
  {
    img: everscapesCarouselLarry,
    route: '/drop/larry-elmore',
  },

  {
    img: dropheavy,
    route: '/drop/larry-elmore',
  },
  {
    img: exploringCarouselLive,
    route: '/drop/exploring-fantasy',
  },
  {
    img: valentineCarouselLive,
    route: '/drop/valentine',
  },
];

const ImagesMobile = [
  {
    img: riseevermobile,
    route: '/crate/loot-rise',
  },
  {
    img: mobileCarousel2,
    route: '/drop/infinite-worlds',
  },
  {
    img: mobileCarousel3,
    route: '/marketplace',
  },
  {
    img: mobileCarouselElmore,
    route: '/drop/larry-elmore',
  },
];

const CarouselItem: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <div className={styles.CarouselContainer}>
        <Carousel
          autoPlay
          interval={4000}
          indicators={false}
          NextIcon={null}
          PrevIcon={null}
          animation="slide"
        >
          {Images.map((item, index) => (
            <img
              src={item.img}
              key={index}
              style={{
                marginTop: '-10px',
                marginBottom: '-4px',
                cursor: 'pointer',
              }}
              onClick={() => history.push(item.route)}
            />
          ))}
        </Carousel>
      </div>
      <div className={styles.mobileCarouselContainer}>
        <Carousel
          className={styles.mblslider}
          autoPlay
          interval={4000}
          indicators={false}
          NextIcon={null}
          PrevIcon={null}
          animation="slide"
        >
          {ImagesMobile.map((item, index) => (
            <img
              src={item.img}
              key={index}
              className={styles.mobilePaper}
              style={{
                marginTop: '-10px',
                marginBottom: '-4px',
                cursor: 'pointer',
              }}
              onClick={() => history.push(item.route)}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default CarouselItem;
