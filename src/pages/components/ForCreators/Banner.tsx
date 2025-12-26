import React, { useState } from 'react';
import Slider from 'react-slick';
import Hidden from '@material-ui/core/Hidden';
import classes from '../styles/ForCreators/Banner.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  artefyBeta,
  featured1,
  featured2,
  featured3,
  featured4,
  featured5,
  featured9,
  featured6,
  featured8,
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
    name: 'Heavy Metal',
    image: featured4,
  },
  {
    name: 'Anna Podedworna',
    image: featured5,
  },
  {
    name: 'Richard Hescox',
    image: featured9,
  },
  {
    name: 'Sven Sauer',
    image: featured8,
  },
  {
    name: 'Ciruelo',
    image: featured6,
  },
];

const CardComp: React.FC<{ img: string; name: string }> = ({ img, name }) => {
  return (
    <div className={classes.CardItem}>
      <img src={img} alt="img" />
      <p className={classes.text}>{name}</p>
    </div>
  );
};

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 1.25,
    cssEase: 'linear',
    pauseOnHover: true,
    swipeToSlide: true,
    touchThreshold: 100,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2500,
    beforeChange: (prev, next) => {
      setCurrentSlide(next);
    },
    customPaging: (i) => (
      <div
        className={i === currentSlide ? classes.activeDots : classes.customDots}
      />
    ),
  };

  return (
    <div className={classes.bannerContainer}>
      <Hidden mdDown>
        <div className={classes.logoTitle}>
          <img src={artefyBeta} alt="artefy-beta" />
          <p>for creators</p>
        </div>
      </Hidden>
      <div className={classes.banner}>
        <div className={classes.mobileContent}>
          <div className={classes.logoTitle}>
            <img src={artefyBeta} alt="artefy-beta" />
            <p>for creators</p>
          </div>
          <p className={classes.content}>
            We work with the worlds most exciting artists.
            <br />
            <br />
            This is a strictly invitational platform however we are always
            looking for new artists to join the platform.
            <br />
            <br />
            If you would like to send us through a sample of your work please
            fill out the following form and our team will get in touch with you.
          </p>
        </div>
        <div className={classes.info}>
          <h4>Artists and Artefy</h4>
          <p>
            We’re connecting the world’s most incredible and creative artists to
            collectors and art lovers around the world. We’re making art more
            accessible to more people and giving artists new ways to connect
            with exisiting fans and display their art as well as opening up
            alternate revenue streams and fan bases.
            <br />
            <br />
            Artefy is far more than just a fancy e-commerce site. We work
            collaboratively with all our artist partners from the process of
            bringing your work into the platform to finding the right audiences,
            promotions, virtual galleries and more to connect you with new and
            existing fans all over the world. Artefy is about a constant
            connection with people not one off transactions.
          </p>
        </div>
        <div className={classes.info}>
          <h4>The Worlds of Artefy</h4>
          <p>
            Digital collectables are as varied as the passions, lifestyles and
            hobbies from which they come. All of the art and collectables on the
            Artefy platform are separated into different worlds by their focus,
            theme or subject matter. We want everybody to be easily able to find
            works, artists and communities that relate to them. This is
            extreemly beneficial for our artists as well because you know that
            your work is being placed directly in front of people who are
            already passionate about your art. To put it simply, One Account,
            Endless Possibilities.
            <br />
            <br />
            There are many worlds of Artefy still to come but for now:
          </p>
          <div className={classes.list}>
            <p>
              <span>EverScapes: </span>
              The home of Fantasy, Sci-fi and Horror
            </p>
            <p>
              <span>Classick.Club: </span>
              Music collectables done differently
            </p>
            <p>
              <span>Visions: </span>
              Contemporary digital art at your fingerprints
            </p>
            <p>
              <span>Stadium: </span>
              Unique sports memorabilia and collectables
            </p>
          </div>
        </div>
        <div className={classes.info}>
          <h4>Join Artefy</h4>
          <p>
            We have an incredible roster of artists who are committed to the
            platform however, we are always looking to partner with new artists.
            We’re not ashamed to say that we are very selective about who we
            work with but there’s no minimum requirements, no social metrics or
            sales numbers. We simply want to display the world’s best art. If
            you feel that your creations would fit within the worlds of Artefy,
            get in touch.
          </p>
        </div>
        <h4 className={classes.sectionTitle}>Selected Artefy Creators</h4>
        <div className={classes.carouselContainer}>
          <Slider {...settings}>
            {images.map((item, idx) => {
              return <CardComp img={item.image} key={idx} name={item.name} />;
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
