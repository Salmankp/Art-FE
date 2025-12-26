import React from 'react';
import clsx from 'clsx';
import classes from '../styles/Auth/Banner.module.scss';
import {
  authlogo,
  classicclub,
  stadium2,
  visions,
  topBannerimage,
} from '../../../assets/index';

export default function Banner(props) {
  return (
    <div className={classes.banner}>
      <div className={classes.topImagelogo}>
        <img
          src={topBannerimage}
          alt="artefy-beta"
          className={classes.everscapBeta}
        />
        <img src={authlogo} alt="artefy-beta" className={classes.artefyBeta} />
      </div>
      {/* <div className={classes.everscape}>
        <img
          className={classes.headerText}
          src={GreenDragonPatronBadge}
          alt="everscapes-text-header"
          style={{ width: '100%' }}
        />
        <h3>
          {props.reg ? (
            <div className={classes.regtitle}>
              Sign Up Now <br />
              <span>For Your Free</span> <br />
              EverScapes <br />
              Patron Badge <br />
            </div>
          ) : (
            'The EverScapes Patron Badge'
          )}
        </h3>
        <div className={classes.borderBottom}></div>
      </div> */}
      {/* <div className={classes.sideText}>
        <p className={classes.disclaimer}>
          This limited edition NFT gives you exclusive access to special drops
          and secret offers. Do not miss out on owning{' '}
          <strong> EverScapes’ </strong> first NFT and a slice of history in the
          making.
        </p>
        <p className={classes.disclaimer}>
          Simply create your account and your badge will be sent to your new
          wallet within 24 hours!
        </p>
      </div> */}
      <div className={classes.slogan}>
        <p className={classes.sloganText}>One account</p>
        <p className={clsx(classes.sloganText, classes.blue)}>
          endless possibilities!
        </p>
      </div>
      <div className={classes.sideText}>
        <p className={classes.disclaimer}>
          Digital collectables are as varied as the passions, lifestyles and
          hobbies from which they come.
        </p>
        <p className={classes.disclaimer}>
          From fantasy art to music, sport or gaming, wherever your passion
          lives, artefy has a host of exciting platforms coming and your one
          account will be a key to them all.
        </p>
      </div>
      <div className={classes.lower}>
        <div className={classes.fdrow}>
          <div className={classes.fdinner}>
            <h6>Coming soon to Artefy</h6>
          </div>
          <div className={classes.logincard}>
            <div className={classes.second}>
              <div style={{ display: 'flex' }}>
                <img src={classicclub} alt="logo" />
              </div>
              <span className={classes.txtwrap}>
                <h3>Classick.Club</h3>
                <p className={classes.visionp}>
                  Music Collectables done differently
                </p>
              </span>
            </div>
            <div className={classes.second}>
              <div style={{ display: 'flex' }}>
                <img
                  src={visions}
                  alt="logo"
                  style={{ filter: 'grayscale(100%)' }}
                />
              </div>
              <span className={classes.txtwrap}>
                <h3>Visions</h3>
                <p className={classes.visionp}>
                  Contemporary digital art at your fingertips
                </p>
              </span>
            </div>
            <div className={classes.second}>
              <div style={{ display: 'flex' }}>
                <img
                  src={stadium2}
                  alt="logo"
                  style={{ filter: 'grayscale(100%)' }}
                />
              </div>
              <span className={classes.txtwrap}>
                <h3>Stadium</h3>
                <p>Unique sports memorabilia and collectables</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
