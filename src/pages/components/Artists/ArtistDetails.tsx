import React, { useState } from 'react';
import { Typography, Box, Button } from '@material-ui/core';
import NftIframe from 'pages/components/common/NftIframe';
import styles from 'pages/components/styles/Artists/ArtistDetails.module.scss';

const BASE_URL_IMAGES =
  'https://artefy-assets.s3.ap-southeast-2.amazonaws.com/assets/images/';
const BASE_URL_ICONS =
  'https://artefy-assets.s3.ap-southeast-2.amazonaws.com/assets/icons/';

const ArtistDetailsBackground = `${BASE_URL_IMAGES}artist-details-background.png`;
const imageNotAvailable = `${BASE_URL_ICONS}image-not-available.png`;
interface ArtistDetailsProps {
  id: string;
  artist: any;
}

const ArtistDetails: React.FC<ArtistDetailsProps> = ({ artist, id }) => {
  const [selectedNFT, setSelectedNFT] = useState<any>(null);

  const firstName = artist?.firstName || '';
  const lastName = artist?.lastName || '';
  const artistFullName = `${firstName} ${lastName}`;
  const description = artist?.description || '';
  const logo = artist?.logo || '';
  const artistProfileUrl = artist?.artistImage || '';
  const artistSignatureUrl = artist?.signatureUrl || '';
  const default3dViewImage = artist?.defaultImage || imageNotAvailable;
  const moreNfts = artist?.moreNFTs || [];

  const renderNFTs = (moreNfts) => {
    return (
      <Box
        className={styles.moreNfts}
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
      >
        {moreNfts.map((item, i) => (
          <Box
            className={styles.nft}
            key={i}
            textAlign="center"
            onClick={() => setSelectedNFT(item)}
          >
            <Typography className={styles.nftName}>{item.name}</Typography>
            <img className={styles.nftImage} src={item.url} />
          </Box>
        ))}
      </Box>
    );
  };

  const renderDefaultNFTView = () => {
    return (
      <Box
        className={styles.nftViewContainer}
        style={{ background: `url(${ArtistDetailsBackground})` }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography className={styles.nftLoadTitle} component="h4" variant="h4">
          Click to load the 3D NFT
        </Typography>
        <img className={styles.nftDefaultImage} src={default3dViewImage} />
      </Box>
    );
  };

  const render3dNFTView = (paintingId) => {
    return (
      <Box
        className={styles.nft3dViewContainer}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <NftIframe paintingId={paintingId || '616cee5f0e75020014314160'} />
      </Box>
    );
  };

  return (
    <Box id={id} className={styles.artistBox} display="flex">
      <Box className={styles.leftContent}>
        <Box className={styles.nameWrapper} display="flex">
          <Typography className={styles.artistName} component="h5" variant="h5">
            {firstName}
            {firstName && <br />}
            <b>{lastName}</b>
          </Typography>
          {logo && <img className={styles.logo} src={logo} />}
        </Box>

        {artistProfileUrl && (
          <img className={styles.artistProfileImage} src={artistProfileUrl} />
        )}

        <Box className={styles.images} textAlign="center">
          <img className={styles.artistSignature} src={artistSignatureUrl} />
        </Box>

        <Typography
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Box>

      <Box className={styles.rightContent}>
        <Box
          className={styles.containerAndMoreNFTsWrap}
          display="flex"
          flexDirection="column"
        >
          {!selectedNFT && renderDefaultNFTView()}
          {selectedNFT && render3dNFTView(selectedNFT?.paintingId)}
          {renderNFTs(moreNfts)}
        </Box>

        <Button className={styles.viewMoreBtn}>
          {`View more of ${artistFullName} on the Marketplace`}
        </Button>
      </Box>
    </Box>
  );
};

export default ArtistDetails;
