import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { Typography, Container } from '@material-ui/core';
import {
  classicDrop,
  legendaryDrop,
  masterpieceDrop,
  rareDrop,
  uniqueDrop,
  extraordinaryDrop,
  limitedDrop,
  commonDrop,
} from '../../../assets';
import faqData from '../../../data/FaqUpdate.json';
import styles from '../styles/FaqUpdate/FaqData.module.scss';

interface dict {
  [key: string]: any;
}
const data: dict[] = [
  {
    img: uniqueDrop,
    text: 'UNIQUE',
    VALUE: '1',
  },
  {
    img: legendaryDrop,
    text: 'LEGENDARY',
    VALUE: '2-10',
  },
  {
    img: extraordinaryDrop,
    text: 'EXTRAORDINARY ',
    VALUE: '11-50',
  },
  {
    img: masterpieceDrop,
    text: 'MASTERPIECE',
    VALUE: '51-100',
  },
  {
    img: classicDrop,
    text: 'CLASSIC',
    VALUE: '101-250',
  },
  {
    img: rareDrop,
    text: 'RARE',
    VALUE: '251-500',
  },
  {
    img: limitedDrop,
    text: 'LIMITED',
    VALUE: '501-999',
  },
  {
    img: commonDrop,
    text: 'COMMON',
    VALUE: '1000+',
  },
];

