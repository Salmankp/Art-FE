import { discordicn } from '../../../../assets';
import MenuItem from '../MenuItemsInterface';

const MenuItems: MenuItem[] = [
  {
    displayName: 'Marketplace',
    href: '/marketplace',
  },
  {
    displayName: 'Drops',
    subMenuItem: [
      {
        displayName: 'Moon Maid Medallion Drop',
        href: '/drop/moonmaid',
      },
      {
        displayName: 'Moon Maid Winners',
        href: '/moonmaid/winners',
      },
      {
        displayName: 'Remastered Drop',
        href: '/drop/remastered',
      },
      { displayName: 'Valentine drop', href: '/drop/valentine' },
      {
        displayName: 'Exploring Fantasy drop',
        href: '/drop/exploring-fantasy',
      },
      { displayName: 'Infinite Worlds Drop', href: '/drop/infinite-worlds' },
      {
        displayName: 'Larry Elmore Drop',
        href: '/drop/larry-elmore',
      },
    ],
  },
  // { displayName: 'ReMastered', href: '/drop/remastered' },
  // { displayName: 'Rise Crates', href: '/crate/loot-rise' },
  { displayName: 'Galleries', href: '/master-galleries' },
  { displayName: 'Artists', href: '/artists-master' },
  {
    displayName: 'Community',
    subMenuItem: [
      {
        displayName: 'Join Discord',
        href: 'https://discord.com/invite/WvsK5nwAxV',
        icon: discordicn,
        window: true,
      },
      {
        displayName: 'Contact Us',
        href: '/contactus',
      },
      {
        displayName: 'FAQs',
        href: '/faq',
      },
      {
        displayName: 'Guide Green NFTs',
        href: '/greennft',
      },
    ],
  },
];

export default MenuItems;
