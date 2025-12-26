import React, { Fragment, useState } from 'react';

import { useHistory } from 'react-router-dom';
import styles from '../styles/Everscapes/Navbar.module.scss';
import { everscapesText, logoNew, discordicn } from '../../../assets/index';
import Sidebar from './Sidebar';
import MenuItems from './constants/MenuItem';
// import MenuItem from './MenuItemsInterface';

const NavbarDropdown: React.FC = (item: any) => {
  return (
    <div className={styles.submenu}>
      {item?.subMenuItem && (
        <ul>
          {item?.subMenuItem?.map((subItem) => {
            return (
              <li>
                {subItem?.window && (
                  <a
                    href={subItem.href}
                    target="_blank"
                    className={styles.navLink}
                    rel="noreferrer"
                  >
                    {subItem?.displayName}
                    {subItem?.icon && <img src={discordicn} />}
                  </a>
                )}
                {!subItem?.window && (
                  <a className={styles.navLink} href={subItem?.href || '#'}>
                    {subItem?.displayName}
                    {subItem?.icon && <img src={discordicn} />}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

interface NavBarProps {
  setStage?: (string) => void;
}

const Navbar: React.FC<NavBarProps> = ({ setStage }: NavBarProps) => {
  const history = useHistory();
  const [isLogin] = useState<any>(localStorage.getItem('authToken'));

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.Main}>
          <div className={styles.topData}>
            <div className={styles.flexWrapper}>
              <div className={styles.leftContainer}>
                <a href="/">
                  <img
                    src={logoNew}
                    alt="artefy-beta"
                    className={styles.artefyBeta}
                  />
                </a>
                <div className={styles.verticalLine} />
                <div className={styles.mobileNav}>
                  <Sidebar />
                </div>
                <div className={styles.headerTextContainer}>
                  <a href="/everscapes">
                    <img
                      className={styles.headerText}
                      src={everscapesText}
                      alt="everscapes-text-header"
                    />
                  </a>
                  <div className={styles.borderBottom} />
                </div>
              </div>
              <div className={styles.mobileNav}>
                {isLogin ? (
                  <button
                    className={styles.registerButton}
                    onClick={() => {
                      history.push('/dashboard');
                    }}
                  >
                    My Dashboard
                  </button>
                ) : (
                  <>
                    <button
                      className={styles.registerButton}
                      onClick={() => {
                        setStage && setStage('register');
                        history.push('/auth#register');
                      }}
                    >
                      Join Now
                    </button>
                    <button
                      className={styles.registerButton}
                      onClick={() => {
                        setStage && setStage('login');
                        history.push('/auth#login');
                      }}
                    >
                      Login
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className={styles.rightContainer}>
              {MenuItems.map((item: any) => {
                // MenuItem.length - 2 is to remove loginRegister from desktop view untill responsive issue resolved
                return (
                  <>
                    {item?.href && (
                      <a
                        className={styles.registerText}
                        href={item?.href || ''}
                      >
                        {item?.displayName}
                        {NavbarDropdown(item)}
                      </a>
                    )}
                    {!item?.href && (
                      <span className={styles.registerText}>
                        {item?.displayName}
                        {NavbarDropdown(item)}
                      </span>
                    )}
                  </>
                );
              })}

              {isLogin ? (
                <button
                  className={styles.registerButton}
                  onClick={() => {
                    history.push('/dashboard');
                  }}
                >
                  My Dashboard
                </button>
              ) : (
                <>
                  <button
                    className={styles.registerButton}
                    onClick={() => {
                      setStage && setStage('register');
                      history.push('/auth#register');
                    }}
                  >
                    Join Now
                  </button>
                  <button
                    className={styles.registerButton}
                    onClick={() => {
                      setStage && setStage('login');
                      history.push('/auth#login');
                    }}
                  >
                    Log In
                  </button>
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
