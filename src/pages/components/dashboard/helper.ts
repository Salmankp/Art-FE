import { sortPaintings, groupPaintings } from 'utils/helper';

export const getStringWithFirstCapitalLetter = (string) => {
  let newString = '';
  string
    .toLowerCase()
    .split(' ')
    .forEach((str, i) => {
      const newWord = str.charAt(0).toUpperCase() + str.slice(1);
      i > 0 ? (newString += ` ${newWord}`) : (newString += newWord);
    });
  return newString;
};

export const convertValues = (data) => {
  return Object.entries(data).map(([value, label]: any, i) => ({
    id: `${i}${++i}${i++}${value}`,
    label: getStringWithFirstCapitalLetter(label),
    value,
  }));
};

export const alphabeticOrder = (list) => {
  return list.sort((a: any, b: any) => a.label.localeCompare(b.label));
};

export const listToOptions = (list: Array<any>) => {
  const collection: Array<any> = [];
  let i = 0;
  for (const item of list) {
    const [value = '', label = ''] = Object.entries(item)[0];
    collection.push({
      id: `${i}${++i}${i++}${value}`,
      value,
      label: getStringWithFirstCapitalLetter(label),
    });
    i++;
  }
  return collection;
};

export const ungroupPainting = (Badges: any[]) => {
  let expontGroup: any = [];
  Badges.forEach((item) => {
    const itemTemp = JSON.parse(JSON.stringify(item));
    const unGroup = [...itemTemp.paintingID.group];
    delete itemTemp.paintingID.group;
    unGroup.unshift(itemTemp);
    expontGroup = [...expontGroup, ...unGroup];
  });
  return expontGroup;
};

export const updateUserPaintings = (Badges: any[]) => {
  const expontGroup = ungroupPainting(Badges);
  const list = sortPaintings({ paintings: expontGroup }, 'price', 1);
  return list.paintings;
};

export const getExistedMints = (Badges: any[], listed: any[]) => {
  let BadgesList = [...Badges];
  listed.forEach((item) => {
    BadgesList = BadgesList.filter((itemI) => {
      return itemI.tokenId !== item.tokenId;
    });
  });
  return BadgesList;
};

export const updateMarketPlaceStatus = (
  List: any[],
  item: any,
  input?: any,
) => {
  const listedNft: any = [];
  const updateListItem: any = [];
  List.forEach((mintItem) => {
    if (item.tokenId !== mintItem.tokenId) {
      updateListItem.push(mintItem);
    }
    if (item.tokenId === mintItem.tokenId) {
      listedNft.push(mintItem);
    }
  });
  return { updateListItem, listedNft };
};

export const valueText = (value) => {
  return `${value}`;
};
