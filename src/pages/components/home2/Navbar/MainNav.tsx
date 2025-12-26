import React, { Fragment, useState } from 'react';

import { useHistory } from 'react-router-dom';
import styles from '../../styles/Everscapes/Navbar.module.scss';
import { everscapesText, logoNew, discordicn } from '../../../../assets/index';
import Sidebar from './Sidebar';
import MenuItems from './constants/MenuItem';
// import MenuItem from './MenuItemsInterface';

const NavbarDropdown: React.FC = (item: any) => {
  return (
    <div className={styles.submenu}>
      {item?.subMenuItem && (
        <ul>
          {item?.subMenuItem?.map((subItem, i) => {
            return (
              <li key={i}>
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

const Navbar: React.FC = () => {
  const history = useHistory();
  const [isLogin] = useState<any>(localStorage.getItem('authToken'));

  const skipIndex = isLogin ? MenuItems.length - 1 : MenuItems.length - 2;

  return (
    <>
      <div className={styles.Navbar}>
        <div className={styles.Main}>
          <div className={styles.topData}>
            <div className={styles.mobileNav}>
              <Sidebar />
            </div>
            <div className={styles.leftContainer}>
              <a href="/">
                <img
                  src={logoNew}
                  alt="artefy-beta"
                  className={styles.artefyBeta}
                />
              </a>
              <div className={styles.verticalLine} />
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

            <div className={styles.rightContainer}>
              {MenuItems.map((item: any, index) => {
                return (
                  index !== skipIndex && (
                    <>
                      {item?.href && (
                        <a
                          className={styles.registerText}
                          href={item?.href || ''}
                          key={index}
                        >
                          {item?.displayName}
                          {NavbarDropdown(item)}
                        </a>
                      )}
                      {!item?.href && (
                        <span className={styles.registerText} key={index}>
                          {item?.displayName}
                          {NavbarDropdown(item)}
                        </span>
                      )}
                    </>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.border} />
    </>
  );
};

export default Navbar;
