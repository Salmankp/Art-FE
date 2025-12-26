const getOwnedPaintings = (painting, userPaintings) => {
  const owned = {
    ownedMintsCount: 0,
    ownedMints: false,
  };
  if (!userPaintings) return owned;

  let foundMints = 0;
  painting?.mints?.forEach((mint) => {
    userPaintings?.forEach((userMint) => {
      const found = userMint?.totalTokenIds?.filter(
        (tokenId) => tokenId === mint?.tokenId,
      );
      if (found?.length > 0) foundMints += 1;
    });
  });

  owned.ownedMintsCount = foundMints;
  owned.ownedMints = owned.ownedMintsCount > 0;
  return owned;
};
export default getOwnedPaintings;
