import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { toast } from 'react-toastify';

toast.configure();

export const _alert = toast;
export const error = (msg: string, autoClose?: number): React.ReactText =>
  toast(msg, { type: 'error', autoClose: 2000, pauseOnFocusLoss: false });
export const info = (msg: string, autoClose?: number): React.ReactText =>
  toast(msg, { type: 'info', autoClose: 2000, pauseOnFocusLoss: false });
export const success = (msg: string, autoClose?: number): React.ReactText =>
  toast(msg, { type: 'success', autoClose: 2000, pauseOnFocusLoss: false });
function fadeOut(
  msg: string,
  arg1: { type: 'error'; autoClose: number | undefined },
  fadeOut: any,
  arg3: number,
): import('react').ReactText {
  throw new Error('Function not implemented.');
}
