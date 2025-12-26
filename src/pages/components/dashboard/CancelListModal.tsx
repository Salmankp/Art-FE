import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '@material-ui/core';
import { maticLogo } from 'utils/helpers';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch } from 'redux/hooks';
import { ErrorStateActions } from 'redux/slices/ErrorState';
import { DashboardAPI } from 'api/dashboardAPI';
import { infoImg, noImageAvailable } from '../../../assets';
import ModalsStyles from '../styles/dashboard/Modals.module.scss';
import { success, error } from '../../../utils/toast';
import { MarketplaceAPI } from '../../../api/marketplaceAPI';
import { addNftToMarketplace } from '../../../utils/marketplace';
import { commission } from '../../../utils/config';
import Loader from '../common/Loader';
import SingleSelect from './components/SingleSelect';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    background: 'linear-gradient(180deg, #363636 0%, #111111 100%)',
    backgroundColor: '#111111',
    borderRadius: 20,
    border: '0px solid #000',
    boxShadow: theme.shadows[5],
    padding: 30,
    [theme.breakpoints.down(`sm`)]: {
      top: '65%',
      width: '85%',
      maxHeight: 470,
      overflowY: 'auto',
    },
  },
}));

interface ListModalProps {
  walletType: string;
  isOpen: boolean;
  fileType: string;
  paintingImage: string;
  paintingPrice: string;
  paintingName: string;
  artistNames: string;
  collection: string;
  num: number;
  totalNum: number;
  tokenId: string;
  marketplaceItemId: number;
  mintId: string;
  isFromDashboard?: boolean;
  handleLoading?: (value: boolean) => void;
  handleModal?: (value: boolean, input: any) => void;
  toggleModal: (value: boolean) => void;
  handleReact: ((data: any) => void) | undefined;
  data?: any;
}

