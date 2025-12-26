import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Container } from '@material-ui/core';
import styles from '../styles/VulcanVerse/Footer.module.scss';
import {
  franklogo,
  footerlogo1,
  footerlogo2,
  LogoVV,
} from '../../../assets/index';

const BuyNow: React.FC = () => {
  const history = useHistory();

  return (
    <div className={styles.Signup}>
      <div className={styles.innerwrap}>
        <div className={styles.innerFooter}>
          {/* <div className={styles.btnDraw}>
            <Button onClick={goToFaqs} className={styles.drawButton}>
              Visit FAQs Here
            </Button>
          </div> */}
          <div className={styles.wrriorLogo}>
            <h3>Frazetta Frenzy Silver Warrior* brought to you by</h3>
            <div className={styles.wlogo}>
              <img src={franklogo} alt="" className={styles.flogo} />
              <img src={footerlogo1} alt="" className={styles.logo1} />
              <img src={footerlogo2} alt="" className={styles.logo2} />
              <img src={LogoVV} alt="" className={styles.vlogo} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Ftlink}>
        <Container>
          <div className={styles.linkdiv}>
            {/* <Link>FAQs</Link> */}
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/medallian-terms">Terms & Conditions</Link>
            <Link to="/contactus">Contact Us</Link>
          </div>
        </Container>
      </div>
      <div className={styles.ftdescription}>
        <Container>
          <p>
            Frazetta Frenzy Silver Warrior: Starts 7:00 AM AEDT 11/11/21. Ends
            8:00 AM AEDT 19/11/21. Open to NSW, NT, QLD, TAS, VIC and WA
            residents 18+ who fulfil the entry/eligibility requirements. 333
            prizes to be won (refer to full T&Cs for complete list of prizes).
            Total prize pool is $127,000 (inc GST). Prize draw 3:00 PM AEDT
            23/11/21 at Level 2 11 York St Sydney NSW 2000. Winners notified via
            email and published at artefy.io/everscapes 16/11/21. Promoter is
            Artefy Pty Ltd. ABN 33 650 695 248. Suite 402, Level 24, Tower 2,
            101 Grafton St Bondi Junction NSW 2022. Authorised under NSW
            Authority No. TP/01421. &nbsp;
            <Link to="/medallian-terms">
              For full T&Cs refer to artefy.io/everscapes.
            </Link>
          </p>
        </Container>
      </div>
    </div>
  );
};

export default BuyNow;
