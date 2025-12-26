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
import { success } from '../../../utils/toast';
import { MarketplaceAPI } from '../../../api/marketplaceAPI';
import { addNftToMarketplace } from '../../../utils/marketplace';
import { commission } from '../../../utils/config';
import Loader from '../common/Loader';
import SingleSelect from '../dashboard/components/SingleSelect';

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
  paintingPreviewImg: string;
  paintingPrice: string;
  paintingName: string;
  artistNames: string;
  collection: string;
  num: number;
  totalNum: number;
  tokenId: string;
  mintId: string;
  isFromDashboard?: boolean;
  handleModal?: (value: boolean, input: any) => void;
  toggleModal: (value: boolean) => void;
  data?: any;
}

const ListModal: React.FC<ListModalProps> = ({
  isOpen,
  handleModal,
  walletType,
  artistNames,
  paintingName,
  collection,
  mintId,
  tokenId,
  paintingPreviewImg,
  paintingPrice,
  num,
  totalNum,
  isFromDashboard = false,
  toggleModal,
  data,
}) => {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(true);
  const [serviceFee, setServiceFee] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState(
    data?.paintingID?.group?.length > 0 ? '' : tokenId,
  );
  const [selectedItemMintId, setSelectedItemMintId] = useState(mintId);
  const history = useHistory();
  const classes = useStyles();
  const optionType = { label: num, value: tokenId, mintId };
  const makeGroupOption = (list: any[]) => {
    const options: any = [optionType];

    list.forEach(async (item) => {
      const obj: any = {};
      obj.label = item.num;
      obj.value = item.tokenId;
      obj.mintId = item._id;
      await options.push(obj);
    });

    const sorted = options.sort(
      async (item, nthItem) => item.label - nthItem.label,
    );
    return sorted;
  };
  const handleGroupItem = (item: { value: string; mintId }) => {
    setSelectedItem(item?.value);
    setSelectedItemMintId(item?.mintId);
  };

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
        {loading && (
          <div>
            <Loader />
            <h3 style={{ color: 'white', textAlign: 'center' }}>
              Adding NFT to marketplace please wait...
            </h3>
          </div>
        )}
        {isSuccess && <ViewList />}
        {!loading && !isSuccess && (
          <div>
            <h2 className={ModalsStyles.modalTitle}>
              List on Marketplace
              <img className={ModalsStyles.infoIcon} src={infoImg} alt="N/A" />
              <div className={ModalsStyles.tooltipWrapper}>
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
              </div>
            </h2>
            <div className={ModalsStyles.itemDetails}>
              <div className={ModalsStyles.imgWrap}>
                <img
                  src={paintingPreviewImg}
                  style={{ objectFit: 'cover' }}
                  alt="img"
                  className={ModalsStyles.img}
                />
                )
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
                    {(data && data?.paintingID?.group?.length > 1) ||
                    (data && data?.paintingID?.group?.length > 0) ? (
                      <SingleSelect
                        options={makeGroupOption(data.paintingID?.group)}
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
            <div className={ModalsStyles.listingWrap}>
              {!isChecked && (
                <ul>
                  <li>
                    <span className={ModalsStyles.key}>
                      Starting Bid Amount
                    </span>
                    {maticLogo('')}
                  </li>
                  <li>
                    <span className={ModalsStyles.key}>
                      Artist Royalties & Marketplace Fee
                    </span>
                    <span className={ModalsStyles.value}>1.5%</span>
                  </li>
                  <li>
                    <span className={ModalsStyles.key}>
                      Starting Bid Total Amount
                    </span>
                    {maticLogo(0)}
                  </li>
                  <li>
                    <span className={ModalsStyles.key}>Auction Duration</span>
                    <span className={ModalsStyles.value}>6 hours v</span>
                  </li>
                </ul>
              )}
              {isChecked && (
                <ul>
                  <li>
                    <span className={ModalsStyles.key}>Buy Now Amount</span>
                    <span className={ModalsStyles.value}>
                      <input
                        type="text"
                        className={ModalsStyles.input}
                        value={price}
                        maxLength={8}
                        onChange={(e: any) => {
                          const value = e.target.value
                            .replace(/^0/, '')
                            .replace(/[^\d]+/g, '');
                          const serviceFee = value * (commission / 100);
                          setServiceFee(serviceFee);
                          setPrice(value);
                        }}
                      />
                      {maticLogo('')}
                    </span>
                  </li>
                  <li>
                    <span className={ModalsStyles.key}>
                      Artist Royalties & Marketplace Fees
                    </span>
                    <span className={ModalsStyles.value}>
                      {maticLogo(serviceFee.toFixed(1))}
                    </span>
                  </li>
                  <li>
                    <span className={ModalsStyles.key}>You Will Receive</span>
                    <span className={ModalsStyles.value}>
                      {price - serviceFee}
                    </span>
                  </li>
                </ul>
              )}
            </div>
            <div className={ModalsStyles.actions}>
              <button
                onClick={() => AddMarketPlace()}
                className={ModalsStyles.listButton}
                disabled={!selectedItem}
              >
                {selectedItem ? 'List' : 'Please Select the Mint'}
              </button>

              <button
                onClick={() => {
                  toggleModal(false);
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

export default ListModal;
ListModal.defaultProps = {
  handleModal: undefined,
  data: {},
};
