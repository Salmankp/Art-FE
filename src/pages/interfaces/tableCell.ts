import { ReactNode } from 'react';

export interface TableCellI {
  selected?: boolean;
  fields: {
    [key: string]: {
      value: string | number | ReactNode;
      hidden?: boolean;
      truncate?: boolean;
    };
  };
}
