import React, { useState, useEffect, useRef } from 'react';
import { Close, KeyboardArrowUp } from '@material-ui/icons';
import { useAppSelector } from 'redux/hooks';

import { useDispatch } from 'react-redux';
import { FilterStateActions } from 'redux/slices/FiltersState';

import MultiSelectStyles from '../styles/Marketplace/HeadlessMultiSelect.module.scss';
import getAlreadySelectedFilters from './helpers/GetAlreadySelectedFilters';

const HeadlessMultiSelect: React.FC<{
  options: any[];
  onChange: any;
  label: string;
  isMarketplace?: boolean;
}> = ({ options, onChange, label, isMarketplace }) => {
  const dispatch = useDispatch();
  const storedSelectedOptions = useAppSelector(
    (state) => state.FiltersState.filtersSelection,
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allOptions, setAllOptions] = useState(
    options.map((item) => ({
      ...item,
      selected: isMarketplace
        ? getAlreadySelectedFilters(item, storedSelectedOptions[label])
        : false,
    })),
  );

  const [selectedOptions, setSelectedOptions] = useState<any>(
    isMarketplace ? storedSelectedOptions[label] : [],
  );

  const refElement = useRef<any>(null);

  const toggleMenus = (e) => {
    if (refElement?.current?.contains(e.target)) return;
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const SelectedData = options.map((item) => ({
      ...item,
      selected: isMarketplace
        ? getAlreadySelectedFilters(item, storedSelectedOptions[label])
        : false,
    }));

    const selectedOption = isMarketplace ? storedSelectedOptions[label] : [];

    setSelectedOptions(selectedOption);
    setAllOptions(SelectedData);
  }, [options, storedSelectedOptions]);

  useEffect(() => {
    document.addEventListener('mousedown', toggleMenus);
    return () => {
      document.removeEventListener('mousedown', toggleMenus);
    };
  }, []);

  const updateState = (updatedArr) => {
    if (label === 'Collection') {
      return { ...storedSelectedOptions, Collection: updatedArr };
    }
    if (label === 'Genre') {
      return { ...storedSelectedOptions, Genre: updatedArr };
    }
    if (label === 'Rarity') {
      return { ...storedSelectedOptions, Rarity: updatedArr };
    }
    if (label === 'Artist') {
      return { ...storedSelectedOptions, Artist: updatedArr };
    }
    if (label === 'Media') {
      return { ...storedSelectedOptions, Media: updatedArr };
    }
  };

  const handleChange = (item) => {
    const latestOptions = allOptions.map((option) => {
      if (option.id === item.id) option.selected = true;
      return option;
    });
    setAllOptions(latestOptions);
    onChange(latestOptions.filter((option) => option.selected));
    setSelectedOptions(latestOptions.filter((option) => option.selected));
    isMarketplace &&
      dispatch(
        FilterStateActions.setFiltersSelection(
          updateState(latestOptions.filter((option) => option.selected)),
        ),
      );
  };

  const handleDeselect = (item) => {
    const latestOptions = allOptions.map((option) => {
      if (option.id === item.id) option.selected = false;
      return option;
    });
    setAllOptions(latestOptions);
    onChange(latestOptions.filter((option) => option.selected));
    setSelectedOptions(latestOptions.filter((option) => option.selected));
    isMarketplace &&
      dispatch(
        FilterStateActions.setFiltersSelection(
          updateState(latestOptions.filter((option) => option.selected)),
        ),
      );
  };

  const lengthChecker = (data: string, length: number) => {
    return data?.length > length ? `${data?.substring(0, length)}...` : data;
  };

  return (
    <div className={MultiSelectStyles.listBox} ref={refElement}>
      <div
        className={`${MultiSelectStyles.btnContainer} ${
          isMenuOpen ? MultiSelectStyles.menuOpened : ''
        }`}
      >
        <button
          className={`${MultiSelectStyles.listBoxBtn}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {label}
          <KeyboardArrowUp
            className={`${MultiSelectStyles.arrowIcon} ${
              isMenuOpen
                ? MultiSelectStyles.arrowDirectionUp
                : MultiSelectStyles.arrowDirectionDown
            }`}
          />
        </button>
        {!isMenuOpen && selectedOptions.length > 0 && (
          <div className={MultiSelectStyles.itemWrap}>
            {selectedOptions.map((option) => {
              return (
                <div className={MultiSelectStyles.item}>
                  <div className={MultiSelectStyles.itemLabel}>
                    {lengthChecker(option?.label, 11)}
                  </div>
                  <div
                    className={MultiSelectStyles.close}
                    onClick={() => handleDeselect(option)}
                  >
                    <Close />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {isMenuOpen && (
        <div className={MultiSelectStyles.listBoxOptions}>
          {allOptions?.map((item, i) => (
            <div
              key={item?.label + i}
              className={`${MultiSelectStyles.listBoxOptionWrap} ${
                item.selected ? MultiSelectStyles.activeOption : ''
              }`}
            >
              <li
                className={`${MultiSelectStyles.listBoxOption}`}
                onClick={() => handleChange(item)}
              >
                {item?.label}
              </li>
              <div
                className={MultiSelectStyles.iconWrap}
                onClick={() => handleDeselect(item)}
              >
                <Close fontSize="small" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeadlessMultiSelect;
