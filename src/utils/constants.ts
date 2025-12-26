export const S3_BASE_PATH =
  process.env.REACT_APP_ENVIRONMENT === 'local'
    ? 'https://artefy.io/assets'
    : `/assets`;
export const iconsFolder = 'icons';
export const imagesFolder = 'images';
export const videosFolder = 'videos';

// ------------------- Error Constants Strings ---------- //
export const ERROR_INVALID_VALUE = 'Please provide value greater than 0.';
export const ERROR_NO_AMOUNT = 'Please enter the amount.';
export const MATIC_TRANSFER_SUCCESS = 'Matic transfered.';
export const MATIC_TRANSFER_NOT_SUCCESS = 'Unable to transfer Matic.';
export const PLAYER_BASE_URL = 'https://player.artefy.io/';
export const PLAYER_MEDIA_URL = `${PLAYER_BASE_URL}?media-id=`;
export const POPUP_BLOCKED_MESSAGE =
  'Popup is blocked, please enable them by using below image or by enabling them from browser settings.';

// ------------------- Artist Page Constants ---------- //
export const SELECTED_ARTIST = 'Selected Artist';
export const SMALL_SCREEN = 769;
