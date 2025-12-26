import React, { ReactNode } from 'react';
import { Tooltip } from '@material-ui/core';

interface propI {
  value: ReactNode | any;
}
const ToolTip: React.FC<propI> = (props: propI) => {
  return (
    <>
      <Tooltip
        title={<p style={{ fontSize: '12px' }}>{props.value}</p>}
        placement="top-start"
      >
        <div>{props.value}</div>
      </Tooltip>
    </>
  );
};

export default ToolTip;
