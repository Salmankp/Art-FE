import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';
import styles from '../styles/Everscapes/Navbar.module.scss';
import { everscapesText, logoNew, discordicn } from '../../../assets/index';
import Sidebar from '../Navbar/Sidebar';

import { ContextIDS } from '../../../contexts/GlobalContext';

const Navbar: React.FC = () => {
  const history = useHistory();
  const data1 = useContext(ContextIDS);
  const [isLogin] = useState<any>(localStorage.getItem('authToken'));

  const pushEverscapes = () =>
    history.push(`/everscapes?worldId=${data1?.worldId()}`);

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.Main}>
          <div className={styles.topData}>
            <div className={styles.mobileNav}>
              <Sidebar />
            </div>
            <div className={styles.leftContainer}>
              <img
                src={logoNew}
                alt="artefy-beta"
                className={styles.artefyBeta}
                onClick={() => history.push('/')}
              />
              <div className={styles.verticalLine} />
              <div className={styles.headerTextContainer}>
                <img
                  className={styles.headerText}
                  src={everscapesText}
                  alt="everscapes-text-header"
                  onClick={() => history.push('/everscapes')}
                />
                <div className={styles.borderBottom} />
              </div>
            </div>

            <div className={styles.rightContainer}>
              <p className={styles.registerText}>
                Drops
                <div className={styles.submenu}>
                  <ul>
                    <li onClick={() => history.push('/drop/heavy-metal-mas')}>
                      <span>Heavy Metal Mas</span>
                    </li>
                    <li onClick={() => history.push('/drop/greg-hildebrandt')}>
                      <span>Greg Hildebrandt Drop</span>
                    </li>
                  </ul>
                </div>
              </p>
              <p
                className={styles.registerText}
                onClick={() => history.push('/crate/loot-rise')}
              >
                Rise Crates
                {/* <div className={styles.submenu}>
                  <ul>
                    <li onClick={() => history.push('/crate/loot-rise')}>
                      <span> Corner4Art Drop</span>
                    </li>
                    <li onClick={() => history.push('/rise-crate')}>
                      <span>Rise Crate Drop</span>
                    </li>
                  </ul>
                </div> */}
              </p>
              {/* <p
                className={styles.registerText}
                onClick={() => history.push('/vulcan-verse')}
              >
                Silver Warrior
              </p> */}
              <p
                className={styles.registerText}
                onClick={() => history.push('/master-galleries')}
              >
                Galleries
              </p>
              <p
                className={styles.registerText}
                onClick={() => history.push('/marketplace')}
              >
                Marketplace
              </p>
              <p
                className={styles.registerText}
                onClick={() => history.push('/artists-master')}
              >
                Artists
              </p>
              <p className={styles.registerText}>
                Community
                <div className={styles.submenu}>
                  <ul>
                    <li
                      onClick={() =>
                        window.open(
                          'https://discord.com/invite/WvsK5nwAxV',
                          '_blank',
                        )
                      }
                    >
                      <span>
                        Join Discord
                        <img src={discordicn} alt="dscord" />
                      </span>
                    </li>
                    <li onClick={() => history.push('/contactus')}>
                      <span>Contact Us</span>
                    </li>
                    <li onClick={() => history.push('/faq')}>
                      <span>FAQs</span>
                    </li>
                    <li onClick={() => history.push('/greennft')}>
                      <span>Guide Green NFTs</span>
                    </li>
                  </ul>
                </div>
              </p>
              {!isLogin && (
                <>
                  <p
                    className={styles.registerText}
                    onClick={() => history.push('/auth#register')}
                  >
                    <b>Login/Register</b>
                  </p>
                </>
              )}
              {isLogin && (
                <>
                  <div className={styles.divider} />
                  <p
                    className={styles.registerText}
                    onClick={() => history.push('/dashboard')}
                  >
                    Dashboard
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Navbar;
