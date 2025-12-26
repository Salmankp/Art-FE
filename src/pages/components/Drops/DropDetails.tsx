import React from 'react';
import styles from '../styles/Drops/DropDetails.module.scss';

import DropDetailsCard from './DropDetailsCard';
import { useAppSelector } from '../../../redux/hooks';

const DropDetails: React.FC<{ payableModalHandler: (data: any) => void }> = ({
  payableModalHandler,
}) => {
  const paintings = useAppSelector(
    (state) => state.AuthenticationState.dropPaintings,
  );
  console.log('paintings ====', paintings);
  return (
    <div className={styles.DropDetailsContainer}>
      {paintings.length > 0 &&
        paintings.map((item) => (
          <DropDetailsCard
            key={item._id}
            data={item}
            modalHandler={payableModalHandler}
          />
        ))}
    </div>
  );
};

export default DropDetails;
