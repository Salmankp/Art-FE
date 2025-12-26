export const getValue = (cellItem) => {
  const value =
    cellItem.value === 0 || cellItem.value === '0' ? 'N/A' : cellItem.value;
  return value;
};
