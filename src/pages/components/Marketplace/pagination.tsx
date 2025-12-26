import React, { useEffect, useState } from 'react';
import PaginationComponent from '../pagination/paginationComp';
import styles from '../styles/dashboard/Grid.module.scss';

function PaginationBag({
  data,
  RenderComponent,
  dataLimit,
  isUnList,
  showQuickListButton,
}) {
  const pagesCalc = Math.abs(data.length / dataLimit);
  const [pages] = useState(Math.ceil(pagesCalc));
  const [currentPage, setCurrentPage] = useState(1);

  const moveInPages = (index) => {
    setCurrentPage(index);
  };

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth' });
  }, [currentPage]);
  return (
    <div>
      <div className={styles.dataContainer}>
        {getPaginatedData().map((d, idx) => (
          <RenderComponent
            key={idx}
            mint={d}
            isUnList={isUnList}
            showQuickListButton={showQuickListButton}
            isDashboard
            isMarketplaceListings
          />
        ))}
      </div>
      <div>
        <PaginationComponent
          handle={moveInPages}
          count={pages}
          page={currentPage}
        />
      </div>
    </div>
  );
}
export default PaginationBag;
