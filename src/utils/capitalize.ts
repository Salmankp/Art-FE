const capitalize = (str: string): string => {
  if (typeof str !== 'string') return '';
  return str
    .split(' ')
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
};

export default capitalize;
