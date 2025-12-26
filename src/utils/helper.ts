interface date {
  getMonth: string;
  getDay: string;
  getYear: string;
}

export const getDate = (date: string): date => {
  const dateInstance = new Date(date);
  return {
    getMonth: dateInstance.toLocaleString('default', { month: 'short' }),
    getDay: dateInstance.toLocaleString('default', { day: 'numeric' }),
    getYear: dateInstance.toLocaleString('default', { year: 'numeric' }),
  };
};

const sortHelper = (list: any[], key: string, type?: number) => {
  const listTOSort = [...list];
  return listTOSort.sort((a, b) => {
    const value1 = a?.paintingID
      ? a.paintingID[key]
        ? a.paintingID[key]
        : a?.marketplace
        ? a.marketplace[key]
        : 0
      : 0;
    const value2 = b?.paintingID
      ? b.paintingID[key]
        ? b.paintingID[key]
        : b?.marketplace
        ? b.marketplace[key]
        : 0
      : 0;

    if (type) {
      if (type === -1) return value1 - value2;
      if (type === 1) return value2 - value1;
    }
    return value1 - value2;
  });
};

export const sortPaintings = (
  pintingsList: any,
  key: string,
  type?: number,
): any => {
  if (pintingsList && pintingsList?.paintings?.length > 0) {
    let list = sortHelper(pintingsList?.paintings, key);
    if (type) {
      if (type === 1) {
        list = [...sortHelper(pintingsList?.paintings, key, 1)];
      } else if (type === -1) {
        list = [...sortHelper(pintingsList?.paintings, key, -1)];
      }
    }
    return {
      ...pintingsList,
      paintings: list,
    };
  }
  return pintingsList;
};
export const groupPaintings = (paintingList: any): any => {
  const finalPaintings: any[] = [];
  const artists: any = [];
  const collection: any = [];
  paintingList?.paintings?.forEach((mainPainting, mainIndex) => {
    const commonPaintings: any = [];
    const commonPaintingsNum: number[] = [];
    const commonPaintingsTokenIds: string[] = [];
    paintingList?.paintings?.forEach((subPainting, index) => {
      if (
        mainPainting?.paintingID?._id === subPainting?.paintingID?._id &&
        mainIndex !== index
      ) {
        commonPaintings.push(subPainting);
        commonPaintingsNum.push(subPainting?.num);
        commonPaintingsTokenIds.push(subPainting?.tokenId);
      }
    });
    const alreadyExsist =
      finalPaintings.filter(
        (painting) =>
          painting?.paintingID?._id === mainPainting?.paintingID?._id,
      ).length > 0;
    if (!alreadyExsist) {
      mainPainting.paintingID.group = [...commonPaintings];
      mainPainting.totalOwnedMints =
        commonPaintingsNum?.length > 0
          ? [mainPainting.num, ...commonPaintingsNum]
          : [mainPainting.num];
      mainPainting.totalTokenIds = commonPaintingsTokenIds.length
        ? [mainPainting.tokenId, ...commonPaintingsTokenIds]
        : [mainPainting.tokenId];
      finalPaintings.push(mainPainting);
    }
    if (
      mainPainting?.paintingID &&
      mainPainting?.paintingID?.artists.length > 0
    ) {
      mainPainting.paintingID.artists.forEach((artist: any) => {
        const exist = artists.filter((item: any) => item === artist._id);
        if (exist.length === 0) {
          artists.push(artist._id);
        }
      });
    }
    if (mainPainting.paintingID && mainPainting.paintingID.theme) {
      const existITem = collection.filter(
        (pinitem: any) => pinitem === mainPainting.paintingID.theme._id,
      );
      if (existITem.length === 0) {
        collection.push(mainPainting.paintingID.theme._id);
      }
    }
  });

  return {
    ...paintingList,
    paintings: [...finalPaintings],
    count: {
      ...paintingList.count,
      collectionCount: collection.length,
      artistCount: artists.length,
    },
  };
};

export const completedOwnedCollection = (paintingList: any[]) => {
  let completed = 0;
  paintingList.forEach((mint) => {
    const collectionSize = mint?.paintingID?.theme?.paintings?.length;
    const collectionId = mint?.paintingID?.theme?._id;

    const totalCollectedFromCollection = paintingList?.filter(
      (subMint) => subMint?.paintingID?.theme?._id === collectionId,
    );
    if (totalCollectedFromCollection.length === collectionSize) {
      completed += 1;
    }
  });
  return completed;
};

export const groupedListedPaintings = (paintingsList) => {
  const groupedListedMints: any[] = [];
  paintingsList.forEach((mainPainting, mainIndex) => {
    const commonListedMints = paintingsList.filter(
      (subPainting, subIndex) =>
        subPainting?.paintingID?._id === mainPainting?.paintingID?._id &&
        subIndex !== mainIndex,
    );
    const alreadyExist = groupedListedMints.find(
      (uniqueListedMint) =>
        uniqueListedMint?.paintingID?._id === mainPainting?.paintingID?._id,
    );
    if (!alreadyExist) {
      commonListedMints.push({ ...mainPainting });
      mainPainting.groupedListedMints = commonListedMints.sort((a, b) => {
        if (a?.marketplace?.cryptoPrice) {
          return a?.marketplace?.cryptoPrice < b?.marketplace?.cryptoPrice
            ? -1
            : 1;
        }
        return a?.marketplace?.price < b?.marketplace?.price ? -1 : 1;
      });
      groupedListedMints.push(mainPainting);
    }
  });
  return groupedListedMints;
};

export const removeAllTrailingSlashes = (str) => str.replace(/^\/+|\/+$/g, '');

export const OwnedPaintings = (assestType, ownedMints, userId) => {
  // return assestType !== 'marketplace'
  //   ? (ownedMints || []).filter(
  //       (mint: any) =>
  //         mint?.currentBuyer?._id === userId &&
  //         mint?.marketplace?.active !== true,
  //     )
  //   : (ownedMints || []).filter(
  //       (mint: any) =>
  //         mint?.currentBuyer?._id === userId &&
  //         mint?.marketplace?.active === true,
  //     );

  // let allOwnedMints = [];

  // if (assestType !== 'marketplace') {
  //   allOwnedMints = (ownedMints || []).filter(
  //     (mint: any) =>
  //       mint?.currentBuyer?._id === userId &&
  //       mint?.marketplace?.active !== true,
  //   );
  // }

  // const allListedMints = (ownedMints || []).filter(
  //   (mint: any) =>
  //     mint?.currentBuyer?._id === userId && mint?.marketplace?.active === true,
  // );

  return (ownedMints || []).filter(
    (mint: any) =>
      mint?.currentBuyer?._id === userId && mint?.marketplace?.active === true,
  );
};
export const availablePaintings = (assestType, ownedMints, userId) => {
  // return assestType === 'marketplace'
  //   ? (ownedMints || []).filter(
  //       (mint: any) =>
  //         mint?.currentBuyer?._id !== userId &&
  //         mint?.marketplace?.active === true,
  //     )
  //   : (ownedMints || []).filter(
  //       (mint: any) =>
  //         mint?.currentBuyer?._id !== userId &&
  //         mint?.marketplace?.active !== true,
  //     );
  return (ownedMints || []).filter(
    (mint: any) =>
      mint?.currentBuyer?._id !== userId && mint?.marketplace?.active === true,
  );
};
