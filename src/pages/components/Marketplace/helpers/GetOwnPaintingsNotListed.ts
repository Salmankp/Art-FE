const getOwnPaintingsNotListed = (paintingId, userPaintings) => {
  return userPaintings.filter(
    (userMint) => userMint?.paintingID?._id === paintingId,
  );
};
export default getOwnPaintingsNotListed;