const AccordionData: React.FC<{
  question: string;
  answer: string;
  idx?: number;
  name: string;
}> = ({ question, answer, idx, name }) => {
  const [expand, setExpand] = React.useState<boolean>(false);
  return (
    <Accordion
      className={styles.accordion}
      onChange={() => setExpand((prev) => !prev)}
      elevation={0}
      style={{
        margin: 0,
      }}
    >
      <AccordionSummary
        expandIcon={!expand ? <p className={styles.expandIcon}>+</p> : null}
      >
        <Typography className={styles.accHeading}>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails
        style={{
          marginBottom: '0px',
          display: 'block',
          lineHeight: '17px',
        }}
      >
        <span
          className={styles.answers}
          dangerouslySetInnerHTML={{ __html: answer }}
        />
        {name === 'data' && idx === 1 && (
          <>
            <span className={styles.answers}>
              <a href="/auth#register" style={{ color: 'white' }}>
                {' '}
                Make your Artefy account today here.
              </a>
            </span>
          </>
        )}
        {name === 'data' && idx === 3 && (
          <>
            <span className={styles.answers}>
              <a href="/everscapes" style={{ color: 'deepskyblue' }}>
                {' '}
                Check out all things EverScapes here.
              </a>
            </span>
          </>
        )}
        {name === 'data' && idx === 4 && (
          <>
            <br />
            <br />
            <span className={styles.answers}>
              The way Artefy makes it easy to find what you like is by creating
              different worlds. We curate incredible collections of artists and
              works and put them together by common interests. No matter if
              you’re into sport, fantasy, music, pop culture, sci-fi or anything
              else, Artefy has you covered. You simply set your Artefy account,
              select which worlds interest you and start collecting. You can
              jump into other worlds at any time. Each of these different worlds
              are simply Powered by Artefy.
            </span>
          </>
        )}
        {name === 'data' && idx === 6 && (
          <>
            <br />
            <br />
            <span className={styles.answers}>
              <span>•</span>
              <b>Everscapes:</b>
              The home of Fantasy, Sci-fi and Horror
            </span>
            <br />
            <br />
            <span className={styles.answers}>
              <span>•</span>
              <b>Classick.Club:</b>
              Music collectables done differently
            </span>
            <br />
            <br />
            <span className={styles.answers}>
              <span>•</span>
              <b>Visions:</b>
              Contemporary digital art at your fingertips
            </span>
            <br />
            <br />
            <span className={styles.answers}>
              <span>•</span>
              <b>Stadium:</b>
              Unique sports memorabilia and collectables
            </span>
          </>
        )}
        {name === 'data' && idx === 8 && (
          <>
            <span className={styles.answers}>NFT and Blockchain here</span>
          </>
        )}
        {name === 'data' && idx === 9 && (
          <>
            <br />
            <br />
            <span className={styles.answers}>
              It doesn’t stop there though, Polygon is looking to the future to
              continually improve the energy it requires and we will see even
              our small power usage become less and less. If you want to find
              out more about our environmentally friendly NFT platform, and the
              advantages of a Proof of Stake system, you can read more here.
            </span>
          </>
        )}
        {name === 'data' && idx === 11 && (
          <>
            <span className={styles.answers}>
              <a href="/for-creators" style={{ color: 'deepskyblue' }}>
                Artefy for Creators
              </a>
            </span>
          </>
        )}

        {idx === 2 && name === 'data2' && (
          <>
            <br />
            <br />
            <Typography className={styles.answers}>
              <span>•</span>
              <b>Scarcity:</b>
              When an NFT is uploaded to the blockchain, total number of
              editions is set and can not be changed. No more than the defined
              number of editions, will ever be released. This means if a piece
              is 1 of 100, no more than 100 editions can ever be created.
            </Typography>
            <br />
            <Typography className={styles.answers}>
              <span>•</span>
              <b>Authenticity:</b>
              As there can be no changes to the blockchain after an NFT has been
              minted, collectors can trust that the artwork they are purchasing
              is the original and has not been tampered with, because the
              publicly accessible data on the blockchain is always available to
              verify it. Even if other people attempt to copy the NFT in the
              future, it will be easily identified as a replica and the value of
              your artwork will not degrade
            </Typography>
            <br />
            <Typography className={styles.answers}>
              <span>•</span>
              <b>Ownership:</b>
              Every transfer/purchase of an NFT, is recorded on the blockchain.
              This means that there is a publicly accessible ownership history
              of every asset. Provenance is automated and accurate. This both
              ensures the legitimacy of the NFT but also allows the original
              artist to be compensated for all future sales.
            </Typography>
          </>
        )}

        {idx === 17 && name === 'data1' && (
          <div className={styles.extra}>
            {data.map((item, id) => {
              return (
                <div key={id.toString()} className={styles.row}>
                  <div className={styles.image}>
                    <img
                      src={item.img}
                      height="20px"
                      width="20px"
                      alt="Drops"
                    />
                    &nbsp;
                    {item.text}
                  </div>
                  <div className={styles.value}>{item.VALUE}</div>
                </div>
              );
            })}
          </div>
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export const Header: React.FC<{ data: string }> = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.ruler} />
        <div className={styles.data}>{data}</div>
        <div className={styles.ruler} />
      </div>
    </div>
  );
};
export const FaqData: React.FC = () => {
  return (
    <>
      <div className={styles.Container}>
        <Container>
          <div className={styles.DataContainer}>
            <h1 className={styles.heading}>Frequently Asked Questions</h1>
            <Header data="Artefy" />
            <div className={styles.accordionListContainer}>
              {faqData.data.map((data, idx) => (
                <AccordionData
                  key={idx.toString()}
                  question={data.question}
                  answer={data.answer}
                  name="data"
                  idx={idx}
                />
              ))}
            </div>
          </div>
        </Container>
      </div>

      <div className={styles.Container}>
        <Container>
          <div className={styles.DataContainer} style={{ marginTop: '80px' }}>
            <Header data="Getting Started" />
            <div
              className={styles.accordionListContainer}
              style={{ marginTop: '20px' }}
            >
              {faqData.data1.map((data1, idx) => (
                <AccordionData
                  key={idx.toString()}
                  question={data1.question}
                  answer={data1.answer}
                  idx={idx}
                  name="data1"
                />
              ))}
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.Container}>
        <Container>
          <div className={styles.DataContainer} style={{ marginTop: '80px' }}>
            <Header data="NFTs and Digital Collectables" />
            <div
              className={styles.accordionListContainer}
              style={{ marginTop: '20px' }}
            >
              {faqData.data2.map((data1, idx) => {
                return (
                  <AccordionData
                    key={idx.toString()}
                    idx={idx}
                    question={data1.question}
                    answer={data1.answer}
                    name="data2"
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </div>
      <div className={styles.ContainerSmol}>
        <div className={styles.DataContainerSmol}>
          <h1 className={styles.heading}>
            <span>Beginner’s Guide - </span>
            <span className={styles.head}>Coming Soon</span>
          </h1>
        </div>
      </div>
    </>
  );
};
