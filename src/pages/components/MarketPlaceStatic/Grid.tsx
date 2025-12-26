import React from 'react';
import { getArtistNames } from 'utils/helpers';
import styles from '../styles/MarketPlaceStatic/Grid.module.scss';
import AvailableEditionCard from './AvailableEditionCard';

const Grid: React.FC<{
  paintingDetail: any;
  filterItems: any;
  mintId: string;
  ownMints?: boolean;
  isOwnerPainting: boolean;
  owner: string;
}> = ({ paintingDetail, filterItems, mintId, ownMints, owner }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.headingwrap}>
        <div className={styles.line} />
        <div className={styles.heading}>
          {ownMints
            ? `Owned Editions: ${paintingDetail?.mints?.length} of ${paintingDetail?.mintsCount}`
            : `Available Editions: ${paintingDetail?.mints?.length} of ${paintingDetail?.mintsCount}`}
        </div>
        <div className={styles.line} />
      </div>
      <div className={styles.conanHead}>
        {paintingDetail?.name}
        {' - '}
        {getArtistNames(paintingDetail?.artists) || ''}
      </div>
      <div className={styles.Grid}>
        {paintingDetail.mints
          ?.filter((mint) => mint._id !== mintId)
          .map((data) => (
            <AvailableEditionCard
              key={data?._id}
              data={{ ...data, paintingDetail }}
              filterItems={filterItems}
            />
          ))}
      </div>
    </div>
  );
};
export default Grid;
