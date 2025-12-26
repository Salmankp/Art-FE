import React, { useRef, useEffect, useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Button,
  Container,
} from '@material-ui/core';
import styles from '../styles/Artists/Header.module.scss';
import { SELECTED_ARTIST, SMALL_SCREEN } from '../../../utils/constants';

const BASE_URL_IMAGES =
  'https://artefy-assets.s3.ap-southeast-2.amazonaws.com/assets/images/';
const bgImage = `${BASE_URL_IMAGES}artist-page-background.png`;
interface HeaderProps {
  artistsList: any[];
  onSelectArtist: (item) => void;
}

const Header: React.FC<HeaderProps> = ({ artistsList, onSelectArtist }) => {
  const [height, setHeight] = useState(400);
  const [artists, setArtists] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedSignature, setSelectedSignature] = useState<any>(null);

  const headerRef = useRef<any>(null);

  const handleResize = () => {
    setHeight(headerRef?.current?.offsetHeight);
  };

  const getData = () => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setArtists(artistsList);
      setIsLoading(false);
      handleResize();
      clearTimeout(timer);
    }, 3000);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);
    getData();
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
    };
  }, [window]);

  const scroll = (item) => {
    const offset = 100;
    const element: any = document?.getElementById(item?.sectionId);
    const sectionTop: any = element?.getBoundingClientRect()?.top;
    const bodyTop = document?.body?.getBoundingClientRect()?.top;
    window.scrollTo({
      behavior: 'smooth',
      top: sectionTop - bodyTop - offset,
    });
  };

  const scrollToArtist = (item) => {
    setSelectedSignature(item);
    localStorage.setItem(SELECTED_ARTIST, JSON.stringify(item));

    if (window.innerWidth < SMALL_SCREEN) {
      onSelectArtist(item);
      // return;
    }

    const timer = setTimeout(() => {
      scroll(item);
      clearTimeout(timer);
    }, 100);
  };

  const renderArtistsSignatures = (artists) => {
    return (
      <Box
        className={styles.artistsSignatures}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexWrap="wrap"
      >
        {artists.map((item, i) => (
          <Box
            key={i}
            className={styles.logoItem}
            textAlign="center"
            onClick={() => scrollToArtist(item)}
          >
            <img
              className={styles.logo}
              src={item?.signatureUrlWhite || item?.signatureUrl}
            />
            <Typography className={styles.logoTitle}>
              {`${item?.firstName} ${item?.lastName}`}
            </Typography>
            {item?.id === selectedSignature?.id && (
              <Box className={styles.activeItem} />
            )}
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <>
      <Box className={styles.border} />
      <Box
        className={styles.header}
        style={{ backgroundImage: `url(${bgImage})`, height }}
      >
        <Box
          className={styles.overlay}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Container className={styles.overlayContainer}>
            <div ref={headerRef} className={styles.overlayContent}>
              {isLoading && (
                <Box
                  className={styles.loaderWrap}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <CircularProgress />
                </Box>
              )}
              {!isLoading && (
                <>
                  <Box>
                    <Box className={styles.headingsWrap} textAlign="center">
                      <Typography
                        component="h4"
                        variant="h4"
                        className={styles.heading}
                      >
                        Licensed Digital Artwork from the Masters of Fantasy,
                        Sci-Fi & Horror
                      </Typography>
                      <Typography className={styles.subHeading}>
                        EverScapes brings you the greatest fantasy, sci-fi and
                        horror artists of all time. These are the guys and girls
                        that have defined the space and continue to set new
                        standards.
                      </Typography>
                      <Typography className={styles.subHeading}>
                        Discover a selection of our launch artists below with
                        new masters to be announced regularly. Watch this space!
                      </Typography>
                    </Box>
                    <Button className={styles.infoAboutActionBtn}>
                      Tap the names to load artist profile
                    </Button>
                  </Box>
                  {artists &&
                    artists?.length > 0 &&
                    renderArtistsSignatures(artists)}
                </>
              )}
            </div>
          </Container>
        </Box>
      </Box>
      <Box className={styles.border} />
    </>
  );
};

export default Header;
