interface MenuItem {
  displayName: string;
  href?: string | '#';
  isLogin?: boolean;
  icon?: string;
  window?: boolean;
  subMenuItem?: MenuItem[];
}

export default MenuItem;
