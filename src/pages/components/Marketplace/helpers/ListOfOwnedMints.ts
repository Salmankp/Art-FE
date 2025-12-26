const listOfOwnedMints = (mints: any[], showMints: number) => {
  if (!mints?.length) return '';
  if (mints?.length === 1) return `#${mints[0]?.num}`;

  let displayOwnedMintsString = '';
  // eslint-disable-next-line array-callback-return
  mints.some((mint, index) => {
    if (index === showMints) {
      displayOwnedMintsString += '& more.';
      return displayOwnedMintsString;
    }
    if (index === mints?.length - 1) {
      displayOwnedMintsString += `& #${mint?.num}.`;
      return displayOwnedMintsString;
    }
    if (index !== showMints) {
      mints?.length === 2
        ? (displayOwnedMintsString += `#${mint?.num} `)
        : (displayOwnedMintsString += `#${mint?.num}, `);
    }
  });
  return displayOwnedMintsString;
};
export default listOfOwnedMints;
