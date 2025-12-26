import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import { CircularProgress } from '@material-ui/core';
import QRCode from 'qrcode';
import Info from '../CustomForm/Info';
import { collectionheaderbg } from '../../../assets';
import { useAppDispatch } from '../../../redux/hooks';
import { FormOption } from '../CustomForm/CustomForm';
import styles from '../styles/CreateWallet/Main.module.scss';
import customClass from '../styles/customForm/CustomForm.module.scss';

interface formData {
  twoFACode: number;
}

const Main: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [qrImage, setQrImage] = useState('');

  const { handleSubmit, register } = useForm();

  const options: FormOption[] = [
    {
      type: 'number',
      name: 'twoFACode',
      label: 'QR Code',
      placeholder: 'QR Code',
      className: customClass.inputField,
      info: {
        title: 'QR Code',
        description:
          'Scan the given QR and put the code in input field to verify your account.',
      },
    },
  ];

  useEffect(() => {
    const qrCode = localStorage.getItem('qrcodeURL');
    if (qrCode) {
      QRCode.toDataURL(qrCode)
        .then((url) => {
          setQrImage(url);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const onFormSubmit = async () => {
    // const onFormSubmit = async ({ twoFACode }: formData) => {
    // if (!checkQrCode(twoFACode)) return;
    // setIsLoading(true);
    // const res = await UserAPI.activeAuthenticatorApp(twoFACode, true, "dsafewe");
    // if (res.success) {
    //   window.localStorage.removeItem("qrcodeURL");
    //   dispatch(AuthenticationStateActions.set_walletCreation(true));
    //   setIsLoading(false);
    //   success(res?.data?.message);
    //   setTimeout(() => {
    //     history.push('/dashboard')
    //   }, 2000)
    // }
  };
  return (
    <div className={styles.mainwrap}>
      <div className={styles.head}>
        <img src={collectionheaderbg} alt="bg" />
      </div>
      <div className={styles.wrap}>
        <div className={styles.imgWrap}>
          {qrImage && <img src={qrImage} alt="" />}

          <form onSubmit={handleSubmit(onFormSubmit)}>
            {options.map((option) => {
              return (
                <div key={option.label}>
                  {option.label && (
                    <div>
                      <label className={customClass.labelText}>
                        {option.label}
                      </label>
                      {option.info && <Info {...option.info} />}
                    </div>
                  )}
                  <input
                    className={clsx(customClass.inputField, option.className)}
                    type={option.type}
                    placeholder={option.placeholder ? option.placeholder : ''}
                    {...register(option.name)}
                  />
                </div>
              );
            })}
            <button type="submit" disabled={isLoading}>
              Create Wallet
              {isLoading && <CircularProgress className={styles.loaderSize} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Main;
