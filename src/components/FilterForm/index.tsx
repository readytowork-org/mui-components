import {
  Box,
  Button,
  type ButtonProps,
  type StackProps,
  ThemeWithProps,
  useThemeProps,
} from "@mui/material";
import { FormEventHandler, ReactNode } from "react";

export interface FilterFormProps<T> {
  onFilterReset?: () => void;

  onSubmit?: FormEventHandler<T> | undefined;
  extraActions?: ReactNode;
  verticalForm?: boolean;
  slotProps?: {
    root?: Omit<StackProps, "children">;
    inputContainer?: Omit<StackProps, "children">;
    actionContainer?: Omit<StackProps, "children">;
    submitButton?: ButtonProps & {
      icon?: ReactNode;
    };
    resetButton?: ButtonProps;
  };

  children: ReactNode;
}

function FilterForm<T>(props: FilterFormProps<T>) {
  const {
    children,
    onFilterReset,
    onSubmit,
    verticalForm = true,
    extraActions,
    slotProps,
  } = useThemeProps<ThemeWithProps, FilterFormProps<T>, "MuiFilterForm">({
    name: "MuiFilterForm",
    props: props,
  });

  return (
    <Box
      onSubmit={onSubmit}
      component={"form"}
      display={"flex"}
      gap={"24px"}
      flexDirection={verticalForm ? "column" : "row"}
      {...slotProps?.root}
    >
      {children}

      {/* Actions */}
      <Box
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        alignItems={"end"}
        {...slotProps?.actionContainer}
        sx={{
          justifyContent: verticalForm ? "start" : "center",
          gap: "12px",
          ...slotProps?.actionContainer?.sx,
        }}
      >
        {/* Search Button */}
        <Button
          variant={"contained"}
          color={"primary"}
          type={"submit"}
          data-testid={"submit-input"}
          {...slotProps?.submitButton}
        >
          {slotProps?.submitButton?.children || "Search"}
        </Button>

        {/* Reset Button */}
        {onFilterReset && (
          <Button
            variant={"outlined"}
            color={"primary"}
            onClick={() => {
              if (onFilterReset) {
                onFilterReset();
              }
            }}
            data-testid={"reset-input"}
            {...slotProps?.resetButton}
          >
            {slotProps?.resetButton?.children || "Reset"}
          </Button>
        )}
        {/* Extra Actions */}
        {extraActions}
      </Box>
    </Box>
  );
}

export default FilterForm;
