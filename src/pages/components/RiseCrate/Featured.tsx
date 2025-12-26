import Slider from 'react-slick';
import 'react-multi-carousel/lib/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import styles from '../styles/RiseCrate/Featured.module.scss';
import {
  rise3,
  rise4,
  rise5,
  rise6,
  rise7,
  rise8,
  circle1,
  circle2,
  circle3,
  circle4,
  RiseGif,
  HankEditionGif,
} from '../../../assets/index';

const images = [
  {
    name1: 'Heavy Metal',
    name: 'Cover',
    name2: 'The Rise',
    image: RiseGif,
  },
  {
    name1: 'Heavy Metal',
    name: 'Cover - Hank Edition',
    name2: 'The Rise',
    image: HankEditionGif,
  },
  {
    name1: 'Heavy Metal',
    name: 'Night of the Living Dead Tribute',
    name2: 'The Rise',
    image: rise3,
  },
  {
    name1: 'Heavy Metal',
    name: 'The Body Dies Slow Motion Comics',
    name2: 'The Rise',
    image: rise4,
  },
  {
    name1: 'Heavy Metal',
    name: 'From Fear to Rage Motion Comics',
    name2: 'The Rise',
    image: rise5,
  },
  {
    name1: 'Heavy Metal',
    name: 'Future Visions',
    name2: 'The Rise',
    image: rise6,
  },
  {
    name1: 'Heavy Metal',
    name: 'The Rise Origins',
    name2: 'The Rise',
    image: rise7,
  },
  {
    name1: 'Heavy Metal',
    name: 'Roughs',
    name2: 'The Rise',
    image: rise8,
  },
];

const CardComp: React.FC<{
  img: string;
  name: string;
  name1: string;
  name2: string;
}> = ({ img, name, name1, name2 }) => {
  return (
    <div className={styles.CardItem}>
      <div className={styles.imgBgEffect}>
        <img src={img} alt="img" />
      </div>
      <div className={styles.cardText}>
        <span className={styles.first}>{name1}</span>
        <h1 className={styles.text}>{name}</h1>
        <span className={styles.first}>{name2}</span>
      </div>
    </div>
  );
};

const Featured: React.FC = () => {
  const [currSlide, setCurrSlide] = useState(0);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    cssEase: 'linear',
    pauseOnHover: true,
    swipeToSlide: true,
    touchThreshold: 100,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
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
    <div className={styles.Featured}>
      <Container className={styles.Main}>
        <div className={styles.carouselContainer}>
          <Slider {...settings}>
            {images.map((item, idx) => {
              return (
                <CardComp
                  img={item.image}
                  key={idx}
                  name={item.name}
                  name1={item.name1}
                  name2={item.name2}
                />
              );
            })}
          </Slider>
        </div>
        <div className={styles.secondMain}>
          <div className={styles.redBgEffect}>
            <img src={circle1} className={styles.bgimg} />
            <div className={styles.circleText}>
              <span className={styles.circleFirst}>Heavy Metal</span>
              <h1 className={styles.circleSecond}>
                SERUM
                <br />
                INJECTOR
              </h1>
              <span className={styles.circleThird}>The Rise</span>
            </div>
          </div>
          <div className={styles.redBgEffect}>
            <img src={circle2} className={styles.bgimg2} />
            <div className={styles.circleText2}>
              <span className={styles.circleFirst}>Heavy Metal</span>
              <h1 className={styles.circleSecond}>
                ZOMBIE
                <br />
                APE
              </h1>
              <span className={styles.circleThird}>The Rise</span>
            </div>
          </div>
          <div className={styles.redBgEffect}>
            <img src={circle3} className={styles.bgimg3} />
            <div className={styles.circleText3}>
              <span className={styles.circleFirst}>Heavy Metal</span>
              <h1 className={styles.circleSecond}>
                HAITIAN
                <br />
                PRIEST
                <br />
                SKULL
                <br />
                VESSEL
              </h1>
              <span className={styles.circleThird}>The Rise</span>
            </div>
          </div>
          <div className={styles.redBgEffect}>
            <img src={circle4} className={styles.bgimg4} />
            <div className={styles.circleText4}>
              <span className={styles.circleFirst}>Heavy Metal</span>
              <h1 className={styles.circleSecond}>ZOMBIE</h1>
              <span className={styles.circleThird}>The Rise</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Featured;
