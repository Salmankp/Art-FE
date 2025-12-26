import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Classes from '../../styles/MedallionDrop/MoonMaidTermsCondition/Footer.module.scss';

const Footer = () => {
  return (
    <Box className={Classes.footerWrapper}>
      <Container>
        <ul className={Classes.bottomLinksWrapper}>
          <li>
            <Link to="/faq" className={Classes.linkItem}>
              FAQs
            </Link>
          </li>
          <li>
            <Link to="/privacy" className={Classes.linkItem}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className={Classes.linkItem}>
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link to="/contactus" className={Classes.linkItem}>
              Contact Us
            </Link>
          </li>
        </ul>
      </Container>
    </Box>
  );
};

export default Footer;
