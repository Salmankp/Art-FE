import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import Modal from '@material-ui/core/Modal';
import QRCode from 'qrcode';
import styles from '../styles/dashboard/AccountSettings.module.scss';
import { rightarrow } from '../../../assets';
import { UserAPI } from '../../../api/user';
import { success } from '../../../utils/toast';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { AuthenticationStateActions } from '../../../redux/slices/AuthenticationState';
import {
  checkQrCode,
  checkOnlyEmail,
  checkUsername,
  checkCountry,
  checkStreetAddress,
  checkSubrub,
  checkZipcode,
  checkFullname,
  checkState,
} from '../../../utils/validate';

const AccountSettings: React.FC = () => {
  const [qrImage, setQrImage] = useState('');
  const [detailQrModal, setDetailQrModal] = useState(false);
  const [userDetailData, setUserDetailData] = useState<any>('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userCountry, setUserCountry] = useState('');
  const [userRecoveryEmail, setUserRecoveryEmail] = useState('');
  const [streetAddressOne, setStreetAddressOne] = useState('');
  const [streetAddressTwo, setStreetAddressTwo] = useState('');
  const [subrub, setSubrub] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [userFullname, setUserFullname] = useState('');
  const [twoFaCode, setTwoFaCode] = useState<any>('');
  const [countriesList, setCountriesList] = useState<any>('');
  const [statesList, setStatesList] = useState<any>('');
  const [stateName, setStateName] = useState<any>('');

  const dispatch = useAppDispatch();

  const getUserDetails = async () => {
    const userData = await UserAPI.userDetail();
    setUserDetailData(userData?.data);
  };

  const userInformation = useAppSelector(
    (state) => state.AuthenticationState.userGeneralInfo,
  );

  useEffect(() => {
    getUserDetails();
  }, []);

  const [switch1, setSwitch1] = useState(userDetailData?.auth2fa || false);
  const [switch3, setSwitch3] = useState(userDetailData?.email2fa || false);

  useEffect(() => {
    setUserName(userDetailData?.username);
    setUserEmail(userDetailData?.email);
    setFirstName(userDetailData?.firstName);
    setLastName(userDetailData?.lastName);
    setUserCountry(userDetailData?.country);
    setStateName(userDetailData?.state);
    setStreetAddressOne(userDetailData?.streetAddressLine1);
    setStreetAddressTwo(userDetailData?.streetAddressLine2);
    setSubrub(userDetailData?.suburb);
    setZipCode(userDetailData?.zipCode);
    setUserRecoveryEmail(userDetailData?.recoveryEmail);
    setSwitch1(userDetailData?.auth2fa);
    setSwitch3(userDetailData?.email2fa);
    setUserFullname(userDetailData?.fullName);
  }, [userDetailData]);

  useEffect(() => {
    const countriesList = async () => {
      const res = await UserAPI.getCountries();
      if (res?.success) {
        setCountriesList(res?.data?.data);
      }
    };

    countriesList();
  }, []);

  const getStatesList = async (countryName) => {
    const res = await UserAPI.getStates(countryName);
    if (res?.success) {
      setStatesList(res?.data?.data?.states);
    }
  };

  useEffect(() => {
    if (userCountry) {
      getStatesList(userCountry);
    }
  }, [userCountry]);

  const updateUserInfo = async () => {
    if (!checkUsername(userName)) return;
    if (!checkOnlyEmail(userEmail)) return;
    const res = await UserAPI.updateUser(
      userFullname,
      userName,
      userEmail,
      firstName,
      lastName,
      userCountry,
      streetAddressOne,
      streetAddressTwo,
      subrub,
      zipCode,
      userRecoveryEmail,
      stateName,
    );
    if (res.success) {
      const userUpdatedData = {
        authToken: userInformation?.authToken,
        profileStatus: userInformation?.profileStatus,
        userInfo: {
          email: res?.data?.user?.email,
          generated: userInformation?.userInfo?.generated,
          username: res?.data?.user?.username,
          verified: userInformation?.userInfo?.verified,
          walletAddress: userInformation?.userInfo?.walletAddress,
          walletType: userInformation?.userInfo?.walletType,
        },
      };
      dispatch(
        AuthenticationStateActions.set_user_general_info(userUpdatedData),
      );
      success(res?.data?.message);
    }
  };
  const refreshUserGeneralInformation = () => {
    setFirstName('');
    setLastName('');
  };
  const refreshShipingAddressData = () => {
    setStreetAddressOne('');
    setStreetAddressTwo('');
    setSubrub('');
    setZipCode('');
  };

  const qrResponse = async (service) => {
    let active;
    if (switch1 === true) {
      active = false;
      const res = await UserAPI.getQRCode(active, service);
      setDetailQrModal(false);
      success(res?.data?.message);
    } else {
      setDetailQrModal(true);
      active = true;
      const res = await UserAPI.getQRCode(active, service);
      // setResponseMessage(res?.data?.message);
      if (res?.data) {
        QRCode.toDataURL(res?.data?.qrcodeURL)
          .then((url) => {
            setQrImage(url);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  const emailTwofaResponse = async (service) => {
    let active;
    if (switch3 === true) {
      active = false;
    } else {
      active = true;
    }

    const res = await UserAPI.getQRCode(active, service);
    if (res?.success) {
      success(res?.data?.message);
    }
  };

  const verifyQrAuthentication = async () => {
    if (!checkQrCode(twoFaCode)) return;
    const userToken = localStorage.getItem('authToken');
    const res = await UserAPI.activeAuthenticatorApp(
      twoFaCode,
      false,
      userToken,
    );

    if (res.success) {
      setDetailQrModal(false);
      setTwoFaCode('');
      success('Authenticator app 2fa activated');
    }
  };

  const validateUserName = () => {
    if (!checkUsername(userName)) return;
    updateUserInfo();
  };

  const validateEmail = () => {
    if (!checkOnlyEmail(userEmail)) return;
    updateUserInfo();
  };

  const validateRecoveryEmail = () => {
    if (!checkOnlyEmail(userRecoveryEmail, true)) return;
    updateUserInfo();
  };

  const validateShippingAddress = () => {
    if (!checkFullname(userFullname)) return;
    if (!checkCountry(userCountry)) return;
    if (!checkState(stateName)) return;
    if (!checkStreetAddress(streetAddressOne)) return;
    if (!checkSubrub(subrub)) return;
    if (!checkZipcode(zipCode)) return;
    updateUserInfo();
  };

  const closeQrModal = () => {
    setTwoFaCode('');
    setDetailQrModal(false);
    setSwitch1(!switch1);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.prtwrap}>
        <div className={styles.fieldname}>Change username</div>
        <div className={styles.fieldwrap}>
          <div className={styles.title}>ENTER new username</div>
          <div className={styles.inputwrap}>
            <input
              required
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={validateUserName}>
              <img src={rightarrow} alt="icon" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.prtwrap}>
        <div className={styles.fieldname}>Update email address</div>
        <div className={styles.fieldwrap}>
          <div className={styles.title}>ENTER new EMAIL</div>
          <div className={styles.inputwrap}>
            <input
              required
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button onClick={validateEmail}>
              <img src={rightarrow} alt="icon" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.prtwrap}>
        <div className={styles.fieldname}>Personal information</div>
        <div className={styles.fieldwrap}>
          <div className={styles.title}>FIRST NAME</div>
          <div className={styles.inputwrap}>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={styles.title}>LAST NAME</div>
          <div className={styles.inputwrap}>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className={styles.buttonwrap}>
            <button
              className={styles.clear}
              onClick={refreshUserGeneralInformation}
            >
              Clear
            </button>
            <button className={styles.saveTwo} onClick={updateUserInfo}>
              Save
            </button>
          </div>
        </div>
      </div>

      <div className={styles.prtwrap}>
        <div className={styles.fieldname}>Add shipping address</div>
        <div className={styles.fieldwrap}>
          <div className={styles.title}>Full Name*</div>
          <div className={styles.inputwrap}>
            <input
              type="text"
              value={userFullname}
              onChange={(e) => setUserFullname(e.target.value)}
            />
          </div>
          <div className={styles.title}>COUNTRY*</div>
          <div className={styles.inputwrap}>
            <select
              value={userCountry}
              onChange={(e) => {
                setUserCountry(e.target.value);
                getStatesList(e.target.value);
              }}
            >
              <option>Select country</option>
              {countriesList &&
                countriesList?.map((data) => (
                  <option value={data?.country}>{data?.country}</option>
                ))}
            </select>
          </div>

          <div className={styles.title}>State*</div>
          <div className={styles.inputwrap}>
            <select
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
            >
              <option value="">Select state</option>
              {statesList &&
                statesList?.map((data) => (
                  <option value={data?.name}>{data?.name}</option>
                ))}
            </select>
          </div>

          <div className={styles.title}>Street address*</div>
          <div className={styles.inputwrap}>
            <input
              type="text"
              value={streetAddressOne}
              onChange={(e) => setStreetAddressOne(e.target.value)}
            />
          </div>
          <div className={styles.inputwrap}>
            <input
              type="text"
              value={streetAddressTwo}
              onChange={(e) => setStreetAddressTwo(e.target.value)}
            />
          </div>

          <div className={styles.title}>SUBURB*</div>
          <div className={styles.inputwrap}>
            <input
              type="text"
              value={subrub}
              onChange={(e) => setSubrub(e.target.value)}
            />
          </div>
          <div className={styles.title}>ZIP/POSTAL CODE*</div>
          <div className={styles.inputwrap}>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
          <div className={styles.buttonwrap}>
            <button
              className={styles.clear}
              onClick={refreshShipingAddressData}
            >
              Clear
            </button>
            <button
              className={styles.saveTwo}
              onClick={validateShippingAddress}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div className={styles.prtwrap}>
        <div className={styles.fieldname}>
          Add recovery email
          <div className={styles.subcontent}>
            Add an email account to recover your account
          </div>
        </div>
        <div className={styles.fieldwrap}>
          <div className={styles.title}>ENTER RECOVERY EMAIL</div>
          <div className={styles.inputwrap}>
            <input
              type="email"
              value={userRecoveryEmail}
              onChange={(e) => setUserRecoveryEmail(e.target.value)}
            />
            <button onClick={validateRecoveryEmail}>
              <img src={rightarrow} alt="icon" />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.prtwrap}>
        <div className={styles.fieldname}>Enable Two-Factor Authentication</div>
        <div className={styles.fieldwrap}>
          <div className={styles.subwrap}>
            <div className={styles.hdng}>Authenticator App</div>
            <div className={styles.subb}>
              <div className={styles.switch}>
                <Switch
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#494949"
                  offColor="#494949"
                  height={24}
                  width={52}
                  onHandleColor="#3FB5F5"
                  checked={switch1}
                  onChange={() => {
                    setSwitch1(!switch1);
                    qrResponse('auth');
                  }}
                />
              </div>
              <div className={styles.cntnt}>
                Use an Authenticator App as your Two-Factor Authentication
                (2FA). When you sign in you’ll be required to use the security
                code provided by your Authenticator App
              </div>
            </div>
          </div>
          <div className={styles.dividerr} />
          <div className={styles.subwrap}>
            <div className={styles.hdng}>Email Authentication</div>
            <div className={styles.subb}>
              <div className={styles.switch}>
                <Switch
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#494949"
                  offColor="#494949"
                  height={24}
                  width={52}
                  onHandleColor="#3FB5F5"
                  checked={switch3}
                  onChange={() => {
                    setSwitch3(!switch3);
                    emailTwofaResponse('email');
                  }}
                />
              </div>
              <div className={styles.cntnt}>
                Use a security code set to your email address as your Two-Factor
                Authentication (2FA). The security code will be sent to the
                address associated with your account. You will need to use it
                when you sign in
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={detailQrModal}
        onClose={closeQrModal}
        className={styles.detailsModal}
      >
        <div className={styles.detailModalwrap}>
          <div className={styles.headingTwo}>
            Scan the given QR and put the code in input field to verify your
            account
          </div>
          <div className={styles.detailwrap}>
            <div className={styles.line}>
              <div className={styles.qr}>
                {qrImage && <img src={qrImage} alt="" />}
              </div>
              <div className={styles.inputwrap}>
                <input
                  type="text"
                  value={twoFaCode}
                  onChange={(e) => setTwoFaCode(e.target.value)}
                />
              </div>
              <div className={styles.buttonwrap}>
                <button className={styles.clear} onClick={closeQrModal}>
                  Close
                </button>
                <button
                  className={styles.save}
                  onClick={verifyQrAuthentication}
                >
                  Verify
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AccountSettings;
