import { FormInputProps } from "../FormInput";
import { FilterFormProps } from "../FilterForm";
import { AppPaginationProps } from "../AppPagination";

declare module "@mui/material/styles" {
  interface ComponentsPropsList {
    MuiFormInput: Partial<FormInputProps>;
    MuiFilterForm: Partial<FilterFormProps<any>>;
    MuiAppPagination: Partial<AppPaginationProps>;
  }

  interface CustomComponents<Theme = unknown> {
    MuiFormInput?: {
      defaultProps?: ComponentsPropsList["MuiFormInput"];
    };
    MuiFilterForm?: {
      defaultProps?: ComponentsPropsList["MuiFilterForm"];
    };
    MuiAppPagination?: {
      defaultProps?: ComponentsPropsList["MuiAppPagination"];
    };
  }

  interface Components<Theme = unknown> extends CustomComponents<Theme> {}
}
