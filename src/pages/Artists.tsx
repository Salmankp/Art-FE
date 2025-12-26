import React, { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import TopBar from './components/Everscapes/TopBar';
import MainNavbar from './components/Navbar/MainNav';
import Header from './components/Artists/Header';
import ArtistDetails from './components/Artists/ArtistDetails';
import Footer from './components/Everscapes/Footer';
import { Artists } from './components/Artists/ArtistsData';
import { SELECTED_ARTIST, SMALL_SCREEN } from '../utils/constants';

const Artist: React.FC = () => {
  const [artists, setArtists] = useState<any>(null);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);

  const handleWindowResize = () => {
    if (Artists.length === 0) return;

    if (window.innerWidth < SMALL_SCREEN) {
      if (selectedArtist) {
        setArtists([selectedArtist]);
        return;
      }

      const artist = JSON.parse(localStorage.getItem(SELECTED_ARTIST) as any);
      if (artist) {
        setArtists([artist]);
        return;
      }

      setArtists([Artists[0]]);
      return;
    }
    setArtists(Artists);
  };

  useEffect(() => {
    setArtists(Artists);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('load', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('load', handleWindowResize);
    };
  }, [window]);

  const handleSelectArtist = (item) => {
    setSelectedArtist(item);
    setArtists(Artists.filter((artist) => artist?.id === item?.id));
  };

  return (
    <>
      <TopBar />
      <MainNavbar />
      <Box className="bg-black">
        {artists && artists?.length > 0 && (
          <>
            <Header artistsList={Artists} onSelectArtist={handleSelectArtist} />
            <Container>
              {artists?.map((item, i) => (
                <ArtistDetails id={item?.sectionId} key={i} artist={item} />
              ))}
              <br />
              <br />
            </Container>
          </>
        )}
        {artists && artists?.length === 0 && (
          <Box
            className="no-record-msg margin-block-10rem"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Artists don't exists!</Typography>
          </Box>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default Artist;
