const listOfOwnedMintsInNumArray = (mints: number[], showMints) => {
  if (!mints?.length) return '';
  if (mints?.length === 1) return `#${mints[0]}`;
  let displayOwnedMintsString = '';
  // eslint-disable-next-line array-callback-return
  mints.some((mint, index) => {
    if (index === showMints) {
      displayOwnedMintsString += `& ${mints.length - index} more.`;
      return displayOwnedMintsString;
    }
    if (index === mints?.length - 1) {
      displayOwnedMintsString += `& #${mint}.`;
      return displayOwnedMintsString;
    }
    if (index !== showMints) {
      mints?.length === 2
        ? (displayOwnedMintsString += `#${mint} `)
        : (displayOwnedMintsString += `#${mint}, `);
    }
  });
  return displayOwnedMintsString;
};

export default listOfOwnedMintsInNumArray;
