export const groupQuickListedPainting = (
  userListedPaintings: any[],
  quickListedPainting: any,
) => {
  const cloneUserListedPaintings = [...userListedPaintings];
  const { paintingID, tokenId, num } = quickListedPainting;
  let matchFound = false;
  const updateGroupedListedPaintings: any = [];
  cloneUserListedPaintings.forEach((userListedPainting) => {
    if (
      userListedPainting?.paintingID?._id ===
      quickListedPainting?.paintingID?._id
    ) {
      matchFound = true;
      const { groupedListedMints, ...otherAttributes } = userListedPainting;
      updateGroupedListedPaintings.push({
        groupedListedMints: [
          ...groupedListedMints,
          {
            paintingID,
            name: paintingID?.name,
            tokenId,
            num,
          },
        ],
        ...otherAttributes,
      });
    } else updateGroupedListedPaintings.push(userListedPainting);
  });

  if (matchFound) {
    return updateGroupedListedPaintings;
  }
  cloneUserListedPaintings.push({
    paintingID,
    tokenId,
    name: paintingID?.name,
    num,
    groupedListedMints: [],
  });
  return cloneUserListedPaintings;
};
