import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import styles from '../styles/Drops/ModalsDrops.module.scss';
import { error } from '../../../utils/toast';

const API_LINK = process.env.REACT_APP_BASE_URL;

const Paypal: React.FC<{
  amount: number;
  mints?: any;
  paintingId: string;
  onPaymentSuccess: any;
}> = (props) => {
  const paypal = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { paintingId, amount, onPaymentSuccess } = props;
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: () => {
          return axios
            .post(
              `${API_LINK}transact/${paintingId}/createOrder`,
              { amount },
              {
                headers: {
                  'x-auth-token': localStorage.getItem('authToken'),
                },
              },
            )
            .then((res) => res.data.orderID);
        },
        onApprove: async (data: any) => {
          await axios
            .post(
              `${API_LINK}transact/${paintingId}/orderCaptureRequest`,
              {
                orderID: data.orderID,
              },
              {
                headers: {
                  'x-auth-token': localStorage.getItem('authToken'),
                },
              },
            )
            .then((res) => {
              if (res.status === 200) {
                onPaymentSuccess(true);
              }
            });
        },
        onError: (err) => {
          error('Transaction not success, Refresh and try again!');
          console.error(err);
        },
      })
      .render(paypal.current);
  }, [paintingId]);

  return (
    <div className={styles.PayPalContainer}>
      <div>
        <div ref={paypal} />
      </div>
      <div className={styles.amountContainer}>
        <p>Purchase amount:</p>
        <p>
          <span>$</span>
          {amount.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
export default Paypal;
