import React, { useEffect, useState } from 'react';
import {
  CircularProgress,
  Box as MBox,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import ReactPlayer from 'react-player';
import { ungroupPainting } from 'pages/components/dashboard/helper';
import { purple } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import { sortPaintings, groupPaintings } from 'utils/helper';
import { getArtistNames, maticLogo } from 'utils/helpers';
import { useAppSelector } from 'redux/hooks';
import TableBuilder from 'pages/components/MaterialTable/index';
import getFormatedDate from 'pages/components/Marketplace/helpers/GetFormatedDate';
import { useHistory } from 'react-router-dom';
import ToolTip from 'utils/tooltip';
import styles from '../style/styles.module.scss';
import QuickLinkBtn from '../components/quickLinkBtn';

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

const rows: any[] = [
  {
    id: 'nftThumbnail',
    show: false,
    numeric: false,
    disablePadding: false,
    label: '',
  },
  {
    id: 'nftID',
    show: false,
    numeric: true,
    disablePadding: true,
    label: 'NFT ID',
  },
  {
    id: 'assetName',
    show: false,
    numeric: true,
    disablePadding: false,
    label: 'Asset Name',
  },
  {
    id: 'artistName',
    show: false,
    numeric: true,
    disablePadding: false,
    label: 'Artist Name',
  },
  {
    id: 'collection',
    show: false,
    numeric: true,
    disablePadding: false,
    label: 'Collection',
  },
  {
    id: 'purchaseDate',
    show: false,
    numeric: true,
    disablePadding: false,
    label: 'Purchase Date',
  },
  {
    id: 'purchasePrice',
    show: false,
    numeric: true,
    disablePadding: false,
    label: 'Purchase Price',
  },
  {
    id: 'owned',
    show: false,
    numeric: true,
    disablePadding: false,
    label: 'Owned',
  },
  {
    id: 'listed',
    show: false,
    numeric: true,
    disablePadding: false,
    label: 'Listed',
  },
  {
    id: 'view',
    show: false,
    numeric: true,
    disablePadding: false,
    label: 'View',
  },
];

function AssetsList() {
  const history = useHistory();
  const [checked, setChecked] = React.useState(true);
  const [Badges, setBadges] = useState([]);
  const [tableCells, setCells] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );

  const toggleChecked = (event: any) => {
    const togleCheck = event.target.checked;
    if (togleCheck === false) {
      const ungroupList = ungroupPainting(Badges);
      const list = sortPaintings({ paintings: ungroupList }, 'price', 1);
      setBadges(list.paintings);
    } else if (togleCheck === true) {
      const sortesList = sortPaintings({ paintings: Badges }, 'price', 1);
      const groupedList = groupPaintings(sortesList);

      setBadges(groupedList.paintings);
    }
    setChecked(togleCheck);
  };
  const getValue = (value) => {
    const newVal = value === 0 || value === '0' ? 'N/A' : value;
    return newVal;
  };

  const getValueForDate = (value) => {
    const newDateValue = !value ? new Date(1970) : value;
    return newDateValue;
  };

  const getThumbail = (value: string, fileType: string) => {
    if (fileType === 'MP4') {
      return (
        <ReactPlayer
          url={value}
          playing
          loop
          muted
          controls={false}
          width={40}
          height={60}
        />
      );
    }
    return <img src={value} style={{ width: '40px' }} />;
  };

  const getPurchasePrice = (item) => {
    if (+item?.paintingID?.cryptoPrice > 0) {
      return maticLogo(+item?.paintingID?.cryptoPrice);
    }
    if (+item?.paintingID?.price > 0) {
      return `$${item?.paintingID?.price}`;
    }
    if (item?.paintingID?.paintingFrom) {
      return item?.paintingID?.paintingFrom;
    }
    return 0;
  };
  const getPurchasePriceValue = (item) => {
    if (+item?.paintingID?.cryptoPrice > 0) {
      return item?.paintingID?.cryptoPrice;
    }
    if (+item?.paintingID?.price > 0) {
      return item?.paintingID?.price;
    }
    // if (item?.paintingID?.paintingFrom) {
    //   return item?.paintingID?.paintingFrom;
    // }
    return 0;
  };

  const getAssetList = async () => {
    try {
      setIsLoading(true);
      if (Badges && Badges.length > 0) {
        const cells = Badges.map((mediaItem: any) => {
          const fileType = mediaItem?.paintingID?.filetype;
          return {
            fields: {
              nftThumbnail: {
                value: getThumbail(
                  getValue(
                    mediaItem?.paintingID?.previewImage ||
                      mediaItem?.paintingID?.previewUrl,
                  ),

                  fileType,
                ),
              },
              nftID: { value: <ToolTip value={getValue(mediaItem._id)} /> },
              assetName: {
                value: <ToolTip value={getValue(mediaItem.paintingID.name)} />,
                originalValue: mediaItem.paintingID.name,
              },
              artistName: {
                value: (
                  <ToolTip
                    value={getValue(
                      getArtistNames(mediaItem.paintingID.artists),
                    )}
                  />
                ),
                originalValue: getArtistNames(mediaItem.paintingID.artists),
              },
              collection: {
                value: (
                  <ToolTip value={getValue(mediaItem.paintingID.theme.name)} />
                ),
                originalValue: mediaItem.paintingID.theme.name,
              },
              purchaseDate: {
                value: (
                  <ToolTip
                    value={getFormatedDate(
                      getValue(mediaItem.paintingID.dropDate),
                    )}
                  />
                ),
                originalValue: getFormatedDate(
                  getValueForDate(mediaItem.paintingID.dropDate),
                ),
                isDate: true,
              },

              purchasePrice: {
                value: (
                  <ToolTip value={getValue(getPurchasePrice(mediaItem))} />
                ),
                originalValue: getPurchasePriceValue(mediaItem),
              },
              owned: {
                value: (
                  <span className={styles.ownedText}>
                    {`${mediaItem?.totalOwnedMints?.length || ''} Owned`}
                  </span>
                ),
                hidden: !checked,
                sortBlock: true,
              },
              listed: {
                value: <QuickLinkBtn item={mediaItem} classCss="" />,
                sortBlock: true,
              },
              view: {
                value: (
                  <button
                    className={styles.viewNftButton}
                    onClick={() =>
                      history.push(`/nft/${mediaItem._id}`, {
                        paintingID: mediaItem?.paintingID?._id,
                        mintID: mediaItem?._id,
                      })
                    }
                  >
                    View NFT
                  </button>
                ),
                sortBlock: true,
              },
            },
          };
        });
        setIsLoading(true);
        setCells(cells);
        if (checked) {
          const exist = rows.findIndex((pin) => pin.label === 'Owned');
          if (exist === -1) {
            rows.splice(7, 0, {
              id: 'owned',
              show: false,
              numeric: true,
              disablePadding: false,
              label: 'Owned',
            });
          }
        } else {
          rows.splice(
            rows.findIndex((pin) => pin.label === 'Owned'),
            1,
          );
        }
      } else {
        setIsLoading(true);
      }
    } catch (e) {
      setIsLoading(false);
      console.log('Error while fetching Asset List ==> ', e);
    }
  };
  useEffect(() => {
    getAssetList();
  }, [Badges]);
  useEffect(() => {
    setBadges(userPaintings.paintings);
  }, [userPaintings]);
  if (!isLoading)
    return (
      <MBox
        style={{ minHeight: 550 }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MBox textAlign="center">
          <CircularProgress />
          <h3>Loading...</h3>
        </MBox>
      </MBox>
    );
  return (
    <div style={{ minHeight: 550 }}>
      {userPaintings?.paintings?.length > 0 &&
        rows &&
        tableCells &&
        rows.length > 0 &&
        tableCells.length > 0 && (
          <>
            <MBox display="flex" flexDirection="row-reverse">
              <FormControlLabel
                control={
                  <PurpleSwitch checked={checked} onChange={toggleChecked} />
                }
                label={checked ? 'Group Duplicates' : 'Un-Group Duplicates'}
              />
            </MBox>
            <TableBuilder rows={rows} cells={tableCells} />
          </>
        )}
      {userPaintings?.paintings?.length === 0 &&
        tableCells &&
        tableCells.length === 0 && (
          <MBox
            style={{ minHeight: 550 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <h2 style={{ color: '#fff' }}>No Items to show</h2>
          </MBox>
        )}
    </div>
  );
}
export default AssetsList;
