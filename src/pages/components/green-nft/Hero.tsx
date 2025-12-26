import React, { useState } from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { greennft1, greennft2 } from '../../../assets';
import styles from '../styles/green-nft/Hero.module.scss';

const details: { [key: string]: string }[] = [
  {
    title: 'An Enviromental NFT Infrastructure',
    image: greennft1,
    body1:
      'When assessing blockchain partners to support the Artefy platform, an extensive research and exploration process was undertaken to review all of the options available to us to ensure that the correct decision was made on which network to use, particularly in consideration of one of the most sensitive issues surrounding NFTs – energy use. Most NFT platforms are built upon the Ethereum network which is widely recognised as one of the most energy inefficient networks as it utilises the ‘Proof of Work’ consensus mechanism. Artefy technology is built upon the Polygon blockchain which is one of the most energy efficient blockchains available as it utilises ‘Proof of Staking’ as an alternative technology.',
    heading:
      'This means we can leave our mark on the world through art, not the environment. ',
  },
  {
    title: 'Proof of Work',
    title1: 'vs Proof of Stake',
    image: greennft2,
    body1:
      'So what is the difference? It’s important to understand that within each cryptocurrency blockchain lies a network of computers. It’s these computers that help to secure the software from outside attack and confirm transactions. This system is called a consensus mechanism and the two most widely used of these mechanisms are Proof of Work (PoW) and Proof of Stake (PoS), and they both regulate the process in which transactions between users are verified and added to a blockchain’s public ledger, all without a central party’s help.',
  },
];

const Hero: React.FC = () => {
  const [width, setWidth] = useState(window.innerWidth);

  // triggers inView if 25% in viewport

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.hero}>
          {details.map((item, idx) => {
            return (
              <Grid
                key={idx.toString()}
                container
                className={styles.grid}
                direction={idx % 2 === 0 ? 'row' : 'row-reverse'}
              >
                <div className={styles.matter}>
                  <Typography variant="h2" className={styles.header}>
                    {item.title}
                  </Typography>
                  <Typography variant="h2" className={styles.header}>
                    {item.title1}
                  </Typography>
                  <Typography variant="body1" className={styles.body}>
                    {item.body1}
                  </Typography>
                  <Typography variant="body1" className={styles.body}>
                    {item.body2}
                  </Typography>
                  <Typography variant="body1" className={styles.heading}>
                    {item.heading}
                  </Typography>
                </div>
                <div className={styles.image}>
                  <img src={item.image} alt="" className={styles.card} />
                </div>
              </Grid>
            );
          })}
          <Typography variant="body1" className={styles.text}>
            <strong>Proof of Work (PoW)&nbsp;</strong>
            is based on an advanced form of mathematics called cryptography.
            This is why digital coins like Bitcoin and Ethereum and called
            'cryptocurrencies'!
            <br />
            Cryptography uses mathematical equations that are so difficult that
            only powerful computers can solve them. No equation is ever the
            same, meaning that once it is solved, the network knows that the
            transaction is authentic. Attempting to prove one of these equations
            is known as mining. Proof of Work Blockchains not only need
            significant amounts of electricity, but are also very limited in the
            number of transactions they can process at the same time. The
            maximum amount of transactions that the Ethereum blockchain can
            process is 15. POW blockchains are also open to a group of people
            obtaining 51% of the mining power and having control over the whole
            blockchain.
            <br />
            <br />
            <strong>The Proof of Stake (PoS)&nbsp;</strong>
            model uses a different process to confirm transactions and reach
            consensus. The system still uses a cryptographic algorithm, but the
            objective of the mechanism is different. Unlike PoW networks that
            rely on miners, PoS-powered blockchains are maintained by
            validators. The validation process in PoS is called “forging.” For
            someone to participate in the block creation process, they simply
            have to stake the native token, meaning they lock up a minimum
            amount of tokens that act as collateral. There is no need to spend
            on electricity or purchase specialized hardware. Next, validators
            have to agree on which transactions must be added into the next
            block, like in a game of guessing. If their block is selected by the
            protocol, they get rewarded from the transaction fees and with newly
            minted tokens in relation to the size of their stake. The energy it
            takes to run is about the same as a desktop computer. The greatly
            reduced energy requirements plus the increased security meant that
            we knew that we had to partner with a PoS blockchain for Artefy and
            all our platforms.
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
