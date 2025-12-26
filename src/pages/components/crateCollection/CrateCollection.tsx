import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import { styled } from '@material-ui/styles';
import { groupBy } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CratesAPI } from '../../../api/cratesApi';
import { removeAllTrailingSlashes } from '../../../utils/helper';
import CrateInformation from './CrateInformation';
import PaintingCard from './PaintingCard';
import RarityHeader from './RarityHeader';
import Banner from './Banner';
import Piece from '../RiseCrate/Piece';
import Galleries from '../RiseCrate/Galleries';
import styles from '../styles/RiseCrate/Piece.module.scss';
import RevealLootDialog from './RevealLootDialog';
import stylesHeading from '../styles/CrateCollection/CrateCollection.module.scss';
import { useAppSelector } from '../../../redux/hooks';
import getOwnedPaintings from './helpers/GetOwnedPaintings';

const StyledBoxContainer = styled(Box)({
  background: 'linear-gradient(180deg, #181818 0%, #111111 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '400px',
  justifyContent: 'center',
});

/**
 * TODO: make the crate container id dynamic when a crate containers page is implemented.
 */

const CrateCollection: React.FC = () => {
  const history = useHistory();

  const [crateData, setCrateData] = useState<any>();
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  const loadCrateData = async (slug) => {
    setDataLoading(true);
    const crateData = await CratesAPI.getCrateContainer(slug);
    setCrateData(crateData);
    setDataLoading(false);
  };

  const userPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );
  useEffect(() => {
    const slug = removeAllTrailingSlashes(location.pathname);

    if (slug) {
      loadCrateData(slug);
    }
  }, [location.pathname]);

  // data error state
  // memo for the paintings grouped by rarity
  const groupedPaintings = useMemo(() => {
    if (crateData?.lootCrateContainer?.paintings) {
      return groupBy(crateData?.lootCrateContainer?.paintings, 'rarity');
    }
  }, [crateData?.lootCrateContainer?.paintings]);

  // memo for the number of paintings in this container the user owns
  const artistsNames: Array<any> | undefined = useMemo(() => {
    const paintingArtists = crateData?.lootCrateContainer?.paintings.map(
      (painting) => painting.artists.name,
    );
    return paintingArtists;
  }, [crateData?.lootCrateContainer?.paintings]);
  const [showRevealModal, setShowRevealModal] = useState<boolean>(false);
  const [modalMints, setModalMints] = useState<Mint[] | undefined>();
  const showRevealModalHandler = (show, mints) => {
    setShowRevealModal(show);
    setModalMints(mints);
  };

  return (
    <>
      {showRevealModal && modalMints && (
        <RevealLootDialog
          isOpen={showRevealModal}
          handleClose={() => {
            setShowRevealModal(false);
          }}
          openedMints={modalMints}
        />
      )}
      <Banner
        crateData={crateData}
        isLoading={dataLoading}
        showRevealModalHandler={showRevealModalHandler}
      />
      <CrateInformation
        showRevealModalHandler={showRevealModalHandler}
        crateData={crateData}
        isLoading={dataLoading}
        artists={artistsNames}
        groupedPaintings={groupedPaintings}
        name={crateData?.lootCrateContainer?.name}
        description={crateData?.lootCrateContainer?.description}
        numOfTotalCollectables={crateData?.lootCrateContainer?.totalCrates}
        backgroundImage={crateData?.lootCrateContainer?.backgroundImage}
        numOfCollectedCrates={
          crateData?.lootCrateContainer?.totalCrates -
          crateData?.lootCrateContainer?.availableCrates
        }
      />

      <Piece />
      <StyledBoxContainer className={stylesHeading.boxContainer}>
        {dataLoading ? (
          <StyledBoxContainer>
            <CircularProgress />
          </StyledBoxContainer>
        ) : (
          <>
            <h1 className={stylesHeading.headText}>
              DISCOVER THE COMPLETE COLLECTION
            </h1>

            <div
              className={styles.collectedWrap}
              style={{
                border: '1px #61BB07 solid',
                borderRadius: '2rem',
                padding: '0.4rem 2rem',
                color: '#61BB07',
                fontSize: '24px',
              }}
            >
              <span
                style={{
                  color: '#61BB07',
                  fontWeight: 'bold',
                  fontSize: '24px',
                }}
              >
                {`${
                  crateData?.lootCrateContainer?.paintings?.length &&
                  userPaintings?.paintings &&
                  crateData?.lootCrateContainer?.paintings.filter((x) =>
                    userPaintings?.paintings.some(
                      (z) => z.paintingID.name === x.name,
                    ),
                  )?.length
                } of ${crateData?.lootCrateContainer?.paintings?.length || ''}`}
              </span>
              &nbsp;collected
            </div>
            {Object.keys(groupedPaintings).map((rarity) => (
              <Box
                key={rarity}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <RarityHeader
                  rarity={rarity}
                  length={groupedPaintings[rarity].length}
                />
                <Grid container justifyContent="center" spacing={2}>
                  {groupedPaintings[rarity].map((painting: Painting) => (
                    <Grid key={painting._id} item>
                      <PaintingCard
                        painting={painting}
                        owned={getOwnedPaintings(
                          painting,
                          userPaintings.paintings,
                        )}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ))}
          </>
        )}
      </StyledBoxContainer>
    </>
  );
};

export default CrateCollection;
