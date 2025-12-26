import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Container,
  Box as MBox,
  Switch,
  FormControlLabel,
} from '@material-ui/core';
import AssetsWrapper from 'pages/components/dashboard/AssetWrapper';
import { useAppSelector } from 'redux/hooks';
import { sortPaintings, groupPaintings } from 'utils/helper';
import { purple } from '@material-ui/core/colors';
import { ungroupPainting } from 'pages/components/dashboard/helper';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/dashboard/Grid.module.scss';

const MyAssets = React.memo<{
  isMarketplaceListings: boolean;
}>(({ isMarketplaceListings }) => {
  const userPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );

  if (!userPaintings?.paintings)
    return (
      <>
        <Container>
          <MBox sx={{ mx: 'auto', width: 30 }} padding={20}>
            <CircularProgress style={{ marginLeft: 15, marginBottom: 20 }} />
            <h3>Loading...</h3>
          </MBox>
        </Container>
      </>
    );
  const [checked, setChecked] = React.useState(true);
  const [Badges, setBadges] = useState([]);
  const [toggle, settoggle] = useState(true);

  const PurpleSwitch = withStyles({
    switchBase: {
      color: purple[300],
      '&$checked': {
        color: purple[500],
      },
      '&$checked + $track': {
        backgroundColor: purple[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const toggleChecked = (event: any) => {
    const togleCheck = event.target.checked;
    if (togleCheck === false) {
      settoggle(false);
      const ungroupList = ungroupPainting(Badges);
      const list = sortPaintings({ paintings: ungroupList }, 'price', 1);
      const output = list?.paintings?.map((item: any) => {
        item.totalOwnedMints = [];
        item.totalTokenIds = [];
        return item;
      });
      setBadges(output);
    } else if (togleCheck === true) {
      settoggle(true);
      const sortesList = sortPaintings({ paintings: Badges }, 'price', 1);
      const groupedList = groupPaintings(sortesList);

      setBadges(groupedList.paintings);
    }
    setChecked(togleCheck);
  };
  useEffect(() => {
    setBadges(userPaintings.paintings);
  }, [userPaintings]);
  return (
    <div className={styles.root}>
      {userPaintings?.paintings?.length > 0 && Badges.length > 0 ? (
        <>
          <MBox display="flex" flexDirection="row-reverse">
            <FormControlLabel
              control={
                <PurpleSwitch checked={checked} onChange={toggleChecked} />
              }
              label={checked ? 'Group Duplicates' : 'Un-Group Duplicates'}
            />
          </MBox>
          <div className={styles.row}>
            <AssetsWrapper
              paintings={Badges}
              ischecked={toggle}
              paintingsLimit={8}
              isUnList={false}
              isDashboard
              isMyAsset
              isMarketplaceListings={isMarketplaceListings}
            />
          </div>
        </>
      ) : (
        <p style={{ color: '#fff' }}>No assets to show</p>
      )}
    </div>
  );
});

export default MyAssets;
