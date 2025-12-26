const getAlreadySelectedFilters = (option, alreadySelected) => {
  return alreadySelected?.filter((item) => option?.id === item?.id).length > 0;
};

export default getAlreadySelectedFilters;
