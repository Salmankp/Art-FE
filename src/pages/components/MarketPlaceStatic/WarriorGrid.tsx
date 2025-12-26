import React from 'react';
import styles from '../styles/MarketPlaceStatic/WarriorGrid.module.scss';
import {
  star2,
  orangeLogo,
  Cyclops,
  Buckblaster,
  Andriodbot,
  Princeofmars,
  Treasure,
} from '../../../assets/index';

const WarriorGrid: React.FC = () => {
  const data1 = [
    {
      image: Princeofmars,
      title1: 'Frank Frazetta ',
      edition: '2 listings',
      title2: 'Princess of Mars',
      title3: 'Myths & Legends',
      logo: orangeLogo,
      title4: 'EXTRAORDINARY',
      price: '$9,900',
      owned: '',
    },
    {
      image: Cyclops,
      title1: 'Hescox',
      edition: '82 listings',
      title2: 'Cyclops',
      title3: 'Galactic Aliens',
      logo: orangeLogo,
      title4: 'EXTRAORDINARY',
      price: '$1,800',
      owned: '',
    },
    {
      image: Andriodbot,
      title1: 'Sven',
      edition: '82 listings',
      title2: 'Android',
      title3: 'Cyber Future',
      logo: orangeLogo,
      title4: 'EXTRAORDINARY',
      price: '$1,800',
      owned: '',
    },
    {
      image: Buckblaster,
      title1: 'Sanjulián',
      edition: '82 listings',
      title2: 'Buck Blaster',
      title3: 'Galactic Aliens',
      logo: orangeLogo,
      title4: 'EXTRAORDINARY',
      price: '$1,800',
      owned: '',
    },
  ];

  return (
    <div className={styles.wrap}>
      <div className={styles.headingwrap}>
        <div className={styles.line} />
        <div className={styles.heading}>
          More from Warriors & Amazons Collection
        </div>
        <div className={styles.line} />
      </div>
      <div className={styles.Grid}>
        {data1.map((data) => (
          <div
            className={`${styles.griditem} ${
              data.owned !== '' ? styles.active : ''
            }`}
          >
            <div className={styles.gridimg}>
              <img src={data.image} alt="colImg" />

              <div className={styles.overlay}>
                <div className={styles.first}>
                  <div className={styles.namedesc}>
                    <div className={styles.maintitle}>Name</div>
                    <div className={styles.namedescwrap}>
                      <div className={styles.name}>Cyclops</div>
                      <div className={styles.desc}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </div>
                    </div>
                  </div>
                  <div className={styles.titlevalwrap}>
                    <div className={styles.title}>Artist</div>
                    <div className={styles.val}>Frank Frazetta</div>
                  </div>
                  <div className={styles.titlevalwrap}>
                    <div className={styles.title}>Collection</div>
                    <div className={styles.val}>Outerspace</div>
                  </div>
                  <div className={styles.titlevalwrap}>
                    <div className={styles.title}>Genre</div>
                    <div className={styles.val}>Sci-fi</div>
                  </div>
                </div>
                <div className={styles.second}>
                  <div className={styles.badgewrap2}>
                    <div className={styles.logoo2}>
                      <img src={Treasure} alt="logo2" />
                    </div>
                    <div className={styles.txt2}>Treasure</div>
                  </div>
                  <div className={styles.holo}>3D hologram</div>
                </div>
                <div className={styles.third}>
                  <div className={styles.prt1}>
                    <div className={styles.trdwrp}>
                      <div className={styles.ttle}>Drop Date:</div>
                      <div className={styles.vlu}>10 Jun 2021 </div>
                    </div>
                    <div className={styles.trdwrp}>
                      <div className={styles.ttle}>Original Price:</div>
                      <div className={styles.vlu}>$500 </div>
                    </div>
                    <div className={styles.trdwrp}>
                      <div className={styles.ttle}>Latest Sale:</div>
                      <div className={styles.vlu}>12 Jun 2021 </div>
                    </div>
                    <div className={styles.trdwrp}>
                      <div className={styles.ttle}>Latest Price:</div>
                      <div className={styles.vlu}>$1800</div>
                    </div>
                  </div>
                  <div className={styles.prt2}>
                    <div className={styles.hd}>Owned: 3</div>
                    <div className={styles.tags}>#032, #046, #049</div>
                  </div>
                </div>
              </div>

              <div className={styles.badgewrap}>
                <div className={styles.logoo}>
                  <img src={data.logo} alt="logo" />
                </div>
                <div className={styles.txt}>{data.title4}</div>
              </div>
              {data.owned !== '' && (
                <div className={styles.ownedwrap}>{data.owned}</div>
              )}
            </div>
            <div className={styles.title1}>
              <span>{data.title1}</span>
              <span className={styles.edition}>{data.edition}</span>
            </div>
            <div className={styles.title2}>{data.title2}</div>
            <div className={styles.flexWrapper}>
              <div className={styles.title3}>
                <div>{data.title3}</div>
              </div>
              <div className={styles.topContain}>
                <div className={styles.fromWrap}>from</div>
                <div className={styles.priceWrap}>{data.price}</div>
              </div>
            </div>
            <div className={styles.dropWrap}>
              <div className={styles.dropText}>JUST DROPPED 🔥</div>
              <div className={styles.buyText}>Buy Now</div>
            </div>
            <div className={styles.btnstarwrap}>
              <button>View Listing</button>
              <img src={star2} alt="star" />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.btnlisting}>
        <button>See all Warriors & Amazons Collection Listings</button>
      </div>
    </div>
  );
};

export default WarriorGrid;
