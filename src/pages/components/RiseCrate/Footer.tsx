import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import {
  paperPlane,
  discordicn,
  footerlogo1,
  footerlogo2,
  circularbtn,
  twittericn,
  instaicn,
} from '../../../assets';
import styles from '../styles/RiseCrate/Footer.module.scss';
import { checkOnlyEmail } from '../../../utils/validate';
import { UserAPI } from '../../../api/user';
import { success } from '../../../utils/toast';

const Footer: React.FC = () => {
  const navigate = (link: string) => {
    window.open(link, '_blank');
  };

  const history = useHistory();
  const [userEmailAddress, setUserEmailAddress] = useState<any>('');
  const subscribeNewsletters = async () => {
    if (!checkOnlyEmail(userEmailAddress)) return;

    const res = await UserAPI.getSubscription(userEmailAddress);
    if (res?.success) {
      success(res?.data?.message);
      setUserEmailAddress('');
    }
  };
  return (
    <div className={styles.outerwrap}>
      <div className={styles.wrap}>
        <div className={styles.logowrap}>
          <div className={styles.innerlogowrap}>
            <img
              className={styles.logo1}
              src={footerlogo1}
              alt="logo"
              onClick={() => history.push('/')}
            />
            <div className={styles.divider} />
            <img
              className={styles.logo2}
              src={footerlogo2}
              alt="logo"
              onClick={() => history.push('/everscapes')}
            />
          </div>
        </div>
        {/* <div className={styles.menuwrap}>
          <div className={styles.menuheader}>Quick Links</div>
          <ul>
            <li onClick={() => history.push('/marketplace')}>Marketplace</li>
            <li onClick={() => history.push('/drop-master')}>Drops</li>
            <li onClick={() => history.push('/artists-master')}>Artists</li>
            <li onClick={() => history.push('/collections-master')}>
              Collections
            </li>
            <li onClick={() => history.push('/crate-master')}>Crates</li>
            <li onClick={() => history.push('/galleries-master')}>Galleries</li>
          </ul>
        </div> */}
        <div className={styles.menuwrap}>
          <div className={styles.menuheader}>Artefy</div>
          <ul>
            <li onClick={() => history.push('/')}>Home</li>
            <li onClick={() => history.push('/faq')}>FAQs</li>
            <li onClick={() => history.push('/greennft')}>Green NFTs</li>
            <li onClick={() => history.push('/terms')}>Terms & Conditions</li>
            <li onClick={() => history.push('/privacy')}>Privacy Policy</li>
          </ul>
        </div>
        {/* <div className={styles.menuwrap}>
          <div className={styles.menuheader}>Artists</div>
          <ul>
            <li onClick={() => history.push('/for-creators')}>
              Artefy for creators
            </li>
          </ul>
        </div> */}
        <div className={styles.menuwrap}>
          <div className={styles.menuheader}>Contact </div>
          <ul>
            <li onClick={() => history.push('/contactus')}>Contact Us</li>
          </ul>
        </div>
        <div className={styles.menuwrap}>
          <div className={styles.menuheader}>Account</div>
          <ul>
            <li
              onClick={() => {
                history.push('/auth#login');
                window.scrollTo(0, 0);
              }}
            >
              Login
            </li>
            <li
              onClick={() => {
                history.push('/auth#register');
                window.scrollTo(0, 0);
              }}
            >
              Register
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.wrap2}>
        <div className={styles.newsletter}>
          <div className={styles.hdng}>Stay connected</div>
          <div className={styles.inputContainer}>
            <input
              placeholder="Enter your email."
              type="email"
              name="email"
              className="email"
              // id="mce-EMAIL"
              required
              onChange={(e) => setUserEmailAddress(e.target.value)}
            />
            <button
              type="submit"
              name="subscribe"
              id="mc-embedded-subscribe"
              onClick={subscribeNewsletters}
            >
              <img src={circularbtn} alt="cir-btn" />
            </button>
          </div>
        </div>
        <div className={styles.txt}>
          <div className={styles.content}>
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating Artefy.
          </div>
        </div>
        <div className={styles.social}>
          <div className={styles.socialwrap}>
            <div className={styles.socialheading}>Follow Us</div>
            <ul>
              <li
                onClick={() =>
                  window.open('https://discord.com/invite/WvsK5nwAxV', '_blank')
                }
              >
                <img src={discordicn} alt="icon" />
              </li>
              <li
                onClick={() => {
                  window.open('https://t.me/artefy_official', '_blank');
                }}
              >
                <img src={paperPlane} alt="icon" />
              </li>
              <li
                onClick={() => {
                  window.open('https://twitter.com/ArtefyOfficial', '_blank');
                }}
              >
                <img src={twittericn} alt="icon" />
              </li>
              <li
                onClick={() => {
                  window.open('https://www.instagram.com/artefy.io/', '_blank');
                }}
              >
                <img src={instaicn} alt="icon" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyrightcontent}>
        2022 Artefy Pty Ltd - All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
