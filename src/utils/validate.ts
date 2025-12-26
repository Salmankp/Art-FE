import { error } from './toast';
import { ERROR_NO_AMOUNT, ERROR_INVALID_VALUE } from './constants';

export const checkFullname = (fullname: string) => {
  if (!fullname) {
    error('Please enter your fullname.');
    return false;
  }
  if (fullname?.length < 5) {
    error('Fullname must contain atleast 5 characters');
    return false;
  }
  return true;
};

export const checkUsername = (username: string) => {
  if (!username) {
    error('Please enter your username.');
    return false;
  }
  if (username?.length < 5) {
    error('Username must contain atleast 5 characters');
    return false;
  }
  return true;
};

export const checkQrCode = (twoFACode: number) => {
  if (!twoFACode) {
    error('Please enter your Two FA Code.');
    return false;
  }
  return true;
};

export const checkEmail = (email: string, confirmEmail: string) => {
  if (!email) {
    return { status: false, message: 'Please enter your Email.' };
  }
  if (
    !email.match(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  ) {
    return { status: false, message: 'Please enter a valid email address' };
  }
  if (email !== confirmEmail) {
    return { status: false, message: "Emails don't match." };
  }
  return { status: true };
};

export const checkOnlyEmail = (email: string, isRecoveryEmail = false) => {
  if (!email) {
    if (isRecoveryEmail) error('Please enter your recovery email.');
    if (!isRecoveryEmail) error('Please enter your email address.');
    return false;
  }
  if (
    !email.match(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
  ) {
    if (isRecoveryEmail) error('Please enter a valid recovery email');
    if (!isRecoveryEmail) error('Please enter a valid email address');
    return false;
  }
  return true;
};

export const checkPassword = (password: string) => {
  if (!password) {
    error('Please enter a Password.');
    return false;
  }
  if (password?.length < 8) {
    error('Passwords must be atleast 8 characters long');
    return false;
  }
  if (
    !password.match(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}(?<!d)(?!00)d{3}(?!d)$/)$',
    )
  ) {
    error('Please enter a password as required');
    return false;
  }
  return true;
};

export const checkTerms = (terms: boolean) => {
  if (!terms) {
    error('You need to accept terms and conditions');
    return false;
  }
  return true;
};

export const checkResetPassword = (
  password: string,
  confirmPassword: string,
) => {
  if (!password) {
    error('Please enter a Password.');
    return false;
  }
  if (password?.length < 8) {
    error('Passwords must be atleast 8 characters long');
    return false;
  }
  if (
    !password.match(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#/|'<>.^*()%!-])(?!.*(.)\1\1\1\1).{8,}$/,
    )
  ) {
    error('Please enter a password as required');
    return false;
  }
  if (password !== confirmPassword) {
    error('Password and confirm password not matched.');
    return false;
  }

  return true;
};

export const checkFirstName = (firstName: string) => {
  if (!firstName) {
    error('Please enter your first name.');
    return false;
  }
  if (firstName?.length < 2) {
    error('First name must contain atleast 2 characters');
    return false;
  }
  return true;
};

export const checkLastName = (lastName: string) => {
  if (!lastName) {
    error('Please enter your last name.');
    return false;
  }
  if (lastName?.length < 2) {
    error('Last name must contain atleast 2 characters');
    return false;
  }
  return true;
};

export const checkSubject = (subject: string) => {
  if (!subject) {
    error('Please enter your subject.');
    return false;
  }
  if (subject?.length < 5) {
    error('Subject must contain atleast 5 characters');
    return false;
  }
  return true;
};

export const checkMessage = (message: string) => {
  if (!message) {
    error('Please enter your message.');
    return false;
  }
  if (message?.length < 5) {
    error('Message must contain atleast 5 characters');
    return false;
  }
  return true;
};

export const checkMetaMask = (message: string) => {
  if (message?.length !== 42) {
    error('Meta Mask Not Connected');
    return false;
  }
  return true;
};

export const checkReCaptcha = (res) => {
  if (res?.length === 0) {
    return false;
  }
  return true;
};

export const checkCountry = (country: string) => {
  if (!country) {
    error('Country field is required');
    return false;
  }
  return true;
};

export const checkState = (state: string) => {
  if (!state) {
    error('State field is required');
    return false;
  }
  return true;
};

export const checkStreetAddress = (streetAddress: string) => {
  if (!streetAddress) {
    error('Street address field is required');
    return false;
  }
  return true;
};

export const checkSubrub = (subrub: string) => {
  if (!subrub) {
    error('Subrub field is required');
    return false;
  }
  return true;
};

export const checkZipcode = (zipcode: string) => {
  if (!zipcode) {
    error('Zip code field is required');
    return false;
  }
  return true;
};

export const checkAmount = (amount: number) => {
  if (!amount) {
    error(ERROR_NO_AMOUNT);
    return false;
  }
  if (amount <= 0) {
    error(ERROR_INVALID_VALUE);
    return false;
  }
  return true;
};

export const checkWalletAddress = (walletAddress: string) => {
  if (!walletAddress) {
    error('Please enter the wallet address.');
    return false;
  }
  return true;
};
