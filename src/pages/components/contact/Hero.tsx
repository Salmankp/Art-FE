import React, { useState } from 'react';
import TelegramIcon from '@material-ui/icons/Telegram';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import { IconButton, Container } from '@material-ui/core';
import { discordicn } from '../../../assets';
import { UserAPI } from '../../../api/user';
import styles from '../styles/contact/Hero.module.scss';
import { success } from '../../../utils/toast';
import {
  checkFirstName,
  checkLastName,
  checkSubject,
  checkMessage,
  checkOnlyEmail,
} from '../../../utils/validate';

const Hero: React.FC = () => {
  const [fName, setFName] = useState('');
  const [LName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subj, setSubj] = useState('');

  const sendContactUs = async () => {
    if (!checkFirstName(fName)) return;
    if (!checkLastName(LName)) return;
    if (!checkOnlyEmail(email)) return;
    if (!checkSubject(subj)) return;
    if (!checkMessage(message)) return;
    const res = await UserAPI.contactUs(fName, LName, email, message, subj);
    if (res?.success) {
      setFName('');
      setLName('');
      setEmail('');
      setMessage('');
      setSubj('');
      success(res?.data?.message);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Container>
          <div className={styles.wrapper}>
            <div className={styles.contact}>
              <div className={styles.contact_container}>
                <p>
                  Follow
                  <span>us</span>
                </p>
                <div className={styles.icons}>
                  <IconButton
                    aria-label="delete"
                    className={styles.icons}
                    onClick={() => {
                      window.open(
                        'https://discord.com/invite/WvsK5nwAxV',
                        '_blank',
                      );
                    }}
                  >
                    <img src={discordicn} alt="discord" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={styles.icons}
                    onClick={() => {
                      window.open('https://t.me/artefy_official', '_blank');
                    }}
                  >
                    <TelegramIcon style={{ fontSize: 83, fill: 'white' }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    className={styles.icons}
                    onClick={() => {
                      window.open(
                        'https://twitter.com/ArtefyOfficial',
                        '_blank',
                      );
                    }}
                  >
                    <TwitterIcon style={{ fontSize: 83, fill: 'white' }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="inherit"
                    className={styles.icons}
                    onClick={() => {
                      window.open(
                        'https://www.instagram.com/artefy.io/',
                        '_blank',
                      );
                    }}
                  >
                    <InstagramIcon
                      style={{ fontSize: 83, fill: 'white' }}
                      color="inherit"
                    />
                  </IconButton>
                </div>
                <div className={styles.info}>
                  <h4>We’d Love to Hear From You</h4>
                  <p>
                    We value your feedback and we are here to help make your
                    experience on Artefy as enjoyable as possible.
                  </p>
                  <p>
                    Reach out to us via the contact form to the right or get in
                    touch with us over our socials if you have ideas, concerns
                    or suggestions to make this space better for everyone.
                  </p>
                </div>
              </div>
            </div>
            <form className="validate" target="_blank" noValidate>
              <div className={styles.form}>
                <h1 className={styles.formHeader}>
                  Contact
                  <span>us</span>
                </h1>
                <div className={styles.input}>
                  <h1>FIRST NAME*</h1>
                  <textarea
                    value={fName}
                    required
                    name="fName"
                    className="required"
                    onChange={(e) => setFName(e.target.value)}
                  />
                  <h1>LAST NAME*</h1>
                  <textarea
                    value={LName}
                    required
                    name="LName"
                    className="required"
                    onChange={(e) => setLName(e.target.value)}
                  />
                  <h1>EMAIL*</h1>
                  <input
                    value={email}
                    required
                    name="email"
                    type="email"
                    className="required"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <h1>Subject*</h1>
                  <input
                    value={subj}
                    required
                    name="subj"
                    type="text"
                    className="required"
                    onChange={(e) => setSubj(e.target.value)}
                  />
                  <h1>MESSAGE*</h1>
                  <textarea
                    value={message}
                    required
                    className={styles.message}
                    name="message"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  value="Subscribe"
                  name="subscribe"
                  onClick={sendContactUs}
                >
                  Send
                </button>
                <br />
                <span className={styles.requiredField}>* Required fields</span>
              </div>
            </form>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Hero;
