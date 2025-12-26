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
  mints?: any;
  paintingId: number;
  name: string;
  verifyCaptcha?: any;
  expireCaptcha?: any;
  humanKey?: any;
  buttonText: string;
  redirectPageName: string;
  quantity: number;
}> = (props) => {
  const purchaseHandler = async () => {
    const body = {
      paintingId: props.paintingId,
      quantity: props.quantity,
      productName: props.name,
      page: props.redirectPageName,
      price: props.amount * 100,
    };

    return axios
      .post(`${API_LINK}payment/stripe/checkout`, body, {
        headers: {
          'x-auth-token': localStorage.getItem('authToken'),
        },
      })
      .then(async (res) => {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({
          sessionId: res.data.data.id,
        });
      })
      .catch((err) => {
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
        <button onClick={() => purchaseHandler()} style={{ cursor: 'pointer' }}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Stripe;
