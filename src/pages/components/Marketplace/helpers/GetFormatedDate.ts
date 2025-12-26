const getFormatedDate = (date) => {
  if (!date) return 'N/A';
  const newDate = new Date(date);
  const month = newDate.toLocaleString('en', {
    month: 'long',
    timeZone: 'UTC',
    timeZoneName: 'long',
  });
  return `${newDate.getDate()} ${month.split(',')[0]} ${newDate.getFullYear()}`;
};

export default getFormatedDate;
