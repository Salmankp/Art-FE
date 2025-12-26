import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Box } from '@material-ui/core';
import styles from '../styles/DropNew/PlatinumEdition.module.scss';
import { Platinumtextimg, cornerplatinum } from '../../../assets';
// import scifibattlestar from '../../../assets/images/fantasytwoimg.png';

const CornerArtPlatinumEdition: React.FC = () => {
  const history = useHistory();
  return (
    <div className={styles.platinumSection}>
      <Container className={styles.platinumContainer}>
        <Box className={styles.platinumWrapper}>
          <div className={styles.leftWrap}>
            <div className={styles.platinumText}>
              <span className={styles.colorSpan}>Hidden 1 of 1</span>
              Platinum Edition
              <br />
              <span className={styles.colorSpan}>in every drop</span>
            </div>
            <div className={styles.platinumDesc}>
              Each EverScapes Platinum release is a rare 1-of-1 edition within
              each drop that features the same art with a very cool twist.
              <br />
              <br />
              For your chance to score one, simply make a purchase during a
              drop, and if your edition number matches the number announced on
              the drop page – it’s yours!
            </div>
            <div className={styles.textImg}>
              <img src={Platinumtextimg} className={styles.platinumtextimg} />
            </div>
          </div>
          <div className={styles.platinumRightImg}>
            <img src={cornerplatinum} className={styles.oneOfOne} />
          </div>
        </Box>
      </Container>
    </div>
  );
};

export default CornerArtPlatinumEdition;
