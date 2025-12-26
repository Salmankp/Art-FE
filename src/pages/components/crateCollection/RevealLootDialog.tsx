import { css, Global } from '@emotion/react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  styled,
  Typography,
} from '@material-ui/core';
import { useAppDispatch } from 'redux/hooks';
import { SuccessStateActions } from 'redux/slices/SuccessState';
import CloseIcon from '@material-ui/icons/Close';
import React, { useState, useRef } from 'react';
import Carousel from 'react-material-ui-carousel';
import ReactPlayer from 'react-player';
import logo from './helpers/GetRarityLogo';
import { NftIframe } from '../NFTSolo/NFT';
import { RiseCrateRevealVideo, playButton } from '../../../assets/index';
import styles from '../styles/CrateCollection/RevealLoot.module.scss';

const HBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const Text = styled(Typography)({
  color: 'white',
});

const LootContainer = styled(Box)({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  padding: '50px 100px',
  minWidth: '500px',
});

const StyledIFrame = styled('iframe')({
  height: '40vh',
  minHeight: '300px',
  width: '50%',
  minWidth: '500px',
  margin: '20px 0px',
});

const StyledReactPlayer = styled(ReactPlayer)({
  backgroundColor: 'black',
  minHeight: '300px',
  minWidth: '500px',
  margin: '20px 0px',
});

const StyledImg = styled('img')({
  backgroundColor: 'black',
  height: '40vh',
  minHeight: '300px',
  width: '50%',
  minWidth: '500px',
  margin: '20px 0px',
  objectFit: 'contain',
});

const StyledCloseIconButton = styled(IconButton)({
  backgroundColor: 'rgb(73, 73, 73)',
  position: 'absolute',
  top: '0px',
  right: '0px',
  '&:hover': {
    backgroundColor: 'black',
    opacity: 0.6,
  },
});

interface RevealLootDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  openedMints: Mint[];
}

const RevealLootDialog = ({
  isOpen,
  handleClose,
  openedMints,
}: RevealLootDialogProps) => {
  const dispatch = useAppDispatch();
  // state for when the animation finishes
  const [animationFinished, setAnimationFinished] = useState(false);
  const handleAnimationFinished = () => setAnimationFinished(true);
  const [hideButton, setHideButton] = useState(false);
  const play = useRef<any>({});

  if (animationFinished) {
    dispatch(SuccessStateActions.setSuccessModal(false));
  }

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="Reveal loot dialog"
      aria-describedby="Dialog for revealing the opened NFTs"
      fullScreen={!animationFinished}
      fullWidth
      maxWidth="xl"
      PaperProps={{
        style: {
          backgroundColor: animationFinished ? '#363636' : 'black',
          alignItems: animationFinished ? 'normal' : 'center',
        },
      }}
    >
      <DialogContent>
        {console.log(animationFinished, '<<<<<')}
        {!animationFinished ? (
          <>
            <ReactPlayer
              style={{ position: 'relative' }}
              playing
              height="100%"
              width="95vw"
              onEnded={handleAnimationFinished}
              onStart={() => setHideButton(true)}
              url={RiseCrateRevealVideo}
              autoplay
              ref={play}
            />
            <button
              onClick={handleAnimationFinished}
              style={{
                backgroundColor: 'transparent',
                width: 150,
                paddingTop: 10,
                paddingBottom: 10,
                position: 'absolute',
                bottom: 100,
                right: 50,
                color: 'white',
                borderColor: 'white',
                borderWidth: 1,
              }}
            >
              Skip
            </button>
            {!hideButton && (
              <img
                onClick={() => {
                  setHideButton(true),
                    play.current && play?.current.player?.player?.play();
                }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '48%',
                  width: '80px',
                }}
                src={playButton}
                className={styles.playerIconButton}
              />
            )}
          </>
        ) : (
          <Carousel
            autoPlay={false}
            cycleNavigation={false}
            indicators={false}
            fullHeightHover={false}
            navButtonsAlwaysVisible
          >
            {openedMints.map((mint, index) => {
              const mintPainting = mint.paintingID as Painting;

              return (
                <LootContainer>
                  <Global
                    styles={css`
                      .CarouselItem {
                        overflow: auto;
                      }
                    `}
                  />
                  <HBox
                    style={{
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Box style={{ paddingRight: '100px' }}>
                      <Text noWrap>{mintPainting.artists?.name}</Text>
                      <Text style={{ fontWeight: 'bold' }} variant="h5">
                        {mint.name}
                      </Text>
                      <Text style={{ fontWeight: 'bold' }} variant="h6">
                        {mintPainting.theme.name}
                      </Text>
                      <Text variant="body2">
                        {`${mintPainting.format} | ${mintPainting.genre}`}
                      </Text>
                    </Box>
                    <Box>
                      <HBox style={{ alignItems: 'center' }}>
                        <img
                          alt="Rarity logo"
                          src={logo(mintPainting.rarity)}
                          style={{
                            height: '25px',
                            width: '25px',
                            paddingRight: '15px',
                          }}
                        />
                        <Text variant="h5">
                          {(
                            mint.paintingID as Painting
                          ).rarity.toLocaleUpperCase()}
                        </Text>
                      </HBox>
                    </Box>
                  </HBox>
                  {/* <StyledImg alt={mint.name} src={mintPainting.image} /> */}
                  <div style={{ height: 400, width: 700 }}>
                    <NftIframe paintingId={mintPainting._id} />
                  </div>
                  {index === openedMints.length - 1 && (
                    <StyledCloseIconButton size="medium" onClick={handleClose}>
                      <CloseIcon style={{ color: 'white' }} />
                    </StyledCloseIconButton>
                  )}
                </LootContainer>
              );
            })}
          </Carousel>
        )}
      </DialogContent>
      {animationFinished && <DialogActions />}
    </Dialog>
  );
};

export default RevealLootDialog;
