import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/styles';
import React, { useMemo } from 'react';
import { rarityColor } from '../../../utils/helpers';

// import assets
import GreenLogo from '../../../assets/images/greenLogo.png';
import YellowLogo from '../../../assets/images/yellowLogo.png';
import OrangeLogo from '../../../assets/images/orangeLogo.png';
import RedLogo from '../../../assets/images/redLogo.png';
import PurpleLogo from '../../../assets/images/purpleLogo.png';
import SkyBlueLogo from '../../../assets/images/skyblueLogo.png';
import BlueLogo from '../../../assets/images/blueLogo.png';
import WhiteLogo from '../../../assets/images/whiteLogo.png';
import PaintingRarity from '../../../types/painting/PaintingRarity';

const logo = (rarity: string) => {
  if (rarity === PaintingRarity.Unique) return GreenLogo;
  if (rarity === PaintingRarity.Legendary) return YellowLogo;
  if (rarity === PaintingRarity.Extraordinary) return OrangeLogo;
  if (rarity === PaintingRarity.Masterpiece) return RedLogo;
  if (rarity === PaintingRarity.Classic) return PurpleLogo;
  if (rarity === PaintingRarity.Rare) return SkyBlueLogo;
  if (rarity === PaintingRarity.Limited) return BlueLogo;
  if (rarity === PaintingRarity.Common) return WhiteLogo;
};

const HorizontalBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const Text = styled(Typography)({
  color: 'white',
  fontWeight: 'bold',
});

const Divider = styled(Box)({
  backgroundColor: 'gray',
  height: '1.5px',
  flex: 1,
  margin: '0px 5%',
});

interface RarityHeaderProps {
  rarity: string;
  length: number;
}

const RarityHeader = ({ rarity, length }: RarityHeaderProps) => (
  <HorizontalBox
    style={{ alignItems: 'center', margin: '50px 0px', width: '100%' }}
  >
    <Divider />
    <HorizontalBox>
      <img
        alt="Rarity logo"
        src={logo(rarity)}
        style={{ height: '30px', width: '30px', paddingRight: '15px' }}
      />
      <span
        style={{
          color: '#fff',
          fontSize: '24px',
          lineHeight: '32px',
          fontWeight: 'bold',
          margin: '0rem 1rem 0rem 0rem',
        }}
      >
        {length}
      </span>
      <Text style={{ color: rarityColor(rarity) }} variant="h5">
        {rarity.toUpperCase()}
        &nbsp;COLLECTABLES
      </Text>
    </HorizontalBox>
    <Divider />
  </HorizontalBox>
);

export default RarityHeader;
