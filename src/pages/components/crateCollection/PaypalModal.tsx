import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import styles from '../styles/Drops/ModalsDrops.module.scss';
import { error } from '../../../utils/toast';

const API_LINK = process.env.REACT_APP_BASE_URL;

const Paypal: React.FC<{
  amount: number;
  lootCrateId: string;
  onPaymentSuccess: any;
  userCoupon: any;
}> = (props) => {
  const paypal = useRef() as React.MutableRefObject<HTMLInputElement>;
  const { lootCrateId, amount, onPaymentSuccess } = props;

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: () => {
          const paymentBody: any = { amount, type: 'lootCrate' };
          if (props.userCoupon) {
            paymentBody.couponId = props.userCoupon._id;
          }
          return axios
            .post(
              `${API_LINK}transact/${lootCrateId}/createOrder`,
              paymentBody,
              {
                headers: {
                  'x-auth-token': localStorage.getItem('authToken'),
                },
              },
            )
            .then((res) => res.data.orderID);
        },
        onApprove: async (data: any) => {
          const captureBody: any = { orderID: data.orderID, type: 'lootCrate' };
          if (props.userCoupon) {
            captureBody.couponId = props.userCoupon._id;
          }
          await axios
            .post(
              `${API_LINK}transact/${lootCrateId}/orderCaptureRequest`,
              captureBody,
              {
                headers: {
                  'x-auth-token': localStorage.getItem('authToken'),
                },
              },
            )
            .then((res) => {
              if (res.status === 200) {
                onPaymentSuccess(res.data.orderID, res.data.success);
              }
            });
        },
        onError: (err: any) => {
          if (err?.response?.status === 404) {
            return error('Crate are not available');
          }
          error('Transaction not success, Refresh and try again!');
          console.error(err);
        },
      })
      .render(paypal.current);
  }, [lootCrateId]);

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
