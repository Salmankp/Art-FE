// import assets
import GreenLogo from '../../../../assets/images/greenLogo.png';
import YellowLogo from '../../../../assets/images/yellowLogo.png';
import OrangeLogo from '../../../../assets/images/orangeLogo.png';
import RedLogo from '../../../../assets/images/redLogo.png';
import PurpleLogo from '../../../../assets/images/purpleLogo.png';
import SkyBlueLogo from '../../../../assets/images/skyblueLogo.png';
import BlueLogo from '../../../../assets/images/blueLogo.png';
import WhiteLogo from '../../../../assets/images/whiteLogo.png';
import PaintingRarity from '../../../../types/painting/PaintingRarity';

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

export default logo;
