import React from 'react';
import styles from '../styles/artist/Sidebar.module.scss';
import { artistHero, man } from '../../../assets';

const Sidebar = () => {
  return (
    <div className={styles.root}>
      <img
        src={artistHero}
        className={styles.hero_img}
        alt="Hero"
        style={{ position: 'relative' }}
      />
      <div className={styles.sidebar}>
        <div className={styles.container}>
          <div className={styles.image}>
            <img src={man} alt="Man" />
          </div>
          <span>1.2m following</span>
          <p>Frank Frazetta </p>
          <h6>The Godfather of Fantasy</h6>

          <div className={styles.row}>
            <div className={styles.rowItem}>
              <span> NFTs</span>
              <span> 837</span>
            </div>
            <hr />
            <div className={styles.rowItem}>
              <span> Collections</span>
              <span> 20</span>
            </div>
            <hr />
            <div className={styles.rowItem}>
              <span> Active listings</span>
              <span> 140</span>
            </div>
            <hr />
            <div className={styles.rowItem}>
              <span> Gallery Features</span>
              <span> 320</span>
            </div>
            <hr />
            <div className={styles.rowItem}>
              <span style={{ marginTop: '10px' }}> Fantasy</span>
            </div>
            <div className={styles.rowItem}>
              <span> Horror</span>
            </div>
            <div className={styles.rowItem}>
              <span> SciFi</span>
            </div>
          </div>
          <hr />

          <div className={styles.info}>
            <h2>Bio</h2>
            <p>
              Frank Frazetta was an American fantasy and science fiction artist,
              noted for comic books, paperback book covers, paintings, posters,
              LP record album covers and other media. He is often referred to as
              the "Godfather" of fantasy art, and one of the most renowned
              illustrators of the 20th century.
            </p>
          </div>
          <div className={styles.cta}>
            <button className={styles.button}>Follow</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
