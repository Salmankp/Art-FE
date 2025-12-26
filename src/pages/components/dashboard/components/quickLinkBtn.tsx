import React, { useState, useEffect } from 'react';
import { getArtistNames } from 'utils/helpers';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { AuthenticationStateActions } from 'redux/slices/AuthenticationState';
import { sortPaintings, groupPaintings } from 'utils/helper';
import {
  updateUserPaintings,
  updateMarketPlaceStatus,
} from 'pages/components/dashboard/helper';
import ListModal from '../../MarketPlaceStatic/ListModal';
import styles from '../style/styles.module.scss';

function QuickLinkBtn({ item, classCss }) {
  console.log('DETAILS QUICK', item);
  const dispatch = useAppDispatch();
  const [listModal, setListModal] = useState<boolean>(false);
  const wallet = useAppSelector(
    (state) => state.AuthenticationState.walletDetails,
  );
  const userPaintings = useAppSelector(
    (state) => state.AuthenticationState.userPaintings,
  );
  const handleReact = (value: boolean, input: any) => {
    if (value) {
      const Badges = [...userPaintings.paintings];
      const list = updateUserPaintings(Badges);
      const result = updateMarketPlaceStatus(list, item, input);
      dispatch(
        AuthenticationStateActions.set_userPaintings(
          groupPaintings(
            sortPaintings(
              { ...userPaintings, paintings: result.updateListItem },
              'price',
            ),
          ),
        ),
      );
    } else {
      setListModal(false);
    }
  };
  console.log('Quicklist ITEM', item);
  return (
    <>
      <div>
        <button
          className={`${styles.viewListButton} ${classCss}`}
          onClick={function () {
            setListModal(true);
          }}
        >
          Quick List
        </button>
      </div>
      <ListModal
        isOpen={listModal}
        walletType={wallet.walletType}
        paintingPreviewImg={
          item?.paintingID?.previewImage || item?.paintingID?.previewUrl
        }
        paintingPrice={item?.sale?.price}
        paintingName={item?.paintingID?.name}
        artistNames={getArtistNames(item?.paintingID?.artists)}
        collection={item?.paintingID?.theme?.name}
        num={item?.num}
        totalNum={
          item?.paintingID?.totalMints || item?.paintingID?.mints?.length
        }
        isFromDashboard
        tokenId={item?.tokenId}
        mintId={item?._id}
        handleModal={handleReact}
        toggleModal={setListModal}
        data={item}
      />
    </>
  );
}
export default QuickLinkBtn;
