const createFilterObjectWithStates = (previous, filterObject) => {
  if (previous && Object.keys(previous).length === 0) {
    return filterObject;
  }

  for (const [key, value] of Object.entries(previous)) {
    switch (key) {
      case 'Collection':
        filterObject.collections = value;
        break;
      case 'Artist':
        filterObject.artists = value;
        break;
      default:
        filterObject[key.toLowerCase()] = value;
    }
  }
  return filterObject;
};

export default createFilterObjectWithStates;