const CancelListModal: React.FC<ListModalProps> = ({
  isOpen,
  handleModal,
  walletType,
  fileType,
  artistNames,
  paintingName,
  collection,
  mintId,
  tokenId,
  marketplaceItemId,
  paintingImage,
  paintingPrice,
  num,
  totalNum,
  isFromDashboard = false,
  toggleModal,
  handleReact,
  handleLoading,
  data,
}) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const [serviceFee, setServiceFee] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [image, setImage] = useState(paintingImage);
  const [selectedItem, setSelectedItem] = useState(
    data?.groupedListedMints?.length > 1 ? '' : tokenId,
  );
  const [selectedMarketplaceItemId, setSelectedMarketplaceItemId] =
    useState(marketplaceItemId);

  console.log('Data => ', data, tokenId);
  const [selectedItemMintId, setSelectedItemMintId] = useState(mintId);

  const history = useHistory();
  const classes = useStyles();
  const optionType = { label: num, value: tokenId, mintId, marketplaceItemId };
  const makeGroupOption = (list: any[]) => {
    const options: any = [optionType];

    list.forEach(async (item) => {
      console.log('Marketplace SELEXTED ITEM>>>>>>>>>>>>', list);
      const obj: any = {};
      obj.label = item?.num;
      obj.marketplaceItemId = item?.marketplace?.itemId;
      obj.value = item?.tokenId;
      obj.mintId = item?._id;
      await options.push(obj);
    });

    const sorted = options.sort(
      async (item, nthItem) => item.label - nthItem.label,
    );
    return sorted;
  };
  const handleGroupItem = (item: {
    value: string;
    mintId;
    marketplaceItemId;
  }) => {
    console.log('ItemSelected HandelGroupItem => ', item);
    setSelectedItem(item?.value);
    setSelectedItemMintId(item?.mintId);
    setSelectedMarketplaceItemId(item?.marketplaceItemId);
  };
  const handleImageError = () => {
    setImage(noImageAvailable);
  };
  const onListedSuccess = () => {};

  const ViewList = () => {
    return (
      <div style={{ marginTop: '1rem' }}>
        <h3 style={{ color: 'white', textAlign: 'center' }}>
          Congratulations your asset is listed!
        </h3>
        <div style={{ marginTop: '1rem' }}>
          <div className={ModalsStyles.actions}>
            <button
              onClick={() => {
                toggleModal(false);
              }}
              className={ModalsStyles.listedButton}
            >
              {isFromDashboard ? 'Stay on Dashboard' : 'Stay on Listing'}
            </button>
            <div style={{ marginTop: '1rem' }}>
              <button
                onClick={() => history.push('/marketplace')}
                className={ModalsStyles.listButton}
              >
                View on marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const showErrorModal = (err) => {
    dispatch(ErrorStateActions.setErrorModal(true));
    dispatch(ErrorStateActions.setErrorMessage(err));
  };

  const unlist = () => {
    setLoading(true);
    try {
      MarketplaceAPI.unListMint(
        selectedItemMintId,
        selectedMarketplaceItemId.toString(),
        selectedItem,
      )
        .then((res: any) => {
          console.log('res', res);
          if (res?.status === 200) {
            setLoading(false);
            success('Mint unlist successfully! ');
            handleReact && handleReact(data);
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          error(err?.message);
        });
    } catch (err: any) {
      setLoading(false);
      error(err?.message);
    }
  };

  const AddMarketPlace = async () => {
    if (!price) {
      setLoading(false);
      showErrorModal('Price is required');
      return;
    }
    try {
      setLoading(true);
      const addedNFTtoMarketplace = await addNftToMarketplace(
        parseInt(selectedItem, 10),
        price,
        serviceFee,
        walletType,
      );
      console.log('addedNFTtoMarketplace', addedNFTtoMarketplace);
      const blockReturnValues =
        addedNFTtoMarketplace?.events?.ItemListed?.returnValues;
      if (blockReturnValues?.itemindex) {
        // ---------- Add NFT to DB -------- //
        await MarketplaceAPI.addMintToMarketplace(
          addedNFTtoMarketplace?.events?.ItemListed?.transactionHash,
          blockReturnValues?.itemindex,
          selectedItemMintId,
          price,
        )
          .then(async (res: any) => {
            if (res.status === 200) {
              setLoading(false);
              setIsSuccess(true);
              DashboardAPI.userWalletSync();
              if (handleModal) {
                const resObj = {
                  active: true,
                  itemId: mintId,
                  price,
                  cryptoPrice: price,
                };
                handleModal(true, resObj);
              }
              success('NFT Added!');
            } else {
              setIsSuccess(false);
              setLoading(false);
              showErrorModal(res?.message);
            }
          })
          .catch((err) => {
            setLoading(false);
            setIsSuccess(false);
            toggleModal(false);
            showErrorModal(err);
          });
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      showErrorModal(err);
    }
  };
  return (
    <Modal
      open={isOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div
        style={{
          top: '55%',
          left: '55%',
          transform: 'translate(-55%, -55%)',
        }}
        className={classes.paper}
      >
        {/* {!loading && (
          <div
            className={ModalsStyles.crossCircle}
            onClick={() => handleModal(false)}
          >
            <Close style={{ color: 'white', fontSize: 20 }} />
          </div>
        )} */}
        {loading && (
          <div>
            <Loader />
            <h3 style={{ color: 'white', textAlign: 'center' }}>
              Unlisting NFT from marketplace please wait...
            </h3>
          </div>
        )}
        {isSuccess && <ViewList />}
        {!loading && !isSuccess && (
          <div>
            <h2 className={ModalsStyles.modalTitle}>
              UnList from Marketplace
              <img className={ModalsStyles.infoIcon} src={infoImg} alt="N/A" />
              {/* <div className={ModalsStyles.tooltipWrapper}>
                <p>
                  This will list your asset for sale on the EverScapes
                  marketplace. When an asset is listed for sale it is held in an
                  escrow wallet and will not be visible on external platforms
                  like OpenSea. All of your listed assets will be shown in the
                  <strong> My Listings </strong>
                  tab of your dashboard. Listing an asset for sale is not a
                  guarantee of sale. A listing can be canceled at any time
                  before it has been purchased from the
                  <strong> My Listings </strong>
                  tab and will return to the
                  <strong> My Assets </strong>
                  tab. All processed sales are final and can not be reversed.
                  <br />
                  All Buy Now amounts include a 5% Artist Royalty and a 5%
                  Marketplace fee.
                </p>
              </div> */}
            </h2>
            <div className={ModalsStyles.itemDetails}>
              <div className={ModalsStyles.imgWrap}>
                {fileType !== 'MP4' ? (
                  <img
                    src={image}
                    style={{ objectFit: 'cover' }}
                    alt="img"
                    onError={handleImageError}
                    className={ModalsStyles.img}
                  />
                ) : (
                  <div className={ModalsStyles.player}>
                    <ReactPlayer
                      url={paintingImage}
                      playing
                      loop
                      controls={false}
                      muted
                    />
                  </div>
                )}
                <div>
                  {(paintingPrice || 0) > 0 && (
                    <div className={ModalsStyles.purchaseWrapMobile}>
                      <p className={ModalsStyles.purchaseTitle}>Purchased</p>
                      <h4 className={ModalsStyles.purchaseAmount}>
                        <span>$</span>
                        {(paintingPrice || 0) > 0 && paintingPrice}
                      </h4>
                    </div>
                  )}
                </div>

                <div className={ModalsStyles.details}>
                  <p className={ModalsStyles.title}>{artistNames}</p>
                  <h4 className={ModalsStyles.name}>{paintingName ?? ''}</h4>
                  <p className={ModalsStyles.collectionName}>
                    {collection ?? ''}
                  </p>
                  <p className={ModalsStyles?.count}>
                    #
                    {data && data?.groupedListedMints?.length > 1 ? (
                      <SingleSelect
                        options={makeGroupOption(data?.groupedListedMints)}
                        handleOption={handleGroupItem}
                        label={selectedItem}
                      />
                    ) : (
                      num
                    )}
                    {` of #${totalNum ?? ''}`}
                  </p>
                </div>
              </div>
              {(paintingPrice || 0) > 0 && (
                <div className={ModalsStyles.purchaseWrap}>
                  <p className={ModalsStyles.purchaseTitle}>Purchased</p>
                  <h4 className={ModalsStyles.purchaseAmount}>
                    <span>$</span>
                    {paintingPrice}
                  </h4>
                </div>
              )}
            </div>
            <div className={ModalsStyles.actions}>
              <button
                onClick={unlist}
                className={ModalsStyles.listButton}
                disabled={!selectedItem}
              >
                {selectedItem ? 'Unlist' : 'Please Select the Mint'}
              </button>

              <button
                onClick={() => {
                  setSelectedItem('');
                  toggleModal(false);
                  handleLoading && handleLoading(false);
                }}
                className={ModalsStyles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CancelListModal;
CancelListModal.defaultProps = {
  handleModal: undefined,
  data: {},
};
