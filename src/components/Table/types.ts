import { TableCellProps } from "@mui/material/TableCell";
import { TableContainerProps } from "@mui/material/TableContainer";
import { TableProps as MuiTableProps } from "@mui/material/Table";
import { ReactNode } from "react";

export interface ActionColumns {
  actions: object;
}

export interface ColumnType<T extends object> {
  id: keyof T | "actions";
  label: string;
  minWidth?: number;
  align?: TableCellProps["align"];
  sortable?: boolean;

  /* if no data key is provided
  id will be considered as dataKey
  */
  dataKey?: keyof T;
  type?: "default" | "image";

  render?: (data: T) => ReactNode;
}

export interface TableProps<T extends object> {
  columns: ColumnType<T>[];
  isLoading?: boolean;
  children?: ReactNode;
  data: T[];
  noData?: ReactNode;
  slotProps?: {
    root?: TableContainerProps;
    table?: MuiTableProps;
  };
}
