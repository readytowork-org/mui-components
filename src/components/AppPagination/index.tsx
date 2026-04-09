import { MobileBreakpointProvider } from "../MobileBreakpointProvider";
import PaginationRowsLabel from "../PaginationRowsLabel";
import {
  Pagination,
  type PaginationProps,
  type StackProps,
  ThemeWithProps,
  Typography,
  useThemeProps,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { JSX } from "react/jsx-runtime";

export interface AppPaginationProps extends PaginationProps {
  page: number;
  count: number;
  pageSize?: number;
  onChange?: PaginationProps["onChange"];
  pageSizeOptions?: number[];
  onPageSizeChange?: (pageSize: number) => void;
  perPageText?: string;
  disablePaginationLabel?: boolean;
  slotProps?: {
    root?: Omit<StackProps, "children">;
  };
}

/**
 * A comprehensive pagination component built on top of MUI's Pagination.
 * It includes:
 * - Standard page navigation controls.
 * - A label indicating the currently displayed item range (e.g., "Showing 1-10 of 50").
 * - An optional dropdown to select the number of items per page (`pageSize`).
 * - Responsive layout adjustments for different screen sizes.
 *
 * @returns {React.JSX.Element} The rendered AppPagination component.
 */
export const AppPagination: FC<AppPaginationProps> = (props): JSX.Element => {
  const {
    pageSizeOptions,
    onPageSizeChange,
    pageSize = 10,
    perPageText = "per page",
    slotProps,
    page,
    count,
    disablePaginationLabel,
    ...rest
  } = useThemeProps<ThemeWithProps, AppPaginationProps, "MuiAppPagination">({
    name: "MuiAppPagination",
    props: props,
  });

  return (
    <Stack
      {...slotProps?.root}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: { sm: 2, xs: 1 },
        ...slotProps?.root?.sx,
      }}
    >
      {!disablePaginationLabel && (
        <PaginationRowsLabel
          count={count}
          from={count === 0 ? 0 : (page - 1) * pageSize + 1}
          to={Math.min(page * pageSize, count)}
          sx={{
            whiteSpace: "nowrap",
          }}
        />
      )}

      <Stack
        sx={{
          flexWrap: { xs: "wrap", md: "unset" },
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { sm: 2, xs: 1 },
        }}
      >
        {pageSizeOptions && !!pageSizeOptions.length && (
          <Select
            labelId={"pagination-select-label"}
            id={"pagination"}
            value={pageSize}
            sx={{
              minWidth: { sm: "129px", xs: "94px" },

              "& .MuiOutlinedInput-input.MuiSelect-select": {
                padding: "6px 12px",
              },

              ".MuiSvgIcon-root": {
                right: { sm: 12, xs: 4 },
              },
            }}
            onChange={(e) => {
              onPageSizeChange?.(e.target.value as number);
            }}
          >
            {pageSizeOptions?.map((size) => (
              <MenuItem value={size} key={size}>
                <Typography
                  component={"span"}
                  sx={{
                    fontSize: { sm: "14px", xs: "12px" },
                    fontWeight: 500,
                  }}
                >
                  {size}
                </Typography>
                <Typography
                  component={"span"}
                  sx={{
                    ml: "2px",
                    fontSize: { sm: "12px", xs: "10px" },
                    fontWeight: 400,
                  }}
                >
                  {perPageText}
                </Typography>
              </MenuItem>
            ))}
          </Select>
        )}

        <MobileBreakpointProvider>
          {({ isMobile, isTablet }) => (
            <Pagination
              boundaryCount={isMobile || isTablet ? 1 : 2}
              siblingCount={0}
              {...rest}
              sx={{
                "& .MuiPagination-ul": {
                  flexWrap: "unset",
                },
              }}
              page={page}
              count={Math.ceil(count / pageSize)}
            />
          )}
        </MobileBreakpointProvider>
      </Stack>
    </Stack>
  );
};
