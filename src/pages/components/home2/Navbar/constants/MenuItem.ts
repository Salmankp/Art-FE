import { discordicn } from '../../../../../assets/index';
import MenuItem from '../MenuItemsInterface';

const MenuItems: MenuItem[] = [
  {
    displayName: 'Drops',
    subMenuItem: [
      { displayName: 'Infinite Worlds Drop', href: '/drop/infinite-worlds' },
      {
        displayName: 'Larry Elmore Drop',
        href: '/drop/larry-elmore',
      },
      {
        displayName: 'Gideon Kendall Drop',
        href: '/drop/gideon-kendall',
      },
    ],
  },
  // { displayName: 'ReMastered', href: '/drop/remastered' },
  { displayName: 'Rise Crates', href: '/crate/loot-rise' },
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

  // Below 2 always should be in end of the array
  { displayName: 'Dashboard', href: '/dashboard', isLogin: true },
  { displayName: 'Login/Register', href: '/auth#register', isLogin: false },
];

export default MenuItems;
