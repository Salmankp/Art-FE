import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItems from './constants/MenuItem';
import styles from '../../styles/common/Sidebar.module.scss';
import { discordicn } from '../../../../assets/index';

const useStyles = makeStyles({
  list: {
    paddingTop: '30px',
    paddingBottom: '23px',
  },
  fullList: {
    width: 'auto',
  },
  drawer: {
    background: 'linear-gradient(180deg, #444444E7, #222222E7)',
    opacity: '0.8',
  },
  divider: {
    backgroundColor: '#CBC4C4',
    width: '90vw',
  },
  items: {
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'left',
  },
  menu: {
    position: 'absolute',
    zIndex: 999,
  },
});

const Sidebar: React.FC = () => {
  const [submenu, setSubmenu] = useState(0);
  const classes = useStyles();
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [isLogin] = useState<any>(localStorage.getItem('authToken'));

  const skipIndex = isLogin ? MenuItems.length - 1 : MenuItems.length - 2;

  const history = useHistory();
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, MenuItems) => (
    <div
      id="drawer"
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <List className={classes.list}>
          <Divider className={classes.divider} light />

          {MenuItems.map((item, index) => {
            return (
              index !== skipIndex && (
                <>
                  <ListItem
                    button
                    key={`Drops${index}`}
                    style={{ paddingTop: '4px', paddingBottom: '4px' }}
                  >
                    {item?.href && (
                      <a
                        href={item?.href}
                        style={{
                          textDecoration: 'none',
                          display: 'flex',
                          width: '100%',
                        }}
                      >
                        <ListItemText
                          primaryTypographyProps={{ style: { color: 'white' } }}
                          primary={item?.displayName}
                          className={classes.items}
                          onClick={() =>
                            item?.href ? history.push(item?.href) : ''
                          }
                        />
                      </a>
                    )}
                    {!item?.href && (
                      <ListItemText
                        primaryTypographyProps={{ style: { color: 'white' } }}
                        primary={item?.displayName}
                        className={classes.items}
                        onClick={() =>
                          item?.href ? history.push(item?.href) : ''
                        }
                      />
                    )}
                    {item?.subMenuItem && (
                      <div className={styles.plus}>
                        {submenu === index + 1 ? (
                          <div onClick={() => setSubmenu(0)}>-</div>
                        ) : (
                          <div onClick={() => setSubmenu(index + 1)}>+</div>
                        )}
                      </div>
                    )}
                  </ListItem>
                  {submenu === index + 1 && item?.subMenuItem && (
                    <div className={styles.submenumbl}>
                      <ul>
                        {item?.subMenuItem?.map((subItem, i) => {
                          return (
                            <li key={i}>
                              {subItem?.window && (
                                <a
                                  href={subItem.href}
                                  target="_blank"
                                  className={styles.navLink}
                                  rel="noreferrer"
                                >
                                  {subItem?.displayName}
                                  {subItem?.icon && <img src={discordicn} />}
                                </a>
                              )}
                              {!subItem?.window && (
                                <a
                                  className={styles.navLink}
                                  href={subItem?.href}
                                >
                                  {subItem?.displayName}
                                  {subItem?.icon && <img src={discordicn} />}
                                </a>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  <Divider className={classes.divider} light />
                </>
              )
            );
          })}
        </List>
      </Grid>
    </div>
  );

  return (
    <div className={styles.sidebar}>
      {['top'].map((anchor, i) => (
        <Fragment key={anchor + i}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon
              style={{
                color: 'white',
              }}
              className={styles.menu}
            />
          </Button>
          <Drawer
            anchor="top"
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            classes={{ paper: classes.drawer }}
          >
            {list(anchor, MenuItems)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
};
export default Sidebar;
