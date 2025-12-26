import React from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import styles from '../styles/Drops/ModalsDrops.module.scss';
import { error } from '../../../utils/toast';

const API_LINK = process.env.REACT_APP_BASE_URL;
const STRIPE_API_KEY = process.env.REACT_APP_STRIPE_API_KEY;
// declare const window: any;
const stripePromise = loadStripe(`${STRIPE_API_KEY}`);

const Stripe: React.FC<{
  amount: number;
  lootCrateId: number;
  name: string;
  buttonText: string;
  redirectPageName: string;
  quantity: number;
  buttonDisabled: boolean;
  userCoupon: any;
  setButtonDiabled: (value: boolean) => void;
}> = (props) => {
  const purchaseHandler = async () => {
    props.setButtonDiabled(true);
    const body: any = {
      lootCrateId: props.lootCrateId,
      quantity: props.quantity,
      crateName: props.name,
      page: props.redirectPageName,
      price: props.amount * 100,
    };
    if (props.userCoupon) {
      body.couponId = props.userCoupon._id;
    }
    return axios
      .post(`${API_LINK}payment/loot-crate/stripe/checkout`, body, {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      })
      .then(async (res) => {
        const stripe = await stripePromise;
        await localStorage.setItem(
          'stripePaymentId',
          res.data.data.payment_intent,
        );
        await stripe?.redirectToCheckout({
          sessionId: res.data.data.id,
        });
      })
      .catch((err) => {
        props.setButtonDiabled(false);
        if (err?.response?.status === 404) {
          return error('Crate are not available');
        }
        error('Request not processed');
        console.error(err);
      });
  };

  return (
    <div className={styles.PayPalContainer}>
      <div className={styles.amountContainer}>
        <p>Purchase amount:</p>
        <p>
          <span>$</span>
          {props.amount?.toLocaleString().toString()}
        </p>
      </div>
      <div className={styles.btnContainer}>
        <button
          disabled={props.buttonDisabled}
          onClick={() => {
            purchaseHandler();
          }}
          style={{ cursor: 'pointer' }}
        >
          {props.buttonDisabled ? 'Loading...' : props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Stripe;
