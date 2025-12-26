const sortNFTsByRarity = (sortObj, filterOptions, paintingsState) => {
  let sortedList: any = [];
  const rarity = filterOptions.rarity.map((pin) => pin.value);
  if (sortObj.rarity === 1) {
    rarity.forEach((item) => {
      const exit = paintingsState.filter(
        (o: any) => o.paintingID.rarity === item,
      );
      sortedList = [...sortedList, ...exit];
    });
  } else {
    rarity.reverse().forEach((item) => {
      const exit = paintingsState.filter(
        (o: any) => o.paintingID.rarity === item,
      );
      sortedList = [...sortedList, ...exit];
    });
  }
  return sortedList;
};

const paintingIDBaseFilter = (
  dataToFilter: any,
  filterItems: any,
  key: string,
  filterMod: number,
  mainKey?: string,
) => {
  const filterDataList: any = [];

  dataToFilter.forEach((dataItem) => {
    if (dataItem.paintingID) {
      const exist: any = [];
      filterItems.forEach((filterItem) => {
        if (filterMod === 1) {
          dataItem.paintingID[key] === filterItem.value
            ? exist.push(filterItem)
            : '';
        }

        if (filterMod === 2 && mainKey) {
          dataItem.paintingID[mainKey][key] === filterItem.value
            ? exist.push(filterItem)
            : '';
        }

        if (filterMod === 3 && mainKey) {
          const existI = dataItem.paintingID[mainKey].filter(
            (objKey) => objKey[key] === filterItem.value,
          );
          existI.length > 0 ? exist.push(filterItem) : '';
        }
      });

      if (exist.length > 0) {
        filterDataList.push(dataItem);
      }
    }
  });

  return filterDataList;
};

const filterNFTs = (payload) => {
  const {
    hasFilterList,
    paintingIDKeyBaseList,
    paintingIDObjBaseList,
    paintingIDArryBaseList,
    filter,
    paintings,
  } = payload;

  let dataToFilter = JSON.parse(JSON.stringify(paintings));

  hasFilterList.forEach((item) => {
    if (item) {
      if (paintingIDKeyBaseList.includes(item)) {
        let fieldName = item;
        if (item === 'media') {
          fieldName = 'filetype';
        }
        dataToFilter = paintingIDBaseFilter(
          dataToFilter,
          filter[item],
          fieldName,
          1,
        );
      } else if (paintingIDObjBaseList.includes(item)) {
        let mainKey = paintingIDObjBaseList.find((o) => o === item);
        let keyName = item;
        if (mainKey === 'collections') {
          keyName = '_id';
          mainKey = 'theme';
        }
        dataToFilter = paintingIDBaseFilter(
          dataToFilter,
          filter[item],
          keyName,
          2,
          mainKey,
        );
      } else if (paintingIDArryBaseList.includes(item)) {
        const mainKey = paintingIDArryBaseList.find((o) => o === item);
        let keyName = item;
        if (mainKey === 'artists') {
          keyName = '_id';
        }
        dataToFilter = paintingIDBaseFilter(
          dataToFilter,
          filter[item],
          keyName,
          3,
          mainKey,
        );
      }
    }
  });
  return dataToFilter;
};

const hasFiltersList = (filters) => {
  return Object.keys(filters).map((item) => filters[item].length > 0 && item);
};

export { sortNFTsByRarity, paintingIDBaseFilter, hasFiltersList, filterNFTs };
