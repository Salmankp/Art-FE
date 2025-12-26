import React from 'react';
import styles from '../../components/styles/ElmoreDrop/HeaderInfinite.module.scss';

type World = 'everscapes' | 'artefy' | 'classic-club';

interface dropCardProps {
  data: {
    world: World;
    dropName: string;
    description: string;
    subTitle: string;
    details: string[];
  };
  backgroundImage: any;
  logo: any;
  logoHeavy: any;
}

const HeaderV2 = ({
  data,
  backgroundImage,
  logo,
  logoHeavy,
}: dropCardProps) => {
  return (
    <>
      <div
        className={styles.headerWrap}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <img
          src={logo}
          style={{ marginBottom: '2rem' }}
          className={styles.logoImage}
        />
      </div>
      <div className={styles.contentWrap}>
        <div className={styles.contentwrap}>
          <div className={styles.contentleft}>
            <div className={styles.ltitle}>{data.subTitle}</div>
            <div className={styles.lcontent}>{data.description}</div>
          </div>
          <img src={logoHeavy} />
          <div className={styles.divider} />
          <div className={styles.contentright}>
            <div className={styles.rtitle}>DROP DETAILS</div>
            <div className={styles.rcontent}>
              <ul>
                {data.details.map((item, index) => {
                  return <li key={index.toString()}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderV2;
