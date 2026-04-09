import Box, { type BoxProps } from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel, { type InputLabelProps } from "@mui/material/InputLabel";
import Stack from "@mui/material/Stack";
import { StackProps, StackTypeMap } from "@mui/material/Stack/Stack";
import { ThemeWithProps, useThemeProps } from "@mui/material";
import { ElementType, ReactNode } from "react";

export type FormInputProps<
  RootComponent extends ElementType = StackTypeMap["defaultComponent"],
  AdditionalProps = object,
> = StackProps<RootComponent, AdditionalProps> & {
  verticalLabelDirection?: boolean;
  children: ReactNode;
  label: string | ReactNode;
  required?: boolean;
  error?: string;
  slots?: {
    requiredAsterisk?: ReactNode;
  };
  slotProps?: {
    label?: InputLabelProps;
    inputContainer?: BoxProps;
  };
};

function FormInput<
  RootComponent extends ElementType = StackTypeMap["defaultComponent"],
  AdditionalProps = object,
>(props: FormInputProps<RootComponent, AdditionalProps>) {
  const {
    verticalLabelDirection = true,
    children,
    label,
    required,
    error,
    slotProps,
    slots,
    ...rest
  } = useThemeProps<
    ThemeWithProps,
    FormInputProps<RootComponent, AdditionalProps>,
    "MuiFormInput"
  >({
    name: "MuiFormInput",
    props: props,
  });

  return (
    <Stack
      direction={verticalLabelDirection ? "column" : "row"}
      alignItems={verticalLabelDirection ? "" : "center"}
      justifyContent={verticalLabelDirection ? "stretch" : ""}
      gap={verticalLabelDirection ? "8px" : "12px"}
      {...rest}
    >
      <InputLabel
        required={required}
        {...slotProps?.label}
        sx={{
          display: "flex",
          alignItems: "center",
          ...slotProps?.label?.sx,

          // hide the default
          ...(slots?.requiredAsterisk
            ? {
                "& .MuiFormLabel-asterisk": {
                  display: "none",
                },
              }
            : {}),
        }}
      >
        {label}
        {required && slots?.requiredAsterisk}
      </InputLabel>
      <Box
        display={"flex"}
        justifyContent={"stretch"}
        flex={verticalLabelDirection ? "" : 1}
        flexDirection={"column"}
        {...slotProps?.inputContainer}
      >
        {children}
        {error && <FormHelperText error>{error}</FormHelperText>}
      </Box>
    </Stack>
  );
}

export default FormInput;
