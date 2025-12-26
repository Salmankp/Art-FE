import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import Classes from '../styles/MedallionDrop/Banner.module.scss';
import {
  everscapesText,
  vlogo,
  dropnewbg,
  bannerCircleLogo,
} from '../../../assets';

type World = 'everscapes' | 'artefy' | 'classic-club';
interface dropCardProps {
  data: {
    world: World;
    dropName: string;
    description: string;
    subTitle: string;
    details: string[];
  };
}

const Banner = ({ data }: dropCardProps) => {
  const history = useHistory();
  return (
    <>
      <Typography component="div" className={Classes.border} />
      <Typography
        component="div"
        className={Classes.banner}
        style={{
          background: `url(${dropnewbg})`,
          backgroundPosition: 'center',
          backgroundSize: 'contain',
        }}
      >
        <Container
          style={{ maxWidth: '1120px', margin: 'auto' }}
          className={Classes.innerArea}
        >
          <Typography component="div">
            <Typography
              component="div"
              className={Classes.bannerTopAreaWrapper}
            >
              <Typography component="div" className={Classes.topLogoWrapper}>
                <Typography>
                  <a href="/everscapes">
                    <img
                      className={Classes.headerText}
                      src={everscapesText}
                      alt="everscapes-text-header"
                    />
                  </a>
                  <div className={Classes.borderBottom} />
                </Typography>
                <Typography component="div">
                  <img src={vlogo} alt="vLogo" className={Classes.vLogo} />
                </Typography>
              </Typography>
              <Typography component="h3" className={Classes.bannerTitle}>
                {data.dropName}
              </Typography>
            </Typography>

            <Typography component="div" className={Classes.bannerInformation}>
              <Typography component="div" className={Classes.leftItem}>
                <Typography component="h3" className={Classes.infoTitle}>
                  {data.subTitle}
                </Typography>
                <Typography className={Classes.infoDescription}>
                  {data.description}
                </Typography>
                <Typography component="div" style={{ marginTop: '10px' }}>
                  <b>Winners: </b>
                  <Link to="/moonmaid/winners" style={{ color: 'white' }}>
                    http://www.artefy.io/moonmaid/winners
                  </Link>
                </Typography>
              </Typography>
              <Typography component="div" className={Classes.rightItem}>
                <Typography component="div">
                  <Typography component="h3" className={Classes.infoTitle}>
                    DROP DETAILS
                  </Typography>
                  <ul className={Classes.infoList}>
                    {data.details.map((item, index) => {
                      return <li key={index.toString()}>{item}</li>;
                    })}
                  </ul>
                </Typography>
                <Typography component="div">
                  <img
                    src={bannerCircleLogo}
                    className={Classes.bannerCircleLogo}
                    alt="banner right logo"
                  />
                </Typography>
              </Typography>
            </Typography>

            <Typography component="div" className={Classes.bottomActionWrapper}>
              <Typography className={Classes.actionInfo}>
                Create your free account now
              </Typography>

              <Typography component="div">
                <Button
                  className={Classes.getStartedButton}
                  onClick={() => {
                    history.push('/auth#register');
                    window.scrollTo(0, 0);
                  }}
                >
                  Get Started
                </Button>
              </Typography>
            </Typography>
          </Typography>
        </Container>
      </Typography>
      <Typography component="div" className={Classes.border} />
    </>
  );
};

export default Banner;
