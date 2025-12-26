import dayjs from 'dayjs';

const getLatestSalePrice = (mints) => {
  return mints.sort((a, b) => {
    const dateA = dayjs(a?.updatedAt).unix();
    const dateB = dayjs(b?.updatedAt).unix();
    return dateB - dateA;
  });
};
export default getLatestSalePrice;
