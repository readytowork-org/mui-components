import * as React from "react";
import useSlotProps from "@mui/utils/useSlotProps";
import {
  PickersLayout,
  PickersLayoutSlotProps,
} from "@mui/x-date-pickers/PickersLayout";
import {
  usePicker,
  PickersModalDialog,
  ExportedBaseToolbarProps,
  DateOrTimeViewWithMeridiem,
  ExportedBaseTabsProps,
  PickersProvider,
} from "@mui/x-date-pickers/internals";
import { usePickersTranslations } from "@mui/x-date-pickers/hooks";
import {
  PickerValidDate,
  FieldRef,
  InferError,
} from "@mui/x-date-pickers/models";
import useId from "@mui/utils/useId";
import {
  MobileRangePickerAdditionalViewProps,
  UseMobileRangePickerParams,
  UseMobileRangePickerProps,
  UseMobileRangePickerSlotProps,
} from "./useMobileRangePicker.types";
import {
  RangePickerPropsForFieldSlot,
  useEnrichedRangePickerFieldProps,
} from "../useEnrichedRangePickerFieldProps";
import { DateRange, RangeFieldSection } from "../../../models";
import { useRangePosition } from "../useRangePosition";

export const useMobileRangePicker = <
  TDate extends PickerValidDate,
  TView extends DateOrTimeViewWithMeridiem,
  TEnableAccessibleFieldDOMStructure extends boolean,
  TExternalProps extends UseMobileRangePickerProps<
    TDate,
    TView,
    TEnableAccessibleFieldDOMStructure,
    any,
    TExternalProps
  >,
>({
  props,
  ...pickerParams
}: UseMobileRangePickerParams<
  TDate,
  TView,
  TEnableAccessibleFieldDOMStructure,
  TExternalProps
>) => {
  const {
    slots,
    slotProps: innerSlotProps,
    className,
    sx,
    format,
    formatDensity,
    enableAccessibleFieldDOMStructure,
    selectedSections,
    onSelectedSectionsChange,
    timezone,
    label,
    inputRef,
    name,
    readOnly,
    disabled,
    disableOpenPicker,
    localeText,
  } = props;

  const startFieldRef = React.useRef<FieldRef<RangeFieldSection>>(null);
  const endFieldRef = React.useRef<FieldRef<RangeFieldSection>>(null);

  const fieldType = (slots.field as any).fieldType ?? "multi-input";
  const { rangePosition, onRangePositionChange } = useRangePosition(
    props,
    fieldType === "single-input" ? startFieldRef : undefined,
  );
  const labelId = useId();
  const contextTranslations = usePickersTranslations();

  const {
    open,
    actions,
    layoutProps,
    renderCurrentView,
    fieldProps: pickerFieldProps,
    contextValue,
  } = usePicker<
    DateRange<TDate>,
    TDate,
    TView,
    RangeFieldSection,
    TExternalProps,
    MobileRangePickerAdditionalViewProps
  >({
    ...pickerParams,
    props,
    wrapperVariant: "mobile",
    autoFocusView: true,
    fieldRef: rangePosition === "start" ? startFieldRef : endFieldRef,
    additionalViewProps: {
      rangePosition,
      onRangePositionChange,
    },
  });

  const Field = slots.field;

  const fieldProps = useSlotProps<
    typeof Field,
    UseMobileRangePickerSlotProps<
      TDate,
      TView,
      TEnableAccessibleFieldDOMStructure
    >["field"],
    RangePickerPropsForFieldSlot<
      boolean,
      TDate,
      TEnableAccessibleFieldDOMStructure,
      InferError<TExternalProps>
    >,
    TExternalProps
  >({
    elementType: Field,
    externalSlotProps: innerSlotProps?.field,
    additionalProps: {
      ...pickerFieldProps,
      readOnly: readOnly ?? true,
      disabled,
      className,
      sx,
      format,
      formatDensity,
      enableAccessibleFieldDOMStructure,
      selectedSections,
      onSelectedSectionsChange,
      timezone,
      ...(fieldType === "single-input" ? { inputRef, name } : {}),
    },
    ownerState: props,
  });

  const isToolbarHidden = innerSlotProps?.toolbar?.hidden ?? false;

  const enrichedFieldProps = useEnrichedRangePickerFieldProps<
    TDate,
    TView,
    TEnableAccessibleFieldDOMStructure,
    InferError<TExternalProps>
  >({
    wrapperVariant: "mobile",
    fieldType,
    open,
    actions,
    readOnly,
    labelId,
    disableOpenPicker,
    label,
    localeText,
    rangePosition,
    onRangePositionChange,
    pickerSlots: slots,
    pickerSlotProps: innerSlotProps,
    fieldProps,
    startFieldRef,
    endFieldRef,
  });

  const slotPropsForLayout: PickersLayoutSlotProps<
    DateRange<TDate>,
    TDate,
    TView
  > = {
    ...innerSlotProps,
    tabs: {
      ...innerSlotProps?.tabs,
      rangePosition,
      onRangePositionChange,
    } as ExportedBaseTabsProps,
    toolbar: {
      ...innerSlotProps?.toolbar,
      titleId: labelId,
      rangePosition,
      onRangePositionChange,
    } as ExportedBaseToolbarProps,
  };

  const Layout = slots?.layout ?? PickersLayout;

  const finalLocaleText = {
    ...contextTranslations,
    ...localeText,
  };
  let labelledById =
    pickerParams.valueType === "date-time"
      ? `${labelId}-start-toolbar ${labelId}-end-toolbar`
      : labelId;
  if (isToolbarHidden) {
    const labels: string[] = [];
    if (fieldType === "multi-input") {
      if (finalLocaleText.start) {
        labels.push(`${labelId}-start-label`);
      }
      if (finalLocaleText.end) {
        labels.push(`${labelId}-end-label`);
      }
    } else if (label != null) {
      labels.push(`${labelId}-label`);
    }

    labelledById = labels.length > 0 ? labels.join(" ") : undefined;
  }
  const slotProps = {
    ...innerSlotProps,
    mobilePaper: {
      "aria-labelledby": labelledById,
      ...innerSlotProps?.mobilePaper,
    },
  };

  const renderPicker = () => (
    <PickersProvider contextValue={contextValue} localeText={localeText}>
      <Field {...enrichedFieldProps} />
      <PickersModalDialog
        {...actions}
        open={open}
        slots={slots}
        slotProps={slotProps}
      >
        <Layout
          {...layoutProps}
          {...slotProps?.layout}
          slots={slots}
          slotProps={slotPropsForLayout}
        >
          {renderCurrentView()}
        </Layout>
      </PickersModalDialog>
    </PickersProvider>
  );

  return {
    renderPicker,
  };
};
